import { build } from 'esbuild';

build({
  bundle: true,
  color: true,
  entryPoints: ['src/index.ts'],
  format: 'esm',
  outfile: 'dist/index.js',
  platform: 'node',
  minify: true,
});