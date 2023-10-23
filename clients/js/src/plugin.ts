import {
  createSplAddressLookupTableProgram,
  createSplComputeBudgetProgram,
  createSplMemoProgram,
  createSplSystemProgram,
} from './generated';

export const splCore = () => ({
  install() {
    // TODO: Register these programs somewhere.
    createSplAddressLookupTableProgram();
    createSplComputeBudgetProgram();
    createSplMemoProgram();
    createSplSystemProgram();
  },
});
