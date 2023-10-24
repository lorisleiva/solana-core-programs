/* eslint-disable import/no-extraneous-dependencies */
import { getBase58Encoder, getBase64Encoder } from '@solana/codecs-strings';
import {
  Base58EncodedAddress,
  BaseTransaction,
  IDurableNonceTransaction,
  IFullySignedTransaction,
  IInstruction,
  ITransactionWithBlockhashLifetime,
  ITransactionWithFeePayer,
  Transaction,
  appendTransactionInstruction,
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
  CustomGeneratedInstruction,
  FetchEncodedAccountOptions,
  MaybeEncodedAccount,
  Signer,
  TransactionSigner,
  WrappedInstruction,
} from '../src';

export type ITransactionWithSigners = {
  signers: Signer[];
};

export type ITransactionWithBytesCreatedOnChain = {
  bytesCreatedOnChain: number;
};

export const createContext = (): Context &
  CustomGeneratedInstruction<
    IInstruction,
    <T extends Transaction>(
      tx: T
    ) => T & ITransactionWithSigners & ITransactionWithBytesCreatedOnChain
  > & {
    rpc: ReturnType<typeof createSolanaRpc>;
    rpcSubscriptions: ReturnType<typeof createSolanaRpcSubscriptions>;
  } => {
  const rpc = createSolanaRpc({
    transport: createDefaultRpcTransport({ url: 'http://127.0.0.1:8899' }),
  });
  const rpcSubscriptions = createSolanaRpcSubscriptions({
    transport: createDefaultRpcSubscriptionsTransport({
      url: 'ws://127.0.0.1:8900',
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

  const getGeneratedInstruction =
    (wrappedInstruction: WrappedInstruction<IInstruction>) =>
    <T extends Transaction>(
      tx: T
    ): T & ITransactionWithSigners & ITransactionWithBytesCreatedOnChain =>
      appendTransactionWrappedInstruction(tx, wrappedInstruction);

  return {
    rpc,
    rpcSubscriptions,
    fetchEncodedAccount,
    fetchEncodedAccounts,
    getGeneratedInstruction,
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

type CompilableTransaction = BaseTransaction &
  ITransactionWithFeePayer &
  (ITransactionWithBlockhashLifetime | IDurableNonceTransaction);

export async function signTransactionWithSigners<
  T extends CompilableTransaction & ITransactionWithSigners
>(tx: T): Promise<T & IFullySignedTransaction> {
  const [signedTx] = await tx.signers.reduce(
    async (txs, signer) =>
      'signTransaction' in signer ? signer.signTransaction(await txs) : txs,
    Promise.resolve([tx])
  );
  return signedTx as T & IFullySignedTransaction;
}

export function appendTransactionWrappedInstruction<
  TTransaction extends Transaction,
  TInstruction extends IInstruction
>(
  tx: TTransaction,
  wrappedInstruction: WrappedInstruction<TInstruction>
): TTransaction &
  ITransactionWithSigners &
  ITransactionWithBytesCreatedOnChain {
  const txWithInstruction = appendTransactionInstruction(
    wrappedInstruction.instruction,
    tx
  ) as TTransaction &
    Partial<ITransactionWithSigners & ITransactionWithBytesCreatedOnChain>;
  const txOut = {
    ...txWithInstruction,
    signers: [
      ...(txWithInstruction.signers ?? []),
      ...wrappedInstruction.signers,
    ],
    bytesCreatedOnChain:
      (txWithInstruction.bytesCreatedOnChain ?? 0) +
      wrappedInstruction.bytesCreatedOnChain,
  };
  Object.freeze(txOut);
  return txOut;
}
