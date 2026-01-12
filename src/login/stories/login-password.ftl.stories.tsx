import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Password",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "login-password.ftl" })
  }
};

export const WithError: Story = {
  name: "With Error",
  args: {
    kcContext: getKcContextMock({
      pageId: "login-password.ftl",
      overrides: {
        messagesPerField: {
          existsError: (field: string) => field === "password",
          get: () => "Invalid password.",
          getFirstError: () => "Invalid password."
        }
      }
    })
  }
};
