/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Address } from '@solana/addresses';
import { Codec, Decoder, Encoder, combineCodec } from '@solana/codecs-core';
import {
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import { getStringDecoder, getStringEncoder } from '@solana/codecs-strings';
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
export type AddMemoInstruction<
  TProgram extends string = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<TRemainingAccounts>;

export type AddMemoInstructionData = { memo: string };

export type AddMemoInstructionDataArgs = AddMemoInstructionData;

export function getAddMemoInstructionDataEncoder(): Encoder<AddMemoInstructionDataArgs> {
  return getStructEncoder<AddMemoInstructionDataArgs>(
    [['memo', getStringEncoder()]],
    { description: 'AddMemoInstructionData' }
  ) as Encoder<AddMemoInstructionDataArgs>;
}

export function getAddMemoInstructionDataDecoder(): Decoder<AddMemoInstructionData> {
  return getStructDecoder<AddMemoInstructionData>(
    [['memo', getStringDecoder()]],
    { description: 'AddMemoInstructionData' }
  ) as Decoder<AddMemoInstructionData>;
}

export function getAddMemoInstructionDataCodec(): Codec<
  AddMemoInstructionDataArgs,
  AddMemoInstructionData
> {
  return combineCodec(
    getAddMemoInstructionDataEncoder(),
    getAddMemoInstructionDataDecoder()
  );
}

export function addMemoInstruction<
  TProgram extends string = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  args: AddMemoInstructionDataArgs,
  programAddress: Address<TProgram> = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: remainingAccounts ?? [],
    data: getAddMemoInstructionDataEncoder().encode(args),
    programAddress,
  } as AddMemoInstruction<TProgram, TRemainingAccounts>;
}

// Input.
export type AddMemoInput = {
  memo: AddMemoInstructionDataArgs['memo'];
};

export async function addMemo<
  TReturn,
  TProgram extends string = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'
>(
  context: Pick<Context, 'getProgramAddress'> &
    CustomGeneratedInstruction<AddMemoInstruction<TProgram>, TReturn>,
  input: AddMemoInput
): Promise<TReturn>;
export async function addMemo<
  TProgram extends string = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'
>(
  context: Pick<Context, 'getProgramAddress'>,
  input: AddMemoInput
): Promise<
  AddMemoInstruction<TProgram> &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function addMemo<
  TProgram extends string = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'
>(
  input: AddMemoInput
): Promise<
  AddMemoInstruction<TProgram> &
    IInstructionWithSigners &
    IInstructionWithBytesCreatedOnChain
>;
export async function addMemo<
  TReturn,
  TProgram extends string = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress'>
    | (Pick<Context, 'getProgramAddress'> &
        CustomGeneratedInstruction<IInstruction, TReturn>)
    | AddMemoInput,
  rawInput?: AddMemoInput
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
  ) as AddMemoInput;

  // Program address.
  const defaultProgramAddress =
    'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo' as Address<'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'>;
  const programAddress = (
    context.getProgramAddress
      ? await context.getProgramAddress({
          name: 'splMemo',
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
    ...addMemoInstruction(
      args as AddMemoInstructionDataArgs,
      programAddress,
      remainingAccounts
    ),
    bytesCreatedOnChain,
  };

  return 'getGeneratedInstruction' in context && context.getGeneratedInstruction
    ? context.getGeneratedInstruction(instruction)
    : instruction;
}
