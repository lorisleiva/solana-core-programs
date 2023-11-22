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
export type RequestUnitsInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<TRemainingAccounts>;

export type RequestUnitsInstructionData = {
  discriminator: number;
  /** Units to request for transaction-wide compute. */
  units: number;
  /** Prioritization fee lamports. */
  additionalFee: number;
};

export type RequestUnitsInstructionDataArgs = {
  /** Units to request for transaction-wide compute. */
  units: number;
  /** Prioritization fee lamports. */
  additionalFee: number;
};

export function getRequestUnitsInstructionDataEncoder(): Encoder<RequestUnitsInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder<{
      discriminator: number;
      /** Units to request for transaction-wide compute. */
      units: number;
      /** Prioritization fee lamports. */
      additionalFee: number;
    }>(
      [
        ['discriminator', getU8Encoder()],
        ['units', getU32Encoder()],
        ['additionalFee', getU32Encoder()],
      ],
      { description: 'RequestUnitsInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 0 })
  ) as Encoder<RequestUnitsInstructionDataArgs>;
}

export function getRequestUnitsInstructionDataDecoder(): Decoder<RequestUnitsInstructionData> {
  return getStructDecoder<RequestUnitsInstructionData>(
    [
      ['discriminator', getU8Decoder()],
      ['units', getU32Decoder()],
      ['additionalFee', getU32Decoder()],
    ],
    { description: 'RequestUnitsInstructionData' }
  ) as Decoder<RequestUnitsInstructionData>;
}

export function getRequestUnitsInstructionDataCodec(): Codec<
  RequestUnitsInstructionDataArgs,
  RequestUnitsInstructionData
> {
  return combineCodec(
    getRequestUnitsInstructionDataEncoder(),
    getRequestUnitsInstructionDataDecoder()
  );
}

export function requestUnitsInstruction<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  args: RequestUnitsInstructionDataArgs,
  programAddress: Address<TProgram> = 'ComputeBudget111111111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: remainingAccounts ?? [],
    data: getRequestUnitsInstructionDataEncoder().encode(args),
    programAddress,
  } as RequestUnitsInstruction<TProgram, TRemainingAccounts>;
}

// Input.
export type RequestUnitsInput = {
  units: RequestUnitsInstructionDataArgs['units'];
  additionalFee: RequestUnitsInstructionDataArgs['additionalFee'];
};

export async function requestUnits<
  TReturn,
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'> &
    CustomGeneratedInstruction<RequestUnitsInstruction<TProgram>, TReturn>,
  input: RequestUnitsInput
): Promise<TReturn>;
export async function requestUnits<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: RequestUnitsInput
): Promise<
  RequestUnitsInstruction<TProgram> &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function requestUnits<
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  input: RequestUnitsInput
): Promise<
  RequestUnitsInstruction<TProgram> &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function requestUnits<
  TReturn,
  TProgram extends string = 'ComputeBudget111111111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | (Pick<Context, 'getProgramAddress'> &
        CustomGeneratedInstruction<IInstruction, TReturn>)
    | RequestUnitsInput,
  rawInput?: RequestUnitsInput
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
  ) as RequestUnitsInput;

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
    ...requestUnitsInstruction(
      args as RequestUnitsInstructionDataArgs,
      programAddress,
      remainingAccounts
    ),
    bytesCreatedOnChain,
  };

  return 'getGeneratedInstruction' in context && context.getGeneratedInstruction
    ? context.getGeneratedInstruction(instruction)
    : instruction;
}
