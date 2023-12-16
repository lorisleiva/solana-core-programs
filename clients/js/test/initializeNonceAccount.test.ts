import { pipe } from '@solana/functional';
import { generateKeyPairSigner } from '@solana/signers';
import { appendTransactionInstruction } from '@solana/web3.js';
import test from 'ava';
import {
  Nonce,
  NonceState,
  NonceVersion,
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
  // Given some brand now payer, authority, and nonce KeyPairSigners.
  const client = createClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const nonce = await generateKeyPairSigner();
  const nonceAuthority = await generateKeyPairSigner();

  // When we use them to create and initialize a nonce account.
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
    nonceAuthority: nonceAuthority.address,
  });
  await pipe(
    await createDefaultTransaction(client, payer.address),
    (tx) => appendTransactionInstruction(createAccount, tx),
    (tx) => appendTransactionInstruction(initializeNonceAccount, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  // Then we expect the nonce account to exist with the following data.
  t.like(
    await fetchNonce(client.rpc, nonce.address, { commitment: 'confirmed' }),
    <Nonce>{
      address: nonce.address,
      data: {
        version: NonceVersion.Current,
        state: NonceState.Initialized,
        authority: nonceAuthority.address,
      },
    }
  );
});
