import type { Preview } from "@storybook/react-vite";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
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
      options: INITIAL_VIEWPORTS
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
