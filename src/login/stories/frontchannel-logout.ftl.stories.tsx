import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Frontchannel Logout",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "frontchannel-logout.ftl" })
  }
};

export const WithoutRedirectUrl: Story = {
  name: "Without Redirect URL",
  args: {
    kcContext: getKcContextMock({
      pageId: "frontchannel-logout.ftl",
      overrides: {
        logout: { logoutRedirectUri: undefined }
      }
    })
  }
};
