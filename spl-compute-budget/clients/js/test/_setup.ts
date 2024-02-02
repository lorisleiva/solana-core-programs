/* eslint-disable import/no-extraneous-dependencies */
import '@solana/webcrypto-ed25519-polyfill';

import {
  Address,
  Commitment,
  CompilableTransaction,
  ITransactionWithBlockhashLifetime,
  createDefaultAirdropRequester,
  createDefaultRpcSubscriptionsTransport,
  createDefaultRpcTransport,
  createDefaultTransactionSender,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransaction,
  generateKeyPairSigner,
  getSignatureFromTransaction,
  lamports,
  pipe,
  setTransactionFeePayer,
  setTransactionLifetimeUsingBlockhash,
  signTransactionWithSigners,
} from '@solana/web3.js';

type Client = {
  rpc: ReturnType<typeof createSolanaRpc>;
  rpcSubscriptions: ReturnType<typeof createSolanaRpcSubscriptions>;
};

export const createDefaultSolanaClient = (): Client => {
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
  transaction: CompilableTransaction & ITransactionWithBlockhashLifetime,
  commitment: Commitment = 'confirmed'
) => {
  const signedTransaction = await signTransactionWithSigners(transaction);
  const signature = getSignatureFromTransaction(signedTransaction);
  await createDefaultTransactionSender(client)(signedTransaction, {
    commitment,
  });
  return signature;
};
