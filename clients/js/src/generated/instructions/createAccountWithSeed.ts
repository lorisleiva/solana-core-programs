/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  mapEncoder,
} from '@solana/codecs-core';
import {
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import {
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
} from '@solana/codecs-numbers';
import { getStringDecoder, getStringEncoder } from '@solana/codecs-strings';
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlySignerAccount,
  WritableAccount,
  WritableSignerAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import {
  Context,
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
  getProgramAddress,
} from '../shared';

export type CreateAccountWithSeedInstruction<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TAccountBaseAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer>
        : TAccountPayer,
      TAccountNewAccount extends string
        ? WritableAccount<TAccountNewAccount>
        : TAccountNewAccount,
      TAccountBaseAccount extends string
        ? ReadonlySignerAccount<TAccountBaseAccount>
        : TAccountBaseAccount,
      ...TRemainingAccounts
    ]
  >;

export type CreateAccountWithSeedInstructionWithSigners<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TAccountBaseAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountNewAccount extends string
        ? WritableAccount<TAccountNewAccount>
        : TAccountNewAccount,
      TAccountBaseAccount extends string
        ? ReadonlySignerAccount<TAccountBaseAccount> &
            IAccountSignerMeta<TAccountBaseAccount>
        : TAccountBaseAccount,
      ...TRemainingAccounts
    ]
  >;

export type CreateAccountWithSeedInstructionData = {
  discriminator: number;
  base: Address;
  seed: string;
  amount: bigint;
  space: bigint;
  programAddress: Address;
};

export type CreateAccountWithSeedInstructionDataArgs = {
  base: Address;
  seed: string;
  amount: number | bigint;
  space: number | bigint;
  programAddress: Address;
};

export function getCreateAccountWithSeedInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{
      discriminator: number;
      base: Address;
      seed: string;
      amount: number | bigint;
      space: number | bigint;
      programAddress: Address;
    }>([
      ['discriminator', getU32Encoder()],
      ['base', getAddressEncoder()],
      ['seed', getStringEncoder()],
      ['amount', getU64Encoder()],
      ['space', getU64Encoder()],
      ['programAddress', getAddressEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 3 })
  ) satisfies Encoder<CreateAccountWithSeedInstructionDataArgs>;
}

export function getCreateAccountWithSeedInstructionDataDecoder() {
  return getStructDecoder<CreateAccountWithSeedInstructionData>([
    ['discriminator', getU32Decoder()],
    ['base', getAddressDecoder()],
    ['seed', getStringDecoder()],
    ['amount', getU64Decoder()],
    ['space', getU64Decoder()],
    ['programAddress', getAddressDecoder()],
  ]) satisfies Decoder<CreateAccountWithSeedInstructionData>;
}

export function getCreateAccountWithSeedInstructionDataCodec(): Codec<
  CreateAccountWithSeedInstructionDataArgs,
  CreateAccountWithSeedInstructionData
> {
  return combineCodec(
    getCreateAccountWithSeedInstructionDataEncoder(),
    getCreateAccountWithSeedInstructionDataDecoder()
  );
}

export type CreateAccountWithSeedInput<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TAccountBaseAccount extends string
> = {
  payer?: Address<TAccountPayer>;
  newAccount: Address<TAccountNewAccount>;
  baseAccount: Address<TAccountBaseAccount>;
  base: CreateAccountWithSeedInstructionDataArgs['base'];
  seed: CreateAccountWithSeedInstructionDataArgs['seed'];
  amount: CreateAccountWithSeedInstructionDataArgs['amount'];
  space: CreateAccountWithSeedInstructionDataArgs['space'];
  programAddress: CreateAccountWithSeedInstructionDataArgs['programAddress'];
};

export type CreateAccountWithSeedInputWithSigners<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TAccountBaseAccount extends string
> = {
  payer?: TransactionSigner<TAccountPayer>;
  newAccount: Address<TAccountNewAccount>;
  baseAccount: TransactionSigner<TAccountBaseAccount>;
  base: CreateAccountWithSeedInstructionDataArgs['base'];
  seed: CreateAccountWithSeedInstructionDataArgs['seed'];
  amount: CreateAccountWithSeedInstructionDataArgs['amount'];
  space: CreateAccountWithSeedInstructionDataArgs['space'];
  programAddress: CreateAccountWithSeedInstructionDataArgs['programAddress'];
};

export function getCreateAccountWithSeedInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: CreateAccountWithSeedInputWithSigners<
    TAccountPayer,
    TAccountNewAccount,
    TAccountBaseAccount
  >
): CreateAccountWithSeedInstructionWithSigners<
  TProgram,
  TAccountPayer,
  TAccountNewAccount,
  TAccountBaseAccount
>;
export function getCreateAccountWithSeedInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: CreateAccountWithSeedInput<
    TAccountPayer,
    TAccountNewAccount,
    TAccountBaseAccount
  >
): CreateAccountWithSeedInstruction<
  TProgram,
  TAccountPayer,
  TAccountNewAccount,
  TAccountBaseAccount
>;
export function getCreateAccountWithSeedInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  input: CreateAccountWithSeedInputWithSigners<
    TAccountPayer,
    TAccountNewAccount,
    TAccountBaseAccount
  >
): CreateAccountWithSeedInstructionWithSigners<
  TProgram,
  TAccountPayer,
  TAccountNewAccount,
  TAccountBaseAccount
>;
export function getCreateAccountWithSeedInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  input: CreateAccountWithSeedInput<
    TAccountPayer,
    TAccountNewAccount,
    TAccountBaseAccount
  >
): CreateAccountWithSeedInstruction<
  TProgram,
  TAccountPayer,
  TAccountNewAccount,
  TAccountBaseAccount
>;
export function getCreateAccountWithSeedInstruction<
  TAccountPayer extends string,
  TAccountNewAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | CreateAccountWithSeedInput<
        TAccountPayer,
        TAccountNewAccount,
        TAccountBaseAccount
      >,
  rawInput?: CreateAccountWithSeedInput<
    TAccountPayer,
    TAccountNewAccount,
    TAccountBaseAccount
  >
): IInstruction {
  // Resolve context and input arguments.
  const context = (rawInput === undefined ? {} : rawContext) as Pick<
    Context,
    'getProgramAddress'
  >;
  const input = (
    rawInput === undefined ? rawContext : rawInput
  ) as CreateAccountWithSeedInput<
    TAccountPayer,
    TAccountNewAccount,
    TAccountBaseAccount
  >;

  // Program address.
  const programAddress = getProgramAddress(
    context,
    'splSystem',
    '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>
  );

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getCreateAccountWithSeedInstructionRaw<
      TProgram,
      TAccountPayer,
      TAccountNewAccount,
      TAccountBaseAccount
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    payer: { value: input.payer ?? null, isWritable: true },
    newAccount: { value: input.newAccount ?? null, isWritable: true },
    baseAccount: { value: input.baseAccount ?? null, isWritable: false },
  };

  // Original args.
  const args = { ...input };

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getCreateAccountWithSeedInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    args as CreateAccountWithSeedInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export function getCreateAccountWithSeedInstructionRaw<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TAccountBaseAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    payer: TAccountPayer extends string
      ? Address<TAccountPayer>
      : TAccountPayer;
    newAccount: TAccountNewAccount extends string
      ? Address<TAccountNewAccount>
      : TAccountNewAccount;
    baseAccount: TAccountBaseAccount extends string
      ? Address<TAccountBaseAccount>
      : TAccountBaseAccount;
  },
  args: CreateAccountWithSeedInstructionDataArgs,
  programAddress: Address<TProgram> = '11111111111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.payer, AccountRole.WRITABLE_SIGNER),
      accountMetaWithDefault(accounts.newAccount, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.baseAccount, AccountRole.READONLY_SIGNER),
      ...(remainingAccounts ?? []),
    ],
    data: getCreateAccountWithSeedInstructionDataEncoder().encode(args),
    programAddress,
  } as CreateAccountWithSeedInstruction<
    TProgram,
    TAccountPayer,
    TAccountNewAccount,
    TAccountBaseAccount,
    TRemainingAccounts
  >;
}
