import { pipe } from '@solana/functional';
import { lamports } from '@solana/rpc-core';
import {
  IFullySignedTransaction,
  appendTransactionInstruction,
  createDefaultAirdropRequester,
  createDefaultTransactionSender,
  createTransaction,
  setTransactionFeePayer,
  setTransactionLifetimeUsingBlockhash,
} from '@solana/web3.js';
import test from 'ava';
import { transferSol } from '../src';
import { createContext, generateKeypairSigner } from './_setup';

test('it can transfer SOL from one account to another', async (t) => {
  t.timeout(60_000);

  // Given a context object.
  const context = createContext();
  const airdropRequester = createDefaultAirdropRequester(context);
  const transactionSender = createDefaultTransactionSender(context);

  // And a source account with 3 SOL.
  const source = await generateKeypairSigner();
  await airdropRequester({
    recipientAddress: source.address,
    lamports: lamports(3_000_000_000n),
    commitment: 'finalized',
  });

  // And a destination account with no SOL.
  const destination = await generateKeypairSigner();

  // When the source account transfers 1 SOL to the destination account.
  const ix = await transferSol(context, {
    source,
    destination: destination.address,
    amount: 1_000_000_000,
  });

  const { value: latestBlockhash } = await context.rpc
    .getLatestBlockhash()
    .send();

  const transaction = pipe(
    createTransaction({ version: 0 }),
    (tx) => appendTransactionInstruction(ix.instruction, tx),
    (tx) => setTransactionFeePayer(source.address, tx),
    (tx) => setTransactionLifetimeUsingBlockhash(latestBlockhash, tx)
  );

  const [signedTx] = await ix.signers.reduce(
    async (txs, signer) =>
      'signTransaction' in signer ? signer.signTransaction(await txs) : txs,
    Promise.resolve([transaction])
  );
  const fullySignedTx = signedTx as typeof signedTx & IFullySignedTransaction;

  await transactionSender(fullySignedTx, {
    abortSignal: new AbortController().signal,
    commitment: 'finalized',
  });

  // Then the source account new has less than 2 SOL.
  t.true(
    (await context.rpc.getBalance(source.address).send()).value < 2_000_000_000n
  );

  // And the destination account has exactly 1 SOL.
  t.is(
    (await context.rpc.getBalance(destination.address).send()).value,
    lamports(1_000_000_000n)
  );
});
