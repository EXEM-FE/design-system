import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // GitHub Pages 서브경로 지원
    if (process.env.BASE_PATH) {
      config.base = process.env.BASE_PATH;
    }
    return config;
  },
};
export default config;
