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
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';

export type DeactivateLookupTableInstruction<
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

export type DeactivateLookupTableInstructionWithSigners<
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

export type DeactivateLookupTableInstructionData = { discriminator: number };

export type DeactivateLookupTableInstructionDataArgs = {};

export function getDeactivateLookupTableInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{ discriminator: number }>([
      ['discriminator', getU32Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 3 })
  ) satisfies Encoder<DeactivateLookupTableInstructionDataArgs>;
}

export function getDeactivateLookupTableInstructionDataDecoder() {
  return getStructDecoder<DeactivateLookupTableInstructionData>([
    ['discriminator', getU32Decoder()],
  ]) satisfies Decoder<DeactivateLookupTableInstructionData>;
}

export function getDeactivateLookupTableInstructionDataCodec(): Codec<
  DeactivateLookupTableInstructionDataArgs,
  DeactivateLookupTableInstructionData
> {
  return combineCodec(
    getDeactivateLookupTableInstructionDataEncoder(),
    getDeactivateLookupTableInstructionDataDecoder()
  );
}

export type DeactivateLookupTableInput<
  TAccountAddress extends string,
  TAccountAuthority extends string
> = {
  address: Address<TAccountAddress>;
  authority: Address<TAccountAuthority>;
};

export type DeactivateLookupTableInputWithSigners<
  TAccountAddress extends string,
  TAccountAuthority extends string
> = {
  address: Address<TAccountAddress>;
  authority: TransactionSigner<TAccountAuthority>;
};

export function getDeactivateLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: DeactivateLookupTableInputWithSigners<
    TAccountAddress,
    TAccountAuthority
  >
): DeactivateLookupTableInstructionWithSigners<
  TProgram,
  TAccountAddress,
  TAccountAuthority
>;
export function getDeactivateLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: DeactivateLookupTableInput<TAccountAddress, TAccountAuthority>
): DeactivateLookupTableInstruction<
  TProgram,
  TAccountAddress,
  TAccountAuthority
>;
export function getDeactivateLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: DeactivateLookupTableInput<TAccountAddress, TAccountAuthority>
): IInstruction {
  // Program address.
  const programAddress =
    'AddressLookupTab1e1111111111111111111111111' as Address<'AddressLookupTab1e1111111111111111111111111'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getDeactivateLookupTableInstructionRaw<
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

  const instruction = getDeactivateLookupTableInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    programAddress
  );

  return instruction;
}

export function getDeactivateLookupTableInstructionRaw<
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
    data: getDeactivateLookupTableInstructionDataEncoder().encode({}),
    programAddress,
  } as DeactivateLookupTableInstruction<
    TProgram,
    TAccountAddress,
    TAccountAuthority,
    TRemainingAccounts
  >;
}

export type ParsedDeactivateLookupTableInstruction<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
  programAddress: Address<TProgram>;
  accounts: {
    address: TAccountMetas[0];
    authority: TAccountMetas[1];
  };
  data: DeactivateLookupTableInstructionData;
};

export function parseDeactivateLookupTableInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[]
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedDeactivateLookupTableInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      address: getNextAccount(),
      authority: getNextAccount(),
    },
    data: getDeactivateLookupTableInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
