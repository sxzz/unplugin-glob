import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src'],
  format: ['cjs', 'esm'],
  target: 'node14',
  splitting: true,
  clean: true,
  dts: true,
  // Fix for https://github.com/evanw/esbuild/pull/2067
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
})
