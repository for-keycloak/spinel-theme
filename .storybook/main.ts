import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "storybook-dark-mode"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    config.server = config.server || {};
    config.server.allowedHosts = ["storybook", "localhost"];

    // Exclude jsx-email and keycloakify-emails from Vite optimization
    // These are Node.js-only packages used for build-time email generation
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      "jsx-email",
      "keycloakify-emails"
    ];

    return config;
  }
};

export default config;
