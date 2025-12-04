import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {},

  // Подключение глобальных стилей
  staticDirs: ['../public'],

  // Конфигурация сборки
  core: {
    builder: '@storybook/builder-webpack5',
  },

  // Дополнительные настройки webpack для стилей
  webpackFinal: async (config) => {
    // Добавляем глобальные стили
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    return config;
  },

  // Прямое указание глобальных стилей
  previewHead: (head) => `
    ${head}
    <style>
      body {
        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        margin: 0;
        padding: 0;
      }
    </style>
  `,
};

export default config;
