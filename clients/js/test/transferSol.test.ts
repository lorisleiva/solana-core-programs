import { pipe } from '@solana/functional';
import { lamports } from '@solana/rpc-types';
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
  generateKeyPairSigner,
  signTransactionWithSigners,
} from '@solana/signers';
import { addMemo, setComputeUnitLimit, transferSol } from '../src';
import { createContext } from './_setup';

test('it can transfer SOL from one account to another', async (t) => {
  // Given a context object.
  const context = createContext();
  const { rpc } = context;
  const airdropRequester = createDefaultAirdropRequester(context);

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
  const [{ value: latestBlockhash }, ...instructions] = await Promise.all([
    await rpc.getLatestBlockhash().send(),
    await setComputeUnitLimit(context, { units: 600_000 }),
    await transferSol(context, { source, destination, amount: 1_000_000_000 }),
    await addMemo(context, { memo: "I'm transferring some SOL!" }),
  ]);

  const transaction = pipe(
    createTransaction({ version: 0 }),
    (tx) => setTransactionFeePayer(source.address, tx),
    (tx) => setTransactionLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionInstruction(instructions[0], tx),
    (tx) => appendTransactionInstruction(instructions[1], tx),
    (tx) => appendTransactionInstruction(instructions[2], tx)
  );

  const signedTransaction = await signTransactionWithSigners(transaction);
  await createDefaultTransactionSender(context)(signedTransaction, {
    commitment: 'confirmed',
  });

  // Then the source account new has less than 2 SOL.
  t.true(
    (
      await context.rpc
        .getBalance(source.address, { commitment: 'confirmed' })
        .send()
    ).value < 2_000_000_000n
  );

  // And the destination account has exactly 1 SOL.
  t.is(
    (
      await context.rpc
        .getBalance(destination, { commitment: 'confirmed' })
        .send()
    ).value,
    lamports(1_000_000_000n)
  );
});
