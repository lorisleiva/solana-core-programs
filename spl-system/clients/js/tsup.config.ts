import { env } from 'node:process';
import path from 'path';
import { defineConfig, Options } from 'tsup';

const SHARED_OPTIONS: Options = {
  define: { __VERSION__: `"${env.npm_package_version}"` },
  entry: ['./src/index.ts'],
  inject: [path.resolve(__dirname, 'env-shim.ts')],
  sourcemap: true,
  treeshake: true,
};

export default defineConfig(() => [
  { ...SHARED_OPTIONS, format: 'cjs' },
  { ...SHARED_OPTIONS, format: 'esm' },
]);
