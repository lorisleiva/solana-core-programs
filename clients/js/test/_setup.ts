/* eslint-disable import/no-extraneous-dependencies */
import '@solana/webcrypto-ed25519-polyfill';

import { getBase58Encoder, getBase64Encoder } from '@solana/codecs-strings';
import {
  Address,
  createDefaultRpcSubscriptionsTransport,
  createDefaultRpcTransport,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
} from '@solana/web3.js';
import {
  Context,
  FetchEncodedAccountOptions,
  MaybeEncodedAccount,
} from '../src';

export const createContext = (): Context & {
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
    address: Address<TAddress>,
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
    addresses: Address[],
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
