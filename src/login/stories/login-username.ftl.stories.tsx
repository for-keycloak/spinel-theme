import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Username",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "login-username.ftl" })
  }
};

export const WithError: Story = {
  name: "With Error",
  args: {
    kcContext: getKcContextMock({
      pageId: "login-username.ftl",
      overrides: {
        messagesPerField: {
          existsError: (field: string) => field === "username",
          get: () => "User not found.",
          getFirstError: () => "User not found."
        }
      }
    })
  }
};

export const WithoutRegistration: Story = {
  name: "Without Registration",
  args: {
    kcContext: getKcContextMock({
      pageId: "login-username.ftl",
      overrides: {
        realm: { registrationAllowed: false }
      }
    })
  }
};
