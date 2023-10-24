import { pipe } from '@solana/functional';
import { lamports } from '@solana/rpc-types';
import {
  createDefaultAirdropRequester,
  createDefaultTransactionSender,
} from '@solana/web3.js';
import test from 'ava';
import { transferSol } from '../src';
import {
  createContext,
  createDefaultTransactionUsingLatestBlockhash,
  generateKeypairSigner,
  signTransactionWithSigners,
} from './_setup';

test('it can transfer SOL from one account to another', async (t) => {
  // Given a context object.
  const context = createContext();
  const { rpc } = context;
  const airdropRequester = createDefaultAirdropRequester(context);
  const transactionSender = createDefaultTransactionSender(context);

  // And a source account with 3 SOL.
  const source = await generateKeypairSigner();
  await airdropRequester({
    recipientAddress: source.address,
    lamports: lamports(3_000_000_000n),
    commitment: 'confirmed',
  });

  // And a destination account with no SOL.
  const destination = (await generateKeypairSigner()).address;

  // When the source account transfers 1 SOL to the destination account.
  await pipe(
    await createDefaultTransactionUsingLatestBlockhash(rpc, source.address), // V0 + feePayer + blockhash
    await transferSol(context, { source, destination, amount: 1_000_000_000 }),
    (tx) => signTransactionWithSigners(tx),
    async (tx) => transactionSender(await tx, { commitment: 'confirmed' })
  );

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
