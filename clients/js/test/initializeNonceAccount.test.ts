import { fetchEncodedAccount } from '@solana/accounts';
import { pipe } from '@solana/functional';
import { generateKeyPairSigner } from '@solana/signers';
import { appendTransactionInstruction } from '@solana/web3.js';
import test from 'ava';
import {
  Context,
  Nonce,
  SPL_SYSTEM_PROGRAM_ADDRESS,
  fetchNonce,
  getCreateAccountInstruction,
  getInitializeNonceAccountInstruction,
} from '../src';
import {
  createClient,
  createDefaultTransaction,
  generateKeyPairSignerWithSol,
  signAndSendTransaction,
} from './_setup';

test('it can create and initialize a durable nonce account', async (t) => {
  // Given
  const client = createClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const nonce = await generateKeyPairSigner();

  // When
  const rent = await client.rpc.getMinimumBalanceForRentExemption(80n).send();
  const createAccount = getCreateAccountInstruction({
    payer,
    newAccount: nonce,
    lamports: rent,
    space: 80,
    programAddress: SPL_SYSTEM_PROGRAM_ADDRESS,
  });
  const initializeNonceAccount = getInitializeNonceAccountInstruction({
    nonceAccount: nonce.address,
    nonceAuthority: payer.address,
  });
  await pipe(
    await createDefaultTransaction(client, payer.address),
    (tx) => appendTransactionInstruction(createAccount, tx),
    (tx) => appendTransactionInstruction(initializeNonceAccount, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  // Then
  const context = {
    fetchEncodedAccount: (
      address: Parameters<typeof fetchEncodedAccount>[1],
      config: Parameters<typeof fetchEncodedAccount>[2]
    ) => fetchEncodedAccount(client.rpc, address, config),
  } as Pick<Context, 'fetchEncodedAccount'>;
  const account = await fetchNonce(context, nonce.address, {
    commitment: 'confirmed',
  });
  t.like(account, <Nonce>{
    address: nonce.address,
    data: {
      discriminator: 1,
      state: 1,
      authority: payer.address,
    },
  });
});
