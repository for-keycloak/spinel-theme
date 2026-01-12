import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Info",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "info.ftl" })
  }
};

export const WithLinkBack: Story = {
  name: "With Link Back",
  args: {
    kcContext: getKcContextMock({
      pageId: "info.ftl",
      overrides: {
        actionUri: "#",
        client: { baseUrl: "https://example.com" }
      }
    })
  }
};
