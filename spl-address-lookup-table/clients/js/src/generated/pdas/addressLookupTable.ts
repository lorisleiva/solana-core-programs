/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  ProgramDerivedAddress,
  getAddressEncoder,
  getProgramDerivedAddress,
} from '@solana/addresses';
import { getU64Encoder } from '@solana/codecs-numbers';

export type AddressLookupTableSeeds = {
  /** The address of the LUT's authority */
  authority: Address;
  /** The recent slot associated with the LUT */
  recentSlot: number | bigint;
};

export async function findAddressLookupTablePda(
  seeds: AddressLookupTableSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'AddressLookupTab1e1111111111111111111111111' as Address<'AddressLookupTab1e1111111111111111111111111'>,
  } = config;
  return getProgramDerivedAddress({
    programAddress,
    seeds: [
      getAddressEncoder().encode(seeds.authority),
      getU64Encoder().encode(seeds.recentSlot),
    ],
  });
}