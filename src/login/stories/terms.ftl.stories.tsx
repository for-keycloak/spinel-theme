import type { Meta, StoryObj } from "@storybook/react";
import { KcPage, getKcContextMock } from "./storybook-utils";

export default {
  title: "Terms",
  component: KcPage
} satisfies Meta<typeof KcPage>;

type Story = StoryObj<typeof KcPage>;

export const Default: Story = {
  args: {
    kcContext: getKcContextMock({
      pageId: "terms.ftl",
      overrides: {
        "x-keycloakify": {
          messages: {
            termsText: `
              <h3>Terms of Service</h3>
              <p>Welcome to our service. By using this application, you agree to the following terms and conditions:</p>
              <h4>1. Acceptance of Terms</h4>
              <p>By accessing or using our service, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
              <h4>2. Privacy Policy</h4>
              <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service.</p>
              <h4>3. User Responsibilities</h4>
              <p>You are responsible for maintaining the confidentiality of your account and password.</p>
              <h4>4. Modifications</h4>
              <p>We reserve the right to modify or replace these Terms at any time.</p>
            `
          }
        }
      }
    })
  }
};
