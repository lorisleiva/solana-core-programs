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
  getU64Decoder,
  getU64Encoder,
} from '@solana/codecs-numbers';
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  WritableSignerAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import {
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';

export type AllocateInstruction<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountNewAccount extends string
        ? WritableSignerAccount<TAccountNewAccount>
        : TAccountNewAccount,
      ...TRemainingAccounts
    ]
  >;

export type AllocateInstructionWithSigners<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountNewAccount extends string
        ? WritableSignerAccount<TAccountNewAccount> &
            IAccountSignerMeta<TAccountNewAccount>
        : TAccountNewAccount,
      ...TRemainingAccounts
    ]
  >;

export type AllocateInstructionData = { discriminator: number; space: bigint };

export type AllocateInstructionDataArgs = { space: number | bigint };

export function getAllocateInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{ discriminator: number; space: number | bigint }>([
      ['discriminator', getU32Encoder()],
      ['space', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 8 })
  ) satisfies Encoder<AllocateInstructionDataArgs>;
}

export function getAllocateInstructionDataDecoder() {
  return getStructDecoder<AllocateInstructionData>([
    ['discriminator', getU32Decoder()],
    ['space', getU64Decoder()],
  ]) satisfies Decoder<AllocateInstructionData>;
}

export function getAllocateInstructionDataCodec(): Codec<
  AllocateInstructionDataArgs,
  AllocateInstructionData
> {
  return combineCodec(
    getAllocateInstructionDataEncoder(),
    getAllocateInstructionDataDecoder()
  );
}

export type AllocateInput<TAccountNewAccount extends string> = {
  newAccount: Address<TAccountNewAccount>;
  space: AllocateInstructionDataArgs['space'];
};

export type AllocateInputWithSigners<TAccountNewAccount extends string> = {
  newAccount: TransactionSigner<TAccountNewAccount>;
  space: AllocateInstructionDataArgs['space'];
};

export function getAllocateInstruction<
  TAccountNewAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  input: AllocateInputWithSigners<TAccountNewAccount>
): AllocateInstructionWithSigners<TProgram, TAccountNewAccount>;
export function getAllocateInstruction<
  TAccountNewAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(
  input: AllocateInput<TAccountNewAccount>
): AllocateInstruction<TProgram, TAccountNewAccount>;
export function getAllocateInstruction<
  TAccountNewAccount extends string,
  TProgram extends string = '11111111111111111111111111111111'
>(input: AllocateInput<TAccountNewAccount>): IInstruction {
  // Program address.
  const programAddress =
    '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getAllocateInstructionRaw<TProgram, TAccountNewAccount>
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    newAccount: { value: input.newAccount ?? null, isWritable: true },
  };

  // Original args.
  const args = { ...input };

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getAllocateInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    args as AllocateInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export function getAllocateInstructionRaw<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountNewAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    newAccount: TAccountNewAccount extends string
      ? Address<TAccountNewAccount>
      : TAccountNewAccount;
  },
  args: AllocateInstructionDataArgs,
  programAddress: Address<TProgram> = '11111111111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.newAccount, AccountRole.WRITABLE_SIGNER),
      ...(remainingAccounts ?? []),
    ],
    data: getAllocateInstructionDataEncoder().encode(args),
    programAddress,
  } as AllocateInstruction<TProgram, TAccountNewAccount, TRemainingAccounts>;
}

export type ParsedAllocateInstruction<
  TProgram extends string = '11111111111111111111111111111111',
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
  programAddress: Address<TProgram>;
  accounts: {
    newAccount: TAccountMetas[0];
  };
  data: AllocateInstructionData;
};

export function parseAllocateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[]
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAllocateInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
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
      newAccount: getNextAccount(),
    },
    data: getAllocateInstructionDataDecoder().decode(instruction.data),
  };
}
