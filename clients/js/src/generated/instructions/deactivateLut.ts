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
import { IInstructionWithSigners, TransactionSigner } from '@solana/signers';
import {
  Context,
  CustomGeneratedInstruction,
  IInstructionWithBytesCreatedOnChain,
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';

// Output.
export type DeactivateLutInstruction<
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

export type DeactivateLutInstructionData = { discriminator: number };

export type DeactivateLutInstructionDataArgs = {};

export function getDeactivateLutInstructionDataEncoder(): Encoder<DeactivateLutInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder<{ discriminator: number }>(
      [['discriminator', getU32Encoder()]],
      { description: 'DeactivateLutInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 3 })
  ) as Encoder<DeactivateLutInstructionDataArgs>;
}

export function getDeactivateLutInstructionDataDecoder(): Decoder<DeactivateLutInstructionData> {
  return getStructDecoder<DeactivateLutInstructionData>(
    [['discriminator', getU32Decoder()]],
    { description: 'DeactivateLutInstructionData' }
  ) as Decoder<DeactivateLutInstructionData>;
}

export function getDeactivateLutInstructionDataCodec(): Codec<
  DeactivateLutInstructionDataArgs,
  DeactivateLutInstructionData
> {
  return combineCodec(
    getDeactivateLutInstructionDataEncoder(),
    getDeactivateLutInstructionDataDecoder()
  );
}

export function deactivateLutInstruction<
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
    data: getDeactivateLutInstructionDataEncoder().encode({}),
    programAddress,
  } as DeactivateLutInstruction<
    TProgram,
    TAccountAddress,
    TAccountAuthority,
    TRemainingAccounts
  >;
}

// Input.
export type DeactivateLutInput<
  TAccountAddress extends string,
  TAccountAuthority extends string
> = {
  address: Address<TAccountAddress>;
  authority?: TransactionSigner<TAccountAuthority>;
};

export async function deactivateLut<
  TReturn,
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'> &
    CustomGeneratedInstruction<
      DeactivateLutInstruction<TProgram, TAccountAddress, TAccountAuthority>,
      TReturn
    >,
  input: DeactivateLutInput<TAccountAddress, TAccountAuthority>
): Promise<TReturn>;
export async function deactivateLut<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: DeactivateLutInput<TAccountAddress, TAccountAuthority>
): Promise<
  DeactivateLutInstruction<TProgram, TAccountAddress, TAccountAuthority> &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function deactivateLut<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: DeactivateLutInput<TAccountAddress, TAccountAuthority>
): Promise<
  DeactivateLutInstruction<TProgram, TAccountAddress, TAccountAuthority> &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function deactivateLut<
  TReturn,
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | (Pick<Context, 'getProgramAddress'> &
        CustomGeneratedInstruction<IInstruction, TReturn>)
    | DeactivateLutInput<TAccountAddress, TAccountAuthority>,
  rawInput?: DeactivateLutInput<TAccountAddress, TAccountAuthority>
): Promise<
  | TReturn
  | (IInstruction &
      IInstructionWithSigners &
      IInstructionWithBytesCreatedOnChain)
> {
  // Resolve context and input arguments.
  const context = (rawInput === undefined ? {} : rawContext) as
    | Pick<Context, 'getProgramAddress'>
    | (Pick<Context, 'getProgramAddress'> &
        CustomGeneratedInstruction<IInstruction, TReturn>);
  const input = (
    rawInput === undefined ? rawContext : rawInput
  ) as DeactivateLutInput<TAccountAddress, TAccountAuthority>;

  // Program address.
  const defaultProgramAddress =
    'AddressLookupTab1e1111111111111111111111111' as Address<'AddressLookupTab1e1111111111111111111111111'>;
  const programAddress = (
    context.getProgramAddress
      ? await context.getProgramAddress({
          name: 'splAddressLookupTable',
          address: defaultProgramAddress,
        })
      : defaultProgramAddress
  ) as Address<TProgram>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof deactivateLutInstruction<
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

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = [];

  // Bytes created on chain.
  const bytesCreatedOnChain = 0;

  // Instruction.
  const instruction = {
    ...deactivateLutInstruction(
      accountMetas as Record<keyof AccountMetas, IAccountMeta>,
      programAddress,
      remainingAccounts
    ),
    bytesCreatedOnChain,
  };

  return 'getGeneratedInstruction' in context && context.getGeneratedInstruction
    ? context.getGeneratedInstruction(instruction)
    : instruction;
}
