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
import { getU32Decoder, getU32Encoder } from '@solana/codecs-numbers';
import { getStringDecoder, getStringEncoder } from '@solana/codecs-strings';
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlySignerAccount,
  WritableAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import {
  Context,
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';

// Output.
export type AssignWithSeedInstruction<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountAccount extends string | IAccountMeta<string> = string,
  TAccountBaseAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAccount extends string
        ? WritableAccount<TAccountAccount>
        : TAccountAccount,
      TAccountBaseAccount extends string
        ? ReadonlySignerAccount<TAccountBaseAccount>
        : TAccountBaseAccount,
      ...TRemainingAccounts
    ]
  >;

// Output.
export type AssignWithSeedInstructionWithSigners<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountAccount extends string | IAccountMeta<string> = string,
  TAccountBaseAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAccount extends string
        ? WritableAccount<TAccountAccount>
        : TAccountAccount,
      TAccountBaseAccount extends string
        ? ReadonlySignerAccount<TAccountBaseAccount> &
            IAccountSignerMeta<TAccountBaseAccount>
        : TAccountBaseAccount,
      ...TRemainingAccounts
    ]
  >;

export type AssignWithSeedInstructionData = {
  discriminator: number;
  base: Address;
  seed: string;
  programAddress: Address;
};

export type AssignWithSeedInstructionDataArgs = {
  base: Address;
  seed: string;
  programAddress: Address;
};

export function getAssignWithSeedInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{
      discriminator: number;
      base: Address;
      seed: string;
      programAddress: Address;
    }>([
      ['discriminator', getU32Encoder()],
      ['base', getAddressEncoder()],
      ['seed', getStringEncoder()],
      ['programAddress', getAddressEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 10 })
  ) satisfies Encoder<AssignWithSeedInstructionDataArgs>;
}

export function getAssignWithSeedInstructionDataDecoder() {
  return getStructDecoder<AssignWithSeedInstructionData>([
    ['discriminator', getU32Decoder()],
    ['base', getAddressDecoder()],
    ['seed', getStringDecoder()],
    ['programAddress', getAddressDecoder()],
  ]) satisfies Decoder<AssignWithSeedInstructionData>;
}

export function getAssignWithSeedInstructionDataCodec(): Codec<
  AssignWithSeedInstructionDataArgs,
  AssignWithSeedInstructionData
> {
  return combineCodec(
    getAssignWithSeedInstructionDataEncoder(),
    getAssignWithSeedInstructionDataDecoder()
  );
}

export type AssignWithSeedInput<
  TAccountAccount extends string,
  TAccountBaseAccount extends string
> = {
  account: Address<TAccountAccount>;
  baseAccount: Address<TAccountBaseAccount>;
  base: AssignWithSeedInstructionDataArgs['base'];
  seed: AssignWithSeedInstructionDataArgs['seed'];
  programAddress: AssignWithSeedInstructionDataArgs['programAddress'];
};

export type AssignWithSeedInputWithSigners<
  TAccountAccount extends string,
  TAccountBaseAccount extends string
> = {
  account: Address<TAccountAccount>;
  baseAccount: TransactionSigner<TAccountBaseAccount>;
  base: AssignWithSeedInstructionDataArgs['base'];
  seed: AssignWithSeedInstructionDataArgs['seed'];
  programAddress: AssignWithSeedInstructionDataArgs['programAddress'];
};

export function getAssignWithSeedInstruction<
  TAccountAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: AssignWithSeedInputWithSigners<TAccountAccount, TAccountBaseAccount>
): AssignWithSeedInstructionWithSigners<
  TProgram,
  TAccountAccount,
  TAccountBaseAccount
>;
export function getAssignWithSeedInstruction<
  TAccountAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: AssignWithSeedInput<TAccountAccount, TAccountBaseAccount>
): AssignWithSeedInstruction<TProgram, TAccountAccount, TAccountBaseAccount>;
export function getAssignWithSeedInstruction<
  TAccountAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  input: AssignWithSeedInputWithSigners<TAccountAccount, TAccountBaseAccount>
): AssignWithSeedInstructionWithSigners<
  TProgram,
  TAccountAccount,
  TAccountBaseAccount
>;
export function getAssignWithSeedInstruction<
  TAccountAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  input: AssignWithSeedInput<TAccountAccount, TAccountBaseAccount>
): AssignWithSeedInstruction<TProgram, TAccountAccount, TAccountBaseAccount>;
export function getAssignWithSeedInstruction<
  TAccountAccount extends string,
  TAccountBaseAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | AssignWithSeedInput<TAccountAccount, TAccountBaseAccount>,
  rawInput?: AssignWithSeedInput<TAccountAccount, TAccountBaseAccount>
): IInstruction {
  // Resolve context and input arguments.
  const context = (rawInput === undefined ? {} : rawContext) as Pick<
    Context,
    'getProgramAddress'
  >;
  const input = (
    rawInput === undefined ? rawContext : rawInput
  ) as AssignWithSeedInput<TAccountAccount, TAccountBaseAccount>;

  // Program address.
  const defaultProgramAddress =
    '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  const programAddress = (
    context.getProgramAddress
      ? context.getProgramAddress({
          name: 'splSystem',
          address: defaultProgramAddress,
        })
      : defaultProgramAddress
  ) as Address<TProgram>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getAssignWithSeedInstructionRaw<
      TProgram,
      TAccountAccount,
      TAccountBaseAccount
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    account: { value: input.account ?? null, isWritable: true },
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

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = [];

  // Bytes created on chain.
  const bytesCreatedOnChain = 0;

  return Object.freeze({
    ...getAssignWithSeedInstructionRaw(
      accountMetas as Record<keyof AccountMetas, IAccountMeta>,
      args as AssignWithSeedInstructionDataArgs,
      programAddress,
      remainingAccounts
    ),
    bytesCreatedOnChain,
  });
}

export function getAssignWithSeedInstructionRaw<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountAccount extends string | IAccountMeta<string> = string,
  TAccountBaseAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    account: TAccountAccount extends string
      ? Address<TAccountAccount>
      : TAccountAccount;
    baseAccount: TAccountBaseAccount extends string
      ? Address<TAccountBaseAccount>
      : TAccountBaseAccount;
  },
  args: AssignWithSeedInstructionDataArgs,
  programAddress: Address<TProgram> = '11111111111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.account, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.baseAccount, AccountRole.READONLY_SIGNER),
      ...(remainingAccounts ?? []),
    ],
    data: getAssignWithSeedInstructionDataEncoder().encode(args),
    programAddress,
  } as AssignWithSeedInstruction<
    TProgram,
    TAccountAccount,
    TAccountBaseAccount,
    TRemainingAccounts
  >;
}