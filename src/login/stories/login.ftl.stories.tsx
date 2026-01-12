import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Login",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "login.ftl" })
  }
};

export const WithInvalidCredential: Story = {
  name: "With Invalid Credential",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        login: { username: "johndoe" },
        messagesPerField: {
          existsError: (field: string) => field === "username" || field === "password",
          get: () => "Invalid username or password.",
          getFirstError: () => "Invalid username or password."
        }
      }
    })
  }
};

export const WithoutRegistration: Story = {
  name: "Without Registration",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        realm: { registrationAllowed: false }
      }
    })
  }
};

export const WithoutRememberMe: Story = {
  name: "Without Remember Me",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        realm: { rememberMe: false }
      }
    })
  }
};

export const WithoutPasswordReset: Story = {
  name: "Without Password Reset",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        realm: { resetPasswordAllowed: false }
      }
    })
  }
};

export const WithEmailAsUsername: Story = {
  name: "With Email As Username",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        realm: { loginWithEmailAllowed: true, registrationEmailAsUsername: true }
      }
    })
  }
};

export const WithPresetUsername: Story = {
  name: "With Preset Username",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        login: { username: "max.mustermann@mail.com" }
      }
    })
  }
};

export const WithErrorMessage: Story = {
  name: "With Error Message",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        message: {
          type: "error",
          summary: "The time allotted for the connection has elapsed. The connection process will start from the beginning."
        }
      }
    })
  }
};

export const WithWarningMessage: Story = {
  name: "With Warning Message",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        message: {
          type: "warning",
          summary: "Your password will expire in 5 days. Please change it soon."
        }
      }
    })
  }
};

export const WithInfoMessage: Story = {
  name: "With Info Message",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        message: {
          type: "info",
          summary: "You need to change your password to activate your account."
        }
      }
    })
  }
};

export const WithSuccessMessage: Story = {
  name: "With Success Message",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        message: {
          type: "success",
          summary: "Your email has been verified successfully."
        }
      }
    })
  }
};

export const WithSocialProviders: Story = {
  name: "With Social Providers",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        realm: { password: true },
        social: {
          displayInfo: true,
          providers: [
            { alias: "google", displayName: "Google", loginUrl: "#", providerId: "google" },
            { alias: "github", displayName: "GitHub", loginUrl: "#", providerId: "github" },
            { alias: "microsoft", displayName: "Microsoft", loginUrl: "#", providerId: "microsoft" }
          ]
        }
      }
    })
  }
};

export const WithOneSocialProvider: Story = {
  name: "With One Social Provider",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        realm: { password: true },
        social: {
          displayInfo: true,
          providers: [
            { alias: "google", displayName: "Google", loginUrl: "#", providerId: "google" }
          ]
        }
      }
    })
  }
};

export const WithManySocialProviders: Story = {
  name: "With Many Social Providers",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        realm: { password: true },
        social: {
          displayInfo: true,
          providers: [
            { alias: "google", displayName: "Google", loginUrl: "#", providerId: "google" },
            { alias: "github", displayName: "GitHub", loginUrl: "#", providerId: "github" },
            { alias: "microsoft", displayName: "Microsoft", loginUrl: "#", providerId: "microsoft" },
            { alias: "facebook", displayName: "Facebook", loginUrl: "#", providerId: "facebook" },
            { alias: "twitter", displayName: "Twitter", loginUrl: "#", providerId: "twitter" },
            { alias: "linkedin", displayName: "LinkedIn", loginUrl: "#", providerId: "linkedin" },
            { alias: "apple", displayName: "Apple", loginUrl: "#", providerId: "apple" }
          ]
        }
      }
    })
  }
};

export const SocialOnly: Story = {
  name: "Social Only (No Password)",
  args: {
    kcContext: getKcContextMock({
      pageId: "login.ftl",
      overrides: {
        realm: { password: false },
        social: {
          displayInfo: true,
          providers: [
            { alias: "google", displayName: "Google", loginUrl: "#", providerId: "google" },
            { alias: "github", displayName: "GitHub", loginUrl: "#", providerId: "github" }
          ]
        }
      }
    })
  }
};
