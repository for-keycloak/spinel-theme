import type { Meta, StoryObj } from "@storybook/react-vite";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Error",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({ pageId: "error.ftl" })
  }
};

export const WithAnotherMessage: Story = {
  name: "With Another Message",
  args: {
    kcContext: getKcContextMock({
      pageId: "error.ftl",
      overrides: {
        message: {
          type: "error",
          summary: "A different error has occurred. Please contact your administrator."
        }
      }
    })
  }
};

export const WithHtmlMessage: Story = {
  name: "With HTML Message",
  args: {
    kcContext: getKcContextMock({
      pageId: "error.ftl",
      overrides: {
        message: {
          type: "error",
          summary: "An <strong>unexpected error</strong> occurred. Please <a href='#'>contact support</a> for assistance."
        }
      }
    })
  }
};

export const WithSkipLink: Story = {
  name: "With Skip Link",
  args: {
    kcContext: getKcContextMock({
      pageId: "error.ftl",
      overrides: {
        skipLink: true,
        client: { baseUrl: "https://example.com" }
      }
    })
  }
};

export const WithClientBaseUrl: Story = {
  name: "With Client Base URL",
  args: {
    kcContext: getKcContextMock({
      pageId: "error.ftl",
      overrides: {
        client: { baseUrl: "https://example.com" }
      }
    })
  }
};

// Clients without a Base URL (e.g. the traefik forward-auth client) send an empty string
export const WithEmptyClientBaseUrl: Story = {
  name: "With Empty Client Base URL",
  args: {
    kcContext: getKcContextMock({
      pageId: "error.ftl",
      overrides: {
        message: {
          type: "error",
          summary: "Invalid username or password."
        },
        client: { baseUrl: "" }
      }
    })
  }
};
