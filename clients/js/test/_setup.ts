/* eslint-disable import/no-extraneous-dependencies */
import '@solana/webcrypto-ed25519-polyfill';

import { pipe } from '@solana/functional';
import {
  generateKeyPairSigner,
  signTransactionWithSigners,
} from '@solana/signers';
import {
  Address,
  CompilableTransaction,
  ITransactionWithBlockhashLifetime,
  createDefaultAirdropRequester,
  createDefaultRpcSubscriptionsTransport,
  createDefaultRpcTransport,
  createDefaultTransactionSender,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransaction,
  lamports,
  setTransactionFeePayer,
  setTransactionLifetimeUsingBlockhash,
} from '@solana/web3.js';

type Client = {
  rpc: ReturnType<typeof createSolanaRpc>;
  rpcSubscriptions: ReturnType<typeof createSolanaRpcSubscriptions>;
};

export const createClient = (): Client => {
  const rpc = createSolanaRpc({
    transport: createDefaultRpcTransport({ url: 'http://127.0.0.1:8899' }),
  });
  const rpcSubscriptions = createSolanaRpcSubscriptions({
    transport: createDefaultRpcSubscriptionsTransport({
      url: 'ws://127.0.0.1:8900',
    }),
  });

  return { rpc, rpcSubscriptions };
};

export const generateKeyPairSignerWithSol = async (
  client: Client,
  putativeLamports: bigint = 1_000_000_000n
) => {
  const airdropRequester = createDefaultAirdropRequester(client);
  const signer = await generateKeyPairSigner();
  await airdropRequester({
    recipientAddress: signer.address,
    lamports: lamports(putativeLamports),
    commitment: 'confirmed',
  });
  return signer;
};

export const createDefaultTransaction = async (
  client: Client,
  feePayer: Address
) => {
  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  return pipe(
    createTransaction({ version: 0 }),
    (tx) => setTransactionFeePayer(feePayer, tx),
    (tx) => setTransactionLifetimeUsingBlockhash(latestBlockhash, tx)
  );
};

export const signAndSendTransaction = async (
  client: Client,
  transaction: CompilableTransaction & ITransactionWithBlockhashLifetime
) => {
  const signedTransaction = await signTransactionWithSigners(transaction);
  await createDefaultTransactionSender(client)(signedTransaction, {
    commitment: 'confirmed',
  });
};

export const getBalance = async (client: Client, address: Address) =>
  (await client.rpc.getBalance(address, { commitment: 'confirmed' }).send())
    .value;
