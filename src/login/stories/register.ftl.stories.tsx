import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Register",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "register.ftl" })
  }
};

export const WithEmailAsUsername: Story = {
  name: "With Email As Username",
  args: {
    kcContext: getKcContextMock({
      pageId: "register.ftl",
      overrides: {
        realm: { registrationEmailAsUsername: true }
      }
    })
  }
};
