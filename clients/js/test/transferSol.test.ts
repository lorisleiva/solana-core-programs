import { pipe } from '@solana/functional';
import { lamports } from '@solana/rpc-types';
import { generateKeyPairSigner } from '@solana/signers';
import { appendTransactionInstruction } from '@solana/web3.js';
import test from 'ava';
import { getTransferSolInstruction } from '../src';
import {
  createClient,
  createDefaultTransaction,
  generateKeyPairSignerWithSol,
  getBalance,
  signAndSendTransaction,
} from './_setup';

test('it can transfer SOL from one account to another', async (t) => {
  // Given a source account with 3 SOL and a destination account with no SOL.
  const client = createClient();
  const source = await generateKeyPairSignerWithSol(client, 3_000_000_000n);
  const destination = (await generateKeyPairSigner()).address;

  // When the source account transfers 1 SOL to the destination account.
  const transferSol = getTransferSolInstruction({
    source,
    destination,
    amount: 1_000_000_000,
  });
  await pipe(
    await createDefaultTransaction(client, source.address),
    (tx) => appendTransactionInstruction(transferSol, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  // Then the source account now has roughly 2 SOL (minus the transaction fee).
  const sourceBalance = await getBalance(client, source.address);
  t.true(sourceBalance < 2_000_000_000n);
  t.true(sourceBalance > 1_999_000_000n);

  // And the destination account has exactly 1 SOL.
  t.is(await getBalance(client, destination), lamports(1_000_000_000n));
});
