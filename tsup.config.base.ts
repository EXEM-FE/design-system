import { defineConfig, type Options } from 'tsup';

/**
 * Base tsup configuration for all packages
 * Individual packages can extend and override this configuration
 */
export const createTsupConfig = (options: Options = {}) => {
  return defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    target: 'es2020',
    ...options,
  });
};

export default createTsupConfig();
