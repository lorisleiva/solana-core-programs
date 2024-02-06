#!/usr/bin/env node
const { buildSync } = require('esbuild');

const shared = {
  entryPoints: ['src/**'],
  outdir: 'dist/src',
  sourcemap: 'external',
  external: [],
};

buildSync({ ...shared, format: 'cjs' });
buildSync({ ...shared, format: 'esm', outExtension: { '.js': '.mjs' } });
buildSync({
  ...shared,
  entryPoints: ['test/**'],
  outdir: 'dist/test',
  format: 'cjs',
});
