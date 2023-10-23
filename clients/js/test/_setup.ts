/* eslint-disable import/no-extraneous-dependencies */
import { getBase58Encoder, getBase64Encoder } from '@solana/codecs-strings';
import {
  Base58EncodedAddress,
  createDefaultRpcSubscriptionsTransport,
  createDefaultRpcTransport,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  generateKeyPair,
  getAddressFromPublicKey,
  signTransaction,
} from '@solana/web3.js';
import '@solana/webcrypto-ed25519-polyfill';
import {
  Context,
  FetchEncodedAccountOptions,
  MaybeEncodedAccount,
  TransactionSigner,
} from '../src';

export const createContext = (): Context & {
  rpc: ReturnType<typeof createSolanaRpc>;
  rpcSubscriptions: ReturnType<typeof createSolanaRpcSubscriptions>;
} => {
  const rpc = createSolanaRpc({
    transport: createDefaultRpcTransport({ url: 'http://localhost:8899' }),
  });
  const rpcSubscriptions = createSolanaRpcSubscriptions({
    transport: createDefaultRpcSubscriptionsTransport({
      url: 'ws://localhost:8900',
    }),
  });

  const fetchEncodedAccount = async <TAddress extends string = string>(
    address: Base58EncodedAddress<TAddress>,
    options?: FetchEncodedAccountOptions
  ): Promise<MaybeEncodedAccount<TAddress>> => {
    const response = await rpc
      .getAccountInfo(address, { commitment: options?.commitment })
      .send({ abortSignal: options?.abortSignal });
    if (!response.value) return { address, exists: false };
    return {
      exists: true,
      address,
      lamports: response.value.lamports,
      executable: response.value.executable,
      programAddress: response.value.owner,
      rentEpoch: response.value.rentEpoch,
      data: getBase58Encoder().encode(response.value.data),
    };
  };

  const fetchEncodedAccounts = async (
    addresses: Base58EncodedAddress[],
    options?: FetchEncodedAccountOptions
  ): Promise<MaybeEncodedAccount[]> => {
    const response = await rpc
      .getMultipleAccounts(addresses, { commitment: options?.commitment })
      .send({ abortSignal: options?.abortSignal });
    return response.value.map((account, index) => {
      if (!account) return { exists: false, address: addresses[index] };
      return {
        exists: true,
        address: addresses[index],
        lamports: account.lamports,
        executable: account.executable,
        programAddress: account.owner,
        rentEpoch: account.rentEpoch,
        data: getBase64Encoder().encode(account.data[0]),
      };
    });
  };

  return {
    rpc,
    rpcSubscriptions,
    fetchEncodedAccount,
    fetchEncodedAccounts,
  };
};

export type KeypairSigner<TAddress extends string = string> =
  TransactionSigner<TAddress> & { keypair: CryptoKeyPair };

export const createSignerFromKeypair = async (
  keypair: CryptoKeyPair
): Promise<KeypairSigner> => ({
  keypair,
  address: await getAddressFromPublicKey(keypair.publicKey),
  signTransaction: async (transactions) =>
    Promise.all(
      transactions.map((transaction) => signTransaction([keypair], transaction))
    ),
});

export const generateKeypairSigner = async (): Promise<KeypairSigner> =>
  createSignerFromKeypair(await generateKeyPair());
