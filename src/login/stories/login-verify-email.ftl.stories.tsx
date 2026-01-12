import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Verify Email",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "login-verify-email.ftl" })
  }
};
