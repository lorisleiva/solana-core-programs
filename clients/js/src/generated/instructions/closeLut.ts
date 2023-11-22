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
export type CloseLutInstruction<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountAddress extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountRecipient extends string | IAccountMeta<string> = string,
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
      TAccountRecipient extends string
        ? WritableAccount<TAccountRecipient>
        : TAccountRecipient,
      ...TRemainingAccounts
    ]
  >;

export type CloseLutInstructionData = { discriminator: number };

export type CloseLutInstructionDataArgs = {};

export function getCloseLutInstructionDataEncoder(): Encoder<CloseLutInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder<{ discriminator: number }>(
      [['discriminator', getU32Encoder()]],
      { description: 'CloseLutInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 4 })
  ) as Encoder<CloseLutInstructionDataArgs>;
}

export function getCloseLutInstructionDataDecoder(): Decoder<CloseLutInstructionData> {
  return getStructDecoder<CloseLutInstructionData>(
    [['discriminator', getU32Decoder()]],
    { description: 'CloseLutInstructionData' }
  ) as Decoder<CloseLutInstructionData>;
}

export function getCloseLutInstructionDataCodec(): Codec<
  CloseLutInstructionDataArgs,
  CloseLutInstructionData
> {
  return combineCodec(
    getCloseLutInstructionDataEncoder(),
    getCloseLutInstructionDataDecoder()
  );
}

export function closeLutInstruction<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountAddress extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountRecipient extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    address: TAccountAddress extends string
      ? Address<TAccountAddress>
      : TAccountAddress;
    authority: TAccountAuthority extends string
      ? Address<TAccountAuthority>
      : TAccountAuthority;
    recipient: TAccountRecipient extends string
      ? Address<TAccountRecipient>
      : TAccountRecipient;
  },
  programAddress: Address<TProgram> = 'AddressLookupTab1e1111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.address, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.authority, AccountRole.READONLY_SIGNER),
      accountMetaWithDefault(accounts.recipient, AccountRole.WRITABLE),
      ...(remainingAccounts ?? []),
    ],
    data: getCloseLutInstructionDataEncoder().encode({}),
    programAddress,
  } as CloseLutInstruction<
    TProgram,
    TAccountAddress,
    TAccountAuthority,
    TAccountRecipient,
    TRemainingAccounts
  >;
}

// Input.
export type CloseLutInput<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountRecipient extends string
> = {
  address: Address<TAccountAddress>;
  authority?: TransactionSigner<TAccountAuthority>;
  recipient: Address<TAccountRecipient>;
};

export async function closeLut<
  TReturn,
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountRecipient extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'> &
    CustomGeneratedInstruction<
      CloseLutInstruction<
        TProgram,
        TAccountAddress,
        TAccountAuthority,
        TAccountRecipient
      >,
      TReturn
    >,
  input: CloseLutInput<TAccountAddress, TAccountAuthority, TAccountRecipient>
): Promise<TReturn>;
export async function closeLut<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountRecipient extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: CloseLutInput<TAccountAddress, TAccountAuthority, TAccountRecipient>
): Promise<
  CloseLutInstruction<
    TProgram,
    TAccountAddress,
    TAccountAuthority,
    TAccountRecipient
  > &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function closeLut<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountRecipient extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: CloseLutInput<TAccountAddress, TAccountAuthority, TAccountRecipient>
): Promise<
  CloseLutInstruction<
    TProgram,
    TAccountAddress,
    TAccountAuthority,
    TAccountRecipient
  > &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function closeLut<
  TReturn,
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountRecipient extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | (Pick<Context, 'getProgramAddress'> &
        CustomGeneratedInstruction<IInstruction, TReturn>)
    | CloseLutInput<TAccountAddress, TAccountAuthority, TAccountRecipient>,
  rawInput?: CloseLutInput<
    TAccountAddress,
    TAccountAuthority,
    TAccountRecipient
  >
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
  ) as CloseLutInput<TAccountAddress, TAccountAuthority, TAccountRecipient>;

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
    typeof closeLutInstruction<
      TProgram,
      TAccountAddress,
      TAccountAuthority,
      TAccountRecipient
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    address: { value: input.address ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    recipient: { value: input.recipient ?? null, isWritable: true },
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
    ...closeLutInstruction(
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
