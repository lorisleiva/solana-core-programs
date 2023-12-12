import { Address } from '@solana/addresses';

export const resolveExtendLookupTableBytes = (
  context: any,
  accounts: any,
  args: { addresses: Array<Address> },
  programId: any
): number => 32 * args.addresses.length;
