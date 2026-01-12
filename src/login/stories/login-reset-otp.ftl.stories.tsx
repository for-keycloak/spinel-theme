import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Reset OTP",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "login-reset-otp.ftl" })
  }
};

export const WithMultipleCredentials: Story = {
  name: "With Multiple Credentials",
  args: {
    kcContext: getKcContextMock({
      pageId: "login-reset-otp.ftl",
      overrides: {
        configuredOtpCredentials: {
          userOtpCredentials: [
            { id: "1", userLabel: "Mobile Authenticator" },
            { id: "2", userLabel: "Backup Authenticator" }
          ],
          selectedCredentialId: "1"
        }
      }
    })
  }
};
