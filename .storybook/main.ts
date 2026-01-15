import type { StorybookConfig } from "@storybook/react-vite";
import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

// Copy public directory after build to avoid race condition with staticDirs.
// Storybook's staticDirs runs fs.cp() concurrently with Vite's build output,
// causing EEXIST errors when both try to mkdir the same directory.
// See: https://github.com/for-keycloak/spinel-theme/actions/runs/20994209292
function copyPublicPlugin(): Plugin {
  return {
    name: "copy-public",
    apply: "build",
    closeBundle() {
      const publicDir = resolve(__dirname, "../public");
      const outDir = resolve(__dirname, "../storybook-static");
      if (existsSync(publicDir) && existsSync(outDir)) {
        cpSync(publicDir, outDir, { recursive: true });
      }
    }
  };
}

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
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins || []), copyPublicPlugin()];
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
