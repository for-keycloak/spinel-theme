import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Delete Credential",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "delete-credential.ftl" })
  }
};
