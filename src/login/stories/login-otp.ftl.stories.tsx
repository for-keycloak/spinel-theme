import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "OTP Authentication",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "login-otp.ftl" })
  }
};

export const WithMultipleCredentials: Story = {
  name: "With Multiple Credentials",
  args: {
    kcContext: getKcContextMock({
      pageId: "login-otp.ftl",
      overrides: {
        otpLogin: {
          userOtpCredentials: [
            { id: "1", userLabel: "Mobile Authenticator" },
            { id: "2", userLabel: "Backup Authenticator" },
            { id: "3", userLabel: "Work Phone" }
          ],
          selectedCredentialId: "1"
        }
      }
    })
  }
};

export const WithError: Story = {
  name: "With Error",
  args: {
    kcContext: getKcContextMock({
      pageId: "login-otp.ftl",
      overrides: {
        messagesPerField: {
          existsError: (field: string) => field === "totp",
          get: () => "Invalid code. Please try again.",
          getFirstError: () => "Invalid code. Please try again."
        }
      }
    })
  }
};
