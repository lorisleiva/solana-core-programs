/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  mapEncoder,
} from '@solana/codecs-core';
import {
  getArrayDecoder,
  getArrayEncoder,
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
  ReadonlyAccount,
  ReadonlySignerAccount,
  WritableAccount,
  WritableSignerAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import { resolveExtendLookupTableBytes } from '../../hooked';
import {
  Context,
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
  getProgramAddress,
} from '../shared';

export type ExtendLookupTableInstruction<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountAddress extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
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
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer>
        : TAccountPayer,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts
    ]
  >;

export type ExtendLookupTableInstructionWithSigners<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountAddress extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
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
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts
    ]
  >;

export type ExtendLookupTableInstructionData = {
  discriminator: number;
  addresses: Array<Address>;
};

export type ExtendLookupTableInstructionDataArgs = {
  addresses: Array<Address>;
};

export function getExtendLookupTableInstructionDataEncoder() {
  return mapEncoder(
    getStructEncoder<{ discriminator: number; addresses: Array<Address> }>([
      ['discriminator', getU32Encoder()],
      [
        'addresses',
        getArrayEncoder(getAddressEncoder(), { size: getU64Encoder() }),
      ],
    ]),
    (value) => ({ ...value, discriminator: 2 })
  ) satisfies Encoder<ExtendLookupTableInstructionDataArgs>;
}

export function getExtendLookupTableInstructionDataDecoder() {
  return getStructDecoder<ExtendLookupTableInstructionData>([
    ['discriminator', getU32Decoder()],
    [
      'addresses',
      getArrayDecoder(getAddressDecoder(), { size: getU64Decoder() }),
    ],
  ]) satisfies Decoder<ExtendLookupTableInstructionData>;
}

export function getExtendLookupTableInstructionDataCodec(): Codec<
  ExtendLookupTableInstructionDataArgs,
  ExtendLookupTableInstructionData
> {
  return combineCodec(
    getExtendLookupTableInstructionDataEncoder(),
    getExtendLookupTableInstructionDataDecoder()
  );
}

export type ExtendLookupTableInput<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string
> = {
  address: Address<TAccountAddress>;
  authority?: Address<TAccountAuthority>;
  payer?: Address<TAccountPayer>;
  systemProgram?: Address<TAccountSystemProgram>;
  addresses: ExtendLookupTableInstructionDataArgs['addresses'];
};

export type ExtendLookupTableInputWithSigners<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string
> = {
  address: Address<TAccountAddress>;
  authority?: TransactionSigner<TAccountAuthority>;
  payer?: TransactionSigner<TAccountPayer>;
  systemProgram?: Address<TAccountSystemProgram>;
  addresses: ExtendLookupTableInstructionDataArgs['addresses'];
};

export function getExtendLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress' | 'getProgramDerivedAddress'>,
  input: ExtendLookupTableInputWithSigners<
    TAccountAddress,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >
): ExtendLookupTableInstructionWithSigners<
  TProgram,
  TAccountAddress,
  TAccountAuthority,
  TAccountPayer,
  TAccountSystemProgram
>;
export function getExtendLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  context: Pick<Context, 'getProgramAddress' | 'getProgramDerivedAddress'>,
  input: ExtendLookupTableInput<
    TAccountAddress,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >
): ExtendLookupTableInstruction<
  TProgram,
  TAccountAddress,
  TAccountAuthority,
  TAccountPayer,
  TAccountSystemProgram
>;
export function getExtendLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: ExtendLookupTableInputWithSigners<
    TAccountAddress,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >
): ExtendLookupTableInstructionWithSigners<
  TProgram,
  TAccountAddress,
  TAccountAuthority,
  TAccountPayer,
  TAccountSystemProgram
>;
export function getExtendLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  input: ExtendLookupTableInput<
    TAccountAddress,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >
): ExtendLookupTableInstruction<
  TProgram,
  TAccountAddress,
  TAccountAuthority,
  TAccountPayer,
  TAccountSystemProgram
>;
export function getExtendLookupTableInstruction<
  TAccountAddress extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111'
>(
  rawContext:
    | Pick<Context, 'getProgramAddress' | 'getProgramDerivedAddress'>
    | ExtendLookupTableInput<
        TAccountAddress,
        TAccountAuthority,
        TAccountPayer,
        TAccountSystemProgram
      >,
  rawInput?: ExtendLookupTableInput<
    TAccountAddress,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >
): IInstruction {
  // Resolve context and input arguments.
  const context = (rawInput === undefined ? {} : rawContext) as Pick<
    Context,
    'getProgramAddress' | 'getProgramDerivedAddress'
  >;
  const input = (
    rawInput === undefined ? rawContext : rawInput
  ) as ExtendLookupTableInput<
    TAccountAddress,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram
  >;

  // Program address.
  const defaultProgramAddress =
    'AddressLookupTab1e1111111111111111111111111' as Address<'AddressLookupTab1e1111111111111111111111111'>;
  const programAddress = (
    context.getProgramAddress
      ? context.getProgramAddress({
          name: 'splAddressLookupTable',
          address: defaultProgramAddress,
        })
      : defaultProgramAddress
  ) as Address<TProgram>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getExtendLookupTableInstructionRaw<
      TProgram,
      TAccountAddress,
      TAccountAuthority,
      TAccountPayer,
      TAccountSystemProgram
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    address: { value: input.address ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };

  // Original args.
  const args = { ...input };

  // Resolver scope.
  const resolverScope = { context, programAddress, accounts, args };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value = getProgramAddress(
      context,
      'splSystem',
      '11111111111111111111111111111111'
    );
    accounts.systemProgram.isWritable = false;
  }
  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = [];

  // Bytes created on chain.
  const bytesCreatedOnChain = resolveExtendLookupTableBytes(resolverScope);

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  return Object.freeze({
    ...getExtendLookupTableInstructionRaw(
      accountMetas as Record<keyof AccountMetas, IAccountMeta>,
      args as ExtendLookupTableInstructionDataArgs,
      programAddress,
      remainingAccounts
    ),
    bytesCreatedOnChain,
  });
}

export function getExtendLookupTableInstructionRaw<
  TProgram extends string = 'AddressLookupTab1e1111111111111111111111111',
  TAccountAddress extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    address: TAccountAddress extends string
      ? Address<TAccountAddress>
      : TAccountAddress;
    authority: TAccountAuthority extends string
      ? Address<TAccountAuthority>
      : TAccountAuthority;
    payer: TAccountPayer extends string
      ? Address<TAccountPayer>
      : TAccountPayer;
    systemProgram?: TAccountSystemProgram extends string
      ? Address<TAccountSystemProgram>
      : TAccountSystemProgram;
  },
  args: ExtendLookupTableInstructionDataArgs,
  programAddress: Address<TProgram> = 'AddressLookupTab1e1111111111111111111111111' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.address, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.authority, AccountRole.READONLY_SIGNER),
      accountMetaWithDefault(accounts.payer, AccountRole.WRITABLE_SIGNER),
      accountMetaWithDefault(
        accounts.systemProgram ?? {
          address:
            '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>,
          role: AccountRole.READONLY,
        },
        AccountRole.READONLY
      ),
      ...(remainingAccounts ?? []),
    ],
    data: getExtendLookupTableInstructionDataEncoder().encode(args),
    programAddress,
  } as ExtendLookupTableInstruction<
    TProgram,
    TAccountAddress,
    TAccountAuthority,
    TAccountPayer,
    TAccountSystemProgram,
    TRemainingAccounts
  >;
}
