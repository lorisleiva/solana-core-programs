import { pipe } from '@solana/functional';
import { lamports } from '@solana/rpc-types';
import {
  generateKeyPairSigner,
  signTransactionWithSigners,
} from '@solana/signers';
import {
  appendTransactionInstruction,
  createDefaultAirdropRequester,
  createDefaultTransactionSender,
  createTransaction,
  setTransactionFeePayer,
  setTransactionLifetimeUsingBlockhash,
} from '@solana/web3.js';
import test from 'ava';
import {
  getAddMemoInstruction,
  getSetComputeUnitLimitInstruction,
  getTransferSolInstruction,
} from '../src';
import { createClient } from './_setup';

test('it can transfer SOL from one account to another', async (t) => {
  // Given a context object.
  const client = createClient();
  const airdropRequester = createDefaultAirdropRequester(client);

  // And a source account with 3 SOL.
  const source = await generateKeyPairSigner();
  await airdropRequester({
    recipientAddress: source.address,
    lamports: lamports(3_000_000_000n),
    commitment: 'confirmed',
  });

  // And a destination account with no SOL.
  const destination = (await generateKeyPairSigner()).address;

  // When the source account transfers 1 SOL to the destination account.
  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  const setComputeUnitLimit = getSetComputeUnitLimitInstruction({
    units: 600_000,
  });
  const transferSol = getTransferSolInstruction({
    source,
    destination,
    amount: 1_000_000_000,
  });
  const addMemo = getAddMemoInstruction({ memo: "I'm transferring some SOL!" });

  const transaction = pipe(
    createTransaction({ version: 0 }),
    (tx) => setTransactionFeePayer(source.address, tx),
    (tx) => setTransactionLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionInstruction(setComputeUnitLimit, tx),
    (tx) => appendTransactionInstruction(transferSol, tx),
    (tx) => appendTransactionInstruction(addMemo, tx)
  );

  const signedTransaction = await signTransactionWithSigners(transaction);
  await createDefaultTransactionSender(client)(signedTransaction, {
    commitment: 'confirmed',
  });

  // Then the source account new has less than 2 SOL.
  t.true(
    (
      await client.rpc
        .getBalance(source.address, { commitment: 'confirmed' })
        .send()
    ).value < 2_000_000_000n
  );

  // And the destination account has exactly 1 SOL.
  t.is(
    (
      await client.rpc
        .getBalance(destination, { commitment: 'confirmed' })
        .send()
    ).value,
    lamports(1_000_000_000n)
  );
});
