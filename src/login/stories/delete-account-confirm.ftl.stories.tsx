import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Delete Account",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "delete-account-confirm.ftl" })
  }
};

export const WithAIAFlow: Story = {
  name: "With AIA Flow",
  args: {
    kcContext: getKcContextMock({
      pageId: "delete-account-confirm.ftl",
      overrides: {
        triggered_from_aia: true
      }
    })
  }
};
