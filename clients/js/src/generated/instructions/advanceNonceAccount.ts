/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Address } from '@solana/addresses';
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
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  ReadonlySignerAccount,
  WritableAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import {
  Context,
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
  getProgramAddress,
} from '../shared';

export type AdvanceNonceAccountInstruction<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountNonceAccount extends string | IAccountMeta<string> = string,
  TAccountRecentBlockhashesSysvar extends
    | string
    | IAccountMeta<string> = 'SysvarRecentB1ockHashes11111111111111111111',
  TAccountNonceAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountNonceAccount extends string
        ? WritableAccount<TAccountNonceAccount>
        : TAccountNonceAccount,
      TAccountRecentBlockhashesSysvar extends string
        ? ReadonlyAccount<TAccountRecentBlockhashesSysvar>
        : TAccountRecentBlockhashesSysvar,
      TAccountNonceAuthority extends string
        ? ReadonlySignerAccount<TAccountNonceAuthority>
        : TAccountNonceAuthority,
      ...TRemainingAccounts
    ]
  >;

export type AdvanceNonceAccountInstructionWithSigners<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountNonceAccount extends string | IAccountMeta<string> = string,
  TAccountRecentBlockhashesSysvar extends
    | string
    | IAccountMeta<string> = 'SysvarRecentB1ockHashes11111111111111111111',
  TAccountNonceAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountNonceAccount extends string
        ? WritableAccount<TAccountNonceAccount>
        : TAccountNonceAccount,
      TAccountRecentBlockhashesSysvar extends string
        ? ReadonlyAccount<TAccountRecentBlockhashesSysvar>
        : TAccountRecentBlockhashesSysvar,
      TAccountNonceAuthority extends string
        ? ReadonlySignerAccount<TAccountNonceAuthority> &
            IAccountSignerMeta<TAccountNonceAuthority>
        : TAccountNonceAuthority,
      ...TRemainingAccounts
    ]
  >;

export type AdvanceNonceAccountInstructionData = { discriminator: number };

export type AdvanceNonceAccountInstructionDataArgs = {};

export function getAdvanceNonceAccountInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{ discriminator: number }>([
      ['discriminator', getU32Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 4 })
  ) satisfies Encoder<AdvanceNonceAccountInstructionDataArgs>;
}

export function getAdvanceNonceAccountInstructionDataDecoder() {
  return getStructDecoder<AdvanceNonceAccountInstructionData>([
    ['discriminator', getU32Decoder()],
  ]) satisfies Decoder<AdvanceNonceAccountInstructionData>;
}

export function getAdvanceNonceAccountInstructionDataCodec(): Codec<
  AdvanceNonceAccountInstructionDataArgs,
  AdvanceNonceAccountInstructionData
> {
  return combineCodec(
    getAdvanceNonceAccountInstructionDataEncoder(),
    getAdvanceNonceAccountInstructionDataDecoder()
  );
}

export type AdvanceNonceAccountInput<
  TAccountNonceAccount extends string,
  TAccountRecentBlockhashesSysvar extends string,
  TAccountNonceAuthority extends string
> = {
  nonceAccount: Address<TAccountNonceAccount>;
  recentBlockhashesSysvar?: Address<TAccountRecentBlockhashesSysvar>;
  nonceAuthority: Address<TAccountNonceAuthority>;
};

export type AdvanceNonceAccountInputWithSigners<
  TAccountNonceAccount extends string,
  TAccountRecentBlockhashesSysvar extends string,
  TAccountNonceAuthority extends string
> = {
  nonceAccount: Address<TAccountNonceAccount>;
  recentBlockhashesSysvar?: Address<TAccountRecentBlockhashesSysvar>;
  nonceAuthority: TransactionSigner<TAccountNonceAuthority>;
};

export function getAdvanceNonceAccountInstruction<
  TAccountNonceAccount extends string,
  TAccountRecentBlockhashesSysvar extends string,
  TAccountNonceAuthority extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: AdvanceNonceAccountInputWithSigners<
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountNonceAuthority
  >
): AdvanceNonceAccountInstructionWithSigners<
  TProgram,
  TAccountNonceAccount,
  TAccountRecentBlockhashesSysvar,
  TAccountNonceAuthority
>;
export function getAdvanceNonceAccountInstruction<
  TAccountNonceAccount extends string,
  TAccountRecentBlockhashesSysvar extends string,
  TAccountNonceAuthority extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: AdvanceNonceAccountInput<
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountNonceAuthority
  >
): AdvanceNonceAccountInstruction<
  TProgram,
  TAccountNonceAccount,
  TAccountRecentBlockhashesSysvar,
  TAccountNonceAuthority
