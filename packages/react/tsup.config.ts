import { createTsupConfig } from '../../tsup.config.base';

export default createTsupConfig({
  splitting: false,
  external: ['react', 'react-dom'],
});
