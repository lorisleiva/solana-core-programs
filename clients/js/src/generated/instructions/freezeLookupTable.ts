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

export type FreezeLookupTableInstruction<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountAddress extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAddress extends string
        ? WritableAccount<TAccountAddress>
        : TAccountAddress,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts
    ]
  >;

export type FreezeLookupTableInstructionWithSigners<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountAddress extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAddress extends string
        ? WritableAccount<TAccountAddress>
        : TAccountAddress,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts
    ]
  >;

export type FreezeLookupTableInstructionData = { discriminator: number };

export type FreezeLookupTableInstructionDataArgs = {};

export function getFreezeLookupTableInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{ discriminator: number }>([
      ['discriminator', getU32Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 1 })
  ) satisfies Encoder<FreezeLookupTableInstructionDataArgs>;
}

export function getFreezeLookupTableInstructionDataDecoder() {
  return getStructDecoder<FreezeLookupTableInstructionData>([
    ['discriminator', getU32Decoder()],
  ]) satisfies Decoder<FreezeLookupTableInstructionData>;
}

export function getFreezeLookupTableInstructionDataCodec(): Codec<
  FreezeLookupTableInstructionDataArgs,
  FreezeLookupTableInstructionData
> {
  return combineCodec(
    getFreezeLookupTableInstructionDataEncoder(),
    getFreezeLookupTableInstructionDataDecoder()
  );
}

export type FreezeLookupTableInput<
  TAccountAddress extends string,
  TAccountAuthority extends string
> = {
  address: Address<TAccountAddress>;
  authority?: Address<TAccountAuthority>;
};

export type FreezeLookupTableInputWithSigners<
  TAccountAddress extends string,
  TAccountAuthority extends string
> = {
  address: Address<TAccountAddress>;
  authority?: TransactionSigner<TAccountAuthority>;
};

export function getFreezeLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: FreezeLookupTableInputWithSigners<TAccountAddress, TAccountAuthority>
): FreezeLookupTableInstructionWithSigners<
  TProgram,
  TAccountAddress,
  TAccountAuthority
>;
export function getFreezeLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: FreezeLookupTableInput<TAccountAddress, TAccountAuthority>
): FreezeLookupTableInstruction<TProgram, TAccountAddress, TAccountAuthority>;
export function getFreezeLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: FreezeLookupTableInputWithSigners<TAccountAddress, TAccountAuthority>
): FreezeLookupTableInstructionWithSigners<
  TProgram,
  TAccountAddress,
  TAccountAuthority
>;
export function getFreezeLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: FreezeLookupTableInput<TAccountAddress, TAccountAuthority>
): FreezeLookupTableInstruction<TProgram, TAccountAddress, TAccountAuthority>;
export function getFreezeLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | FreezeLookupTableInput<TAccountAddress, TAccountAuthority>,
  rawInput?: FreezeLookupTableInput<TAccountAddress, TAccountAuthority>
): IInstruction {
  // Resolve context and input arguments.
  const context = (rawInput === undefined ? {} : rawContext) as Pick<
    Context,
    'getProgramAddress'
  >;
  const input = (
    rawInput === undefined ? rawContext : rawInput
  ) as FreezeLookupTableInput<TAccountAddress, TAccountAuthority>;

  // Program address.
  const programAddress = getProgramAddress(
    context,
    'splAddressLookupTable',
    'AddressLookupTab1e1111111111111111111111111' as Address<'AddressLookupTab1e1111111111111111111111111'>
  );

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getFreezeLookupTableInstructionRaw<
      TProgram,
      TAccountAddress,
      TAccountAuthority
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    address: { value: input.address ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
  };

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getFreezeLookupTableInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    programAddress
  );

  return instruction;
}

export function getFreezeLookupTableInstructionRaw<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountAddress extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    address: TAccountAddress extends string
      ? Address<TAccountAddress>
      : TAccountAddress;
    authority: TAccountAuthority extends string
      ? Address<TAccountAuthority>
      : TAccountAuthority;
  },
  programAddress: Address<TProgram> = 'AddressLookupTab1e1111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.address, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.authority, AccountRole.READONLY_SIGNER),
      ...(remainingAccounts ?? []),
    ],
    data: getFreezeLookupTableInstructionDataEncoder().encode({}),
    programAddress,
  } as FreezeLookupTableInstruction<
    TProgram,
    TAccountAddress,
    TAccountAuthority,
    TRemainingAccounts
  >;
}