>;
export function getAdvanceNonceAccountInstruction<
  TAccountNonceAccount extends string,
  TAccountRecentBlockhashesSysvar extends string,
  TAccountNonceAuthority extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  input: AdvanceNonceAccountInputWithSigners<
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountNonceAuthority
  >
): AdvanceNonceAccountInstructionWithSigners<
  TProgram,
  TAccountNonceAccount,
  TAccountRecentBlockhashesSysvar,
  TAccountNonceAuthority
>;
export function getAdvanceNonceAccountInstruction<
  TAccountNonceAccount extends string,
  TAccountRecentBlockhashesSysvar extends string,
  TAccountNonceAuthority extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  input: AdvanceNonceAccountInput<
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountNonceAuthority
  >
): AdvanceNonceAccountInstruction<
  TProgram,
  TAccountNonceAccount,
  TAccountRecentBlockhashesSysvar,
  TAccountNonceAuthority
>;
export function getAdvanceNonceAccountInstruction<
  TAccountNonceAccount extends string,
  TAccountRecentBlockhashesSysvar extends string,
  TAccountNonceAuthority extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | AdvanceNonceAccountInput<
        TAccountNonceAccount,
        TAccountRecentBlockhashesSysvar,
        TAccountNonceAuthority
      >,
  rawInput?: AdvanceNonceAccountInput<
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountNonceAuthority
  >
): IInstruction {
  // Resolve context and input arguments.
  const context = (rawInput === undefined ? {} : rawContext) as Pick<
    Context,
    'getProgramAddress'
  >;
  const input = (
    rawInput === undefined ? rawContext : rawInput
  ) as AdvanceNonceAccountInput<
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountNonceAuthority
  >;

  // Program address.
  const programAddress = getProgramAddress(
    context,
    'splSystem',
    '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>
  );

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getAdvanceNonceAccountInstructionRaw<
      TProgram,
      TAccountNonceAccount,
      TAccountRecentBlockhashesSysvar,
      TAccountNonceAuthority
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    nonceAccount: { value: input.nonceAccount ?? null, isWritable: true },
    recentBlockhashesSysvar: {
      value: input.recentBlockhashesSysvar ?? null,
      isWritable: false,
    },
    nonceAuthority: { value: input.nonceAuthority ?? null, isWritable: false },
  };

  // Resolve default values.
  if (!accounts.recentBlockhashesSysvar.value) {
    accounts.recentBlockhashesSysvar.value =
      'SysvarRecentB1ockHashes11111111111111111111' as Address<'SysvarRecentB1ockHashes11111111111111111111'>;
  }

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getAdvanceNonceAccountInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    programAddress
  );

  return instruction;
}

export function getAdvanceNonceAccountInstructionRaw<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountNonceAccount extends string | IAccountMeta<string> = string,
  TAccountRecentBlockhashesSysvar extends
    | string
    | IAccountMeta<string> = 'SysvarRecentB1ockHashes11111111111111111111',
  TAccountNonceAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    nonceAccount: TAccountNonceAccount extends string
      ? Address<TAccountNonceAccount>
      : TAccountNonceAccount;
    recentBlockhashesSysvar?: TAccountRecentBlockhashesSysvar extends string
      ? Address<TAccountRecentBlockhashesSysvar>
      : TAccountRecentBlockhashesSysvar;
    nonceAuthority: TAccountNonceAuthority extends string
      ? Address<TAccountNonceAuthority>
      : TAccountNonceAuthority;
  },
  programAddress: Address<TProgram> = '11111111111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.nonceAccount, AccountRole.WRITABLE),
      accountMetaWithDefault(
        accounts.recentBlockhashesSysvar ??
          'SysvarRecentB1ockHashes11111111111111111111',
        AccountRole.READONLY
      ),
      accountMetaWithDefault(
        accounts.nonceAuthority,
        AccountRole.READONLY_SIGNER
      ),
      ...(remainingAccounts ?? []),
    ],
    data: getAdvanceNonceAccountInstructionDataEncoder().encode({}),
    programAddress,
  } as AdvanceNonceAccountInstruction<
    TProgram,
    TAccountNonceAccount,
    TAccountRecentBlockhashesSysvar,
    TAccountNonceAuthority,
    TRemainingAccounts
  >;
}
