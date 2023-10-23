import { UmiPlugin } from '@metaplex-foundation/umi';
import { createSplCoreProgram } from './generated';

export const splCore = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createSplCoreProgram(), false);
  },
});
