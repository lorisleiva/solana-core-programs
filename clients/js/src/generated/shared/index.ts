/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  isProgramDerivedAddress,
  getProgramDerivedAddress as web3JsGetProgramDerivedAddress,
  ProgramDerivedAddress,
} from '@solana/addresses';
import { Decoder } from '@solana/codecs-core';
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  upgradeRoleToSigner,
} from '@solana/instructions';
import {
  IAccountSignerMeta,
  isTransactionSigner as web3JsIsTransactionSigner,
  TransactionSigner,
} from '@solana/signers';

/**
 * Asserts that the given value is not null or undefined.
 * @internal
 */
export function expectSome<T>(value: T | null | undefined): T {
  if (value == null) {
    throw new Error('Expected a value but received null or undefined.');
  }
  return value;
}

/**
 * Asserts that the given value is a PublicKey.
 * @internal
 */
export function expectAddress<T extends string = string>(
  value:
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null
    | undefined
): Address<T> {
  if (!value) {
    throw new Error('Expected a Address.');
  }
  if (typeof value === 'object' && 'address' in value) {
    return value.address;
  }
  if (Array.isArray(value)) {
    return value[0];
  }
  return value as Address<T>;
}

/**
 * Asserts that the given value is a PDA.
 * @internal
 */
export function expectProgramDerivedAddress<T extends string = string>(
  value:
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null
    | undefined
): ProgramDerivedAddress<T> {
  if (!value || !Array.isArray(value) || !isProgramDerivedAddress(value)) {
    throw new Error('Expected a ProgramDerivedAddress.');
  }
  return value;
}

/**
 * Asserts that the given value is a TransactionSigner.
 * @internal
 */
export function expectTransactionSigner<T extends string = string>(
  value:
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null
    | undefined
): TransactionSigner<T> {
  if (!value || !isTransactionSigner(value)) {
    throw new Error('Expected a TransactionSigner.');
  }
  return value;
}

/**
 * Defines an instruction account to resolve.
 * @internal
 */
export type ResolvedAccount<
  T extends string = string,
  U extends
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null = Address<T> | ProgramDerivedAddress<T> | TransactionSigner<T> | null
> = {
  isWritable: boolean;
  value: U;
};

/**
 * Add an account meta with a default role if only an address is provided.
 * @internal
 */
export function accountMetaWithDefault<
  TAccount extends string | IAccountMeta<string>,
  TRole extends AccountRole
>(account: TAccount | undefined, role: TRole) {
  if (account === undefined) return undefined;
  return (
    typeof account === 'string' ? { address: account, role } : account
  ) as TAccount extends string
    ? { address: Address<TAccount>; role: TRole }
    : TAccount;
}

/**
 * Defines an instruction that stores additional bytes on-chain.
 * @internal
 */
export type IInstructionWithBytesCreatedOnChain = {
  bytesCreatedOnChain: number;
};

/**
 * Get account metas and signers from resolved accounts.
 * @internal
 */
export function getAccountMetasWithSigners<TKey extends string = string>(
  accounts: Record<TKey, ResolvedAccount>,
  optionalAccountStrategy: 'omitted' | 'programId',
  programAddress: Address
): Record<TKey, IAccountMeta | IAccountSignerMeta> {
  const accountMetas: Record<string, IAccountMeta | IAccountSignerMeta> = {};

  Object.keys(accounts).forEach((key) => {
    const account = accounts[key as TKey] as ResolvedAccount;
    if (!account.value) {
      if (optionalAccountStrategy === 'omitted') return;
      accountMetas[key] = {
        address: programAddress,
        role: AccountRole.READONLY,
      };
      return;
    }

    const writableRole = account.isWritable
      ? AccountRole.WRITABLE
      : AccountRole.READONLY;
    accountMetas[key] = Object.freeze({
      address: expectAddress(account.value),
      role: isTransactionSigner(account.value)
        ? upgradeRoleToSigner(writableRole)
        : writableRole,
      ...(isTransactionSigner(account.value) ? { signer: account.value } : {}),
    });
  });

  return accountMetas;
}

