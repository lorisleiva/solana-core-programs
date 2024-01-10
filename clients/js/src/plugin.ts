import {
  getSplAddressLookupTableProgram,
  getSplComputeBudgetProgram,
  getSplMemoProgram,
  getSplSystemProgram,
} from './generated';

export const splCore = () => ({
  install() {
    // TODO: Register these programs somewhere.
    getSplAddressLookupTableProgram();
    getSplComputeBudgetProgram();
    getSplMemoProgram();
    getSplSystemProgram();
  },
});
