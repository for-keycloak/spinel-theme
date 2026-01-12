import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";
import type { KcContext } from "../KcContext";

// Create a base mock for the email OTP page by extending the login mock
const createEmailOtpMock = (overrides: Record<string, unknown> = {}): KcContext => {
  const baseMock = getKcContextMock({ pageId: "login.ftl" });
  return {
    ...baseMock,
    pageId: "login-email-otp.ftl",
    ...overrides
  } as KcContext;
};

export default {
  title: "Login Email OTP",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: createEmailOtpMock()
  }
};

export const WithError: Story = {
  name: "With Invalid Code",
  args: {
    kcContext: createEmailOtpMock({
      messagesPerField: {
        existsError: (field: string) => field === "email-otp",
        exists: () => true,
        get: () => "Invalid verification code.",
        getFirstError: () => "Invalid verification code.",
        printIfExists: () => undefined
      }
    })
  }
};
