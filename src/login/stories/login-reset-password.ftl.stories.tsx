import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Reset Password",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "login-reset-password.ftl" })
  }
};

export const WithError: Story = {
  name: "With Error",
  args: {
    kcContext: getKcContextMock({
      pageId: "login-reset-password.ftl",
      overrides: {
        message: {
          type: "error",
          summary: "User not found."
        }
      }
    })
  }
};
