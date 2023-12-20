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

export type SetComputeUnitLimitInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<TRemainingAccounts>;

export type SetComputeUnitLimitInstructionWithSigners<
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

export function getSetComputeUnitLimitInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{
      discriminator: number;
      /** Transaction-wide compute unit limit. */
      units: number;
    }>([
      ['discriminator', getU8Encoder()],
      ['units', getU32Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 2 })
  ) satisfies Encoder<SetComputeUnitLimitInstructionDataArgs>;
}

export function getSetComputeUnitLimitInstructionDataDecoder() {
  return getStructDecoder<SetComputeUnitLimitInstructionData>([
    ['discriminator', getU8Decoder()],
    ['units', getU32Decoder()],
  ]) satisfies Decoder<SetComputeUnitLimitInstructionData>;
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

export type SetComputeUnitLimitInput = {
  units: SetComputeUnitLimitInstructionDataArgs['units'];
};

export type SetComputeUnitLimitInputWithSigners = {
  units: SetComputeUnitLimitInstructionDataArgs['units'];
};

export function getSetComputeUnitLimitInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  input: SetComputeUnitLimitInputWithSigners
): SetComputeUnitLimitInstructionWithSigners<TProgram>;
export function getSetComputeUnitLimitInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(input: SetComputeUnitLimitInput): SetComputeUnitLimitInstruction<TProgram>;
export function getSetComputeUnitLimitInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(input: SetComputeUnitLimitInput): IInstruction {
  // Program address.
  const programAddress =
    'ComputeBudget111111111111111111111111111111' as Address<'ComputeBudget111111111111111111111111111111'>;

  // Original args.
  const args = { ...input };

  const instruction = getSetComputeUnitLimitInstructionRaw(
    args as SetComputeUnitLimitInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export function getSetComputeUnitLimitInstructionRaw<
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

export type ParsedSetComputeUnitLimitInstruction = {
  data: SetComputeUnitLimitInstructionData;
};

export function parseSetComputeUnitLimitInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  instruction: IInstruction<TProgram> & IInstructionWithData<Uint8Array>
): ParsedSetComputeUnitLimitInstruction {
  return {
    data: getSetComputeUnitLimitInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