export function isTransactionSigner<TAddress extends string = string>(
  value:
    | Address<TAddress>
    | ProgramDerivedAddress<TAddress>
    | TransactionSigner<TAddress>
): value is TransactionSigner<TAddress> {
  return (
    !!value &&
    typeof value === 'object' &&
    'address' in value &&
    web3JsIsTransactionSigner(value)
  );
}

export type CustomGeneratedInstruction<
  TInstruction extends IInstruction,
  TReturn
> = {
  getGeneratedInstruction: (instruction: TInstruction) => TReturn;
};

export type Context = {
  fetchEncodedAccount: <TAddress extends string = string>(
    address: Address<TAddress>,
    options?: FetchEncodedAccountOptions
  ) => Promise<MaybeEncodedAccount<TAddress>>;
  fetchEncodedAccounts: (
    addresses: Address[],
    options?: FetchEncodedAccountsOptions
  ) => Promise<MaybeEncodedAccount[]>;
  getProgramAddress?: (program: { name: string; address: Address }) => Address;
  getProgramDerivedAddress?: (
    programAddress: Address,
    seeds: Uint8Array[]
  ) => Promise<ProgramDerivedAddress>;
};

export function getProgramAddress<TAddress extends string = string>(
  context: Pick<Context, 'getProgramAddress'>,
  name: string,
  address: TAddress
): (typeof context)['getProgramAddress'] extends undefined
  ? Address<TAddress>
  : Address {
  return context.getProgramAddress
    ? context.getProgramAddress({ name, address: address as Address<TAddress> })
    : (address as Address<TAddress>);
}

export async function getProgramDerivedAddress(
  context: Pick<Context, 'getProgramDerivedAddress'>,
  programAddress: string,
  seeds: Uint8Array[]
): Promise<ProgramDerivedAddress> {
  return context.getProgramDerivedAddress
    ? context.getProgramDerivedAddress(programAddress as Address, seeds)
    : web3JsGetProgramDerivedAddress({
        programAddress: programAddress as Address,
        seeds,
      });
}

export const ACCOUNT_HEADER_SIZE = 128;

export type AccountHeader = {
  programAddress: Address;
  executable: boolean;
  lamports: bigint;
  rentEpoch?: bigint;
};

export type Account<
  TData extends object | Uint8Array,
  TAddress extends string = string
> = AccountHeader & {
  address: Address<TAddress>;
  data: TData;
};

export type MaybeAccount<
  TData extends object | Uint8Array,
  TAddress extends string = string
> =
  | ({ exists: true } & Account<TData, TAddress>)
  | { exists: false; address: Address<TAddress> };

export type EncodedAccount<TAddress extends string = string> = Account<
  Uint8Array,
  TAddress
>;
export type MaybeEncodedAccount<TAddress extends string = string> =
  MaybeAccount<Uint8Array, TAddress>;

export function decodeAccount<
  TData extends object,
  TAddress extends string = string
>(
  encodedAccount: EncodedAccount<TAddress>,
  decoder: Decoder<TData>
): Account<TData, TAddress> {
  try {
    return { ...encodedAccount, data: decoder.decode(encodedAccount.data) };
  } catch (error: any) {
    // TODO: Coded error.
    throw new Error(`Failed to decode account [${encodedAccount.address}].`);
  }
}

export function assertAccountExists<
  TData extends object | Uint8Array,
  TAddress extends string = string
>(
  account: MaybeAccount<TData, TAddress>
): asserts account is Account<TData, TAddress> & { exists: true } {
  if (!account.exists) {
    // TODO: Coded error.
    throw new Error(`Expected account [${account.address}] to exist.`);
  }
}

export type Commitment = 'confirmed' | 'finalized' | 'processed';

export type FetchEncodedAccountOptions = {
  commitment?: Commitment;
  abortSignal?: AbortSignal;
};

export type FetchEncodedAccountsOptions = {
  commitment?: Commitment;
  abortSignal?: AbortSignal;
};

export type Program<TAddress extends string = string> = {
  name: string;
  address: Address<TAddress>;
  getErrorFromCode?: (code: number, cause?: Error) => Error;
};

export type ProgramWithErrors<
  TErrorCode extends number = number,
  TError extends Error = Error
> = {
  getErrorFromCode: (code: TErrorCode, cause?: Error) => TError;
};
