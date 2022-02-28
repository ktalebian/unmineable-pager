// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, import/no-unresolved
const { build } = require('esbuild');

const config = {
  bundle: true,
  color: true,
  entryPoints: ['src/index.ts'],
  format: 'esm',
  outfile: 'dist/index.esm.js',
  platform: 'node',
  minify: true,
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
build(config);
