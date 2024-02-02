import {
  appendTransactionInstruction,
  getBase58Encoder,
  getStringDecoder,
  pipe,
} from '@solana/web3.js';
import test from 'ava';
import { getAddMemoInstruction } from '../src';
import {
  createDefaultSolanaClient,
  createDefaultTransaction,
  generateKeyPairSignerWithSol,
  signAndSendTransaction,
} from './_setup';

test('it adds custom text to the transaction logs', async (t) => {
  // Given a payer wallet.
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);

  // When we create a transaction with a custom memo.
  const addMemo = getAddMemoInstruction({ memo: 'Hello world!' });
  const signature = await pipe(
    await createDefaultTransaction(client, payer.address),
    (tx) => appendTransactionInstruction(addMemo, tx),
    // FIXME: Store fee payer as signer in the transaction.
    async (tx) => {
      const [signatures] = await payer.signTransactions([tx]);
      return { ...tx, signatures };
    },
    async (tx) => signAndSendTransaction(client, await tx)
  );

  // Then the instruction data contains our memo.
  const result = await client.rpc
    .getTransaction(signature, { maxSupportedTransactionVersion: 0 })
    .send();
  const instructionDataBase58 =
    result!.transaction.message.instructions[0].data;
  const instructionDataBytes = getBase58Encoder().encode(instructionDataBase58);
  const instructionMemo = getStringDecoder().decode(instructionDataBytes);
  t.is(instructionMemo, 'Hello world!');
});
