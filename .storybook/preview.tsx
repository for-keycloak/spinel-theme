import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS
    },
    options: {
      storySort: {
        order: [
          "Email Templates",
          "Login",
          "Register",
          "Logout",
          "Reset Password",
          "Update Password",
          "OTP Authentication",
          "Configure TOTP",
          "Verify Email",
          "Username",
          "Password",
          "Error",
          "Info",
          "Terms",
          "*" // Everything else alphabetically
        ]
      }
    }
  }
};

export default preview;
