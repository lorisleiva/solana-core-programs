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
import {
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
} from '@solana/codecs-numbers';
import {
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
} from '@solana/instructions';
import { IInstructionWithSigners } from '@solana/signers';
import {
  Context,
  CustomGeneratedInstruction,
  IInstructionWithBytesCreatedOnChain,
} from '../shared';

// Output.
export type SetComputeUnitLimitInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<TRemainingAccounts>;

export type SetComputeUnitLimitInstructionData = {
  discriminator: number;
  /** Transaction-wide compute unit limit. */
  units: number;
};

export type SetComputeUnitLimitInstructionDataArgs = {
  /** Transaction-wide compute unit limit. */
  units: number;
};

export function getSetComputeUnitLimitInstructionDataEncoder(): Encoder<SetComputeUnitLimitInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder<{
      discriminator: number;
      /** Transaction-wide compute unit limit. */
      units: number;
    }>(
      [
        ['discriminator', getU8Encoder()],
        ['units', getU32Encoder()],
      ],
      { description: 'SetComputeUnitLimitInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 2 })
  ) as Encoder<SetComputeUnitLimitInstructionDataArgs>;
}

export function getSetComputeUnitLimitInstructionDataDecoder(): Decoder<SetComputeUnitLimitInstructionData> {
  return getStructDecoder<SetComputeUnitLimitInstructionData>(
    [
      ['discriminator', getU8Decoder()],
      ['units', getU32Decoder()],
    ],
    { description: 'SetComputeUnitLimitInstructionData' }
  ) as Decoder<SetComputeUnitLimitInstructionData>;
}

export function getSetComputeUnitLimitInstructionDataCodec(): Codec<
  SetComputeUnitLimitInstructionDataArgs,
  SetComputeUnitLimitInstructionData
> {
  return combineCodec(
    getSetComputeUnitLimitInstructionDataEncoder(),
    getSetComputeUnitLimitInstructionDataDecoder()
  );
}

export function setComputeUnitLimitInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  args: SetComputeUnitLimitInstructionDataArgs,
  programAddress: Address<TProgram> = 'ComputeBudget111111111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: remainingAccounts ?? [],
    data: getSetComputeUnitLimitInstructionDataEncoder().encode(args),
    programAddress,
  } as SetComputeUnitLimitInstruction<TProgram, TRemainingAccounts>;
}

// Input.
export type SetComputeUnitLimitInput = {
  units: SetComputeUnitLimitInstructionDataArgs['units'];
};

export async function setComputeUnitLimit<
  TReturn,
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'> &
    CustomGeneratedInstruction<
      SetComputeUnitLimitInstruction<TProgram>,
      TReturn
    >,
  input: SetComputeUnitLimitInput
): Promise<TReturn>;
export async function setComputeUnitLimit<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: SetComputeUnitLimitInput
): Promise<
  SetComputeUnitLimitInstruction<TProgram> &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function setComputeUnitLimit<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  input: SetComputeUnitLimitInput
): Promise<
  SetComputeUnitLimitInstruction<TProgram> &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function setComputeUnitLimit<
  TReturn,
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | (Pick<Context, 'getProgramAddress'> &
        CustomGeneratedInstruction<IInstruction, TReturn>)
    | SetComputeUnitLimitInput,
  rawInput?: SetComputeUnitLimitInput
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
  ) as SetComputeUnitLimitInput;

  // Program address.
  const defaultProgramAddress =
    'ComputeBudget111111111111111111111111111111' as Address<'ComputeBudget111111111111111111111111111111'>;
  const programAddress = (
    context.getProgramAddress
      ? await context.getProgramAddress({
          name: 'splComputeBudget',
          address: defaultProgramAddress,
        })
      : defaultProgramAddress
  ) as Address<TProgram>;

  // Original args.
  const args = { ...input };

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = [];

  // Bytes created on chain.
  const bytesCreatedOnChain = 0;

  // Instruction.
  const instruction = {
    ...setComputeUnitLimitInstruction(
      args as SetComputeUnitLimitInstructionDataArgs,
      programAddress,
      remainingAccounts
    ),
    bytesCreatedOnChain,
  };

  return 'getGeneratedInstruction' in context && context.getGeneratedInstruction
    ? context.getGeneratedInstruction(instruction)
    : instruction;
}
