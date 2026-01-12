import type { Meta, StoryObj } from "@storybook/react";
import { styles, colors } from "../email/styles";

// Browser-compatible email preview components (jsx-email only works server-side)
const EmailLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={styles.body}>
    <div style={styles.container}>
      <div style={styles.headerDecoration} />
      {children}
    </div>
  </div>
);

const Button = ({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <a href={href} style={styles.button}>
    {children}
  </a>
);

const AlertBox = ({
  children,
  variant
}: {
  children: React.ReactNode;
  variant: "error" | "warning" | "success" | "info";
}) => {
  const bgColors = {
    error: "#FFCCD5",
    warning: "#FFF3CD",
    success: "#D4EDDA",
    info: "#CCE5FF"
  };
  return (
    <div
      style={{
        backgroundColor: bgColors[variant],
        border: `3px solid ${colors.black}`,
        color: colors.black,
        padding: "16px",
        marginBottom: "24px"
      }}
    >
      <p style={{ ...styles.paragraph, margin: 0 }}>{children}</p>
    </div>
  );
};

const CodeBox = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      backgroundColor: colors.cream,
      border: `3px solid ${colors.black}`,
      color: colors.black,
      display: "inline-block",
      fontSize: "32px",
      fontWeight: "900",
      letterSpacing: "0.3em",
      padding: "16px 32px",
      textAlign: "center"
    }}
  >
    {children}
  </span>
);

// ============================================
// USER ACTION EMAILS
// ============================================

const EmailVerificationPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Verify Your Email</p>
    <p style={styles.paragraph}>
      Someone has created a <strong>{"${realmName}"}</strong> account with this
      email address. If this was you, click the button below to verify your
      email address.
    </p>
    <div style={styles.buttonContainer}>
      <Button href="#">Verify Email</Button>
    </div>
    <p style={styles.muted}>This link will expire in 5 minutes.</p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you didn't create this account, you can safely ignore this email.
      </p>
    </div>
  </EmailLayout>
);

const EmailVerificationWithCodePreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Verification Code</p>
    <p style={styles.paragraph}>
      Use the following code to verify your email address for your{" "}
      <strong>{"${realmName}"}</strong> account:
    </p>
    <div style={styles.buttonContainer}>
      <CodeBox>ABC-123</CodeBox>
    </div>
    <p style={styles.muted}>This code will expire in 5 minutes.</p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you didn't request this code, you can safely ignore this email.
      </p>
    </div>
  </EmailLayout>
);

const PasswordResetPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Reset Password</p>
    <p style={styles.paragraph}>
      Someone has requested to reset the password for your{" "}
      <strong>{"${realmName}"}</strong> account. If this was you, click the
      button below to set a new password.
    </p>
    <div style={styles.buttonContainer}>
      <Button href="#">Reset Password</Button>
    </div>
    <p style={styles.muted}>This link will expire in 5 minutes.</p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you didn't request a password reset, you can safely ignore this
        email. Your password will remain unchanged.
      </p>
    </div>
  </EmailLayout>
);

const EmailUpdateConfirmationPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Confirm Email Change</p>
    <p style={styles.paragraph}>
      You have requested to update your email address for your{" "}
      <strong>{"${realmName}"}</strong> account. Click the button below to
      confirm this change.
    </p>
    <div style={styles.buttonContainer}>
      <Button href="#">Confirm Email</Button>
    </div>
    <p style={styles.muted}>This link will expire in 5 minutes.</p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you didn't request this change, please secure your account immediately.
      </p>
    </div>
  </EmailLayout>
);

const ExecuteActionsPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Action Required</p>
    <p style={styles.paragraph}>
      Your administrator has requested that you update your{" "}
      <strong>{"${realmName}"}</strong> account by performing the required
      action(s). Click the button below to proceed.
    </p>
    <div style={styles.buttonContainer}>
      <Button href="#">Complete Actions</Button>
    </div>
    <p style={styles.muted}>This link will expire in 5 minutes.</p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you are unaware of why you received this email, please contact your
        administrator.
      </p>
    </div>
  </EmailLayout>
);

const IdentityProviderLinkPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Link Account</p>
    <p style={styles.paragraph}>
      Someone wants to link your <strong>Google</strong> account with your{" "}
      <strong>{"${realmName}"}</strong> account. If this was you, click the button
      below to link the accounts.
    </p>
    <div style={styles.buttonContainer}>
      <Button href="#">Link Accounts</Button>
    </div>
    <p style={styles.muted}>This link will expire in 5 minutes.</p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you didn't initiate this request, you can safely ignore this email.
      </p>
    </div>
  </EmailLayout>
);

const OrgInvitePreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Organization Invite</p>
    <p style={styles.paragraph}>
      You have been invited to join <strong>Acme Corp</strong> on{" "}
      <strong>{"${realmName}"}</strong>. Click the button below to accept
      the invitation.
    </p>
    <div style={styles.buttonContainer}>
      <Button href="#">Accept Invitation</Button>
    </div>
    <p style={styles.muted}>This invitation will expire in 5 minutes.</p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you weren't expecting this invitation, you can safely ignore this email.
      </p>
    </div>
  </EmailLayout>
);

const WorkflowNotificationPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Approval Required</p>
    <AlertBox variant="info">A workflow requires your attention.</AlertBox>
    <p style={styles.paragraph}>
      There is a pending workflow item that requires your review for{" "}
      <strong>{"${realmName}"}</strong>.
    </p>
    <div style={styles.buttonContainer}>
      <Button href="#">Review Request</Button>
    </div>
    <div style={styles.footer}>
      <p style={styles.muted}>
        This notification was sent because you are designated as an approver
        for this workflow.
      </p>
    </div>
  </EmailLayout>
);

// ============================================
// EVENT NOTIFICATION EMAILS
// ============================================

const EventLoginErrorPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Login Failed</p>
    <AlertBox variant="error">
      A failed login attempt was detected on your account.
    </AlertBox>
    <p style={styles.paragraph}>
      Someone attempted to sign in to your <strong>{"${realmName}"}</strong>{" "}
      account but entered incorrect credentials.
    </p>
    <p style={styles.paragraph}>
      <strong>Time:</strong> Jan 12, 2026, 2:30 PM
      <br />
      <strong>IP Address:</strong> 192.168.1.1
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If this was you, you can ignore this message. If you don't recognize
        this activity, please secure your account by changing your password.
      </p>
    </div>
  </EmailLayout>
);

const EventUpdatePasswordPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Password Changed</p>
    <AlertBox variant="success">
      Your password has been successfully updated.
    </AlertBox>
    <p style={styles.paragraph}>
      The password for your <strong>{"${realmName}"}</strong> account was
      changed.
    </p>
    <p style={styles.paragraph}>
      <strong>Time:</strong> Jan 12, 2026, 2:30 PM
      <br />
      <strong>IP Address:</strong> 192.168.1.1
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you made this change, no further action is needed. If you didn't
        change your password, please contact your administrator immediately.
      </p>
    </div>
  </EmailLayout>
);

const EventUpdateTotpPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>2FA Updated</p>
    <AlertBox variant="success">
      Your two-factor authentication has been updated.
    </AlertBox>
    <p style={styles.paragraph}>
      The authenticator app configuration for your{" "}
      <strong>{"${realmName}"}</strong> account was updated.
    </p>
    <p style={styles.paragraph}>
      <strong>Time:</strong> Jan 12, 2026, 2:30 PM
      <br />
      <strong>IP Address:</strong> 192.168.1.1
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you made this change, no further action is needed. If you didn't
        update your 2FA settings, please contact your administrator immediately.
      </p>
    </div>
  </EmailLayout>
);

const EventRemoveTotpPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>2FA Removed</p>
    <AlertBox variant="warning">
      Two-factor authentication has been removed from your account.
    </AlertBox>
    <p style={styles.paragraph}>
      The authenticator app was removed from your{" "}
      <strong>{"${realmName}"}</strong> account. Your account is now less
      secure.
    </p>
    <p style={styles.paragraph}>
      <strong>Time:</strong> Jan 12, 2026, 2:30 PM
      <br />
      <strong>IP Address:</strong> 192.168.1.1
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you made this change, consider re-enabling 2FA to keep your account
        secure. If you didn't remove 2FA, please contact your administrator immediately.
      </p>
    </div>
  </EmailLayout>
);

const EventUpdateCredentialPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Credential Updated</p>
    <AlertBox variant="success">
      A security credential has been updated on your account.
    </AlertBox>
    <p style={styles.paragraph}>
      A credential was updated for your <strong>{"${realmName}"}</strong>{" "}
      account.
    </p>
    <p style={styles.paragraph}>
      <strong>Time:</strong> Jan 12, 2026, 2:30 PM
      <br />
      <strong>IP Address:</strong> 192.168.1.1
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you made this change, no further action is needed. If you didn't
        update this credential, please contact your administrator immediately.
      </p>
    </div>
  </EmailLayout>
);

const EventRemoveCredentialPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Credential Removed</p>
    <AlertBox variant="warning">
      A security credential has been removed from your account.
    </AlertBox>
    <p style={styles.paragraph}>
      A credential was removed from your <strong>{"${realmName}"}</strong>{" "}
      account.
    </p>
    <p style={styles.paragraph}>
      <strong>Time:</strong> Jan 12, 2026, 2:30 PM
      <br />
      <strong>IP Address:</strong> 192.168.1.1
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you made this change, no further action is needed. If you didn't
        remove this credential, please contact your administrator immediately.
      </p>
    </div>
  </EmailLayout>
);

const EventPermanentLockoutPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Account Locked</p>
    <AlertBox variant="error">
      Your account has been permanently locked due to too many failed login attempts.
    </AlertBox>
    <p style={styles.paragraph}>
      Your <strong>{"${realmName}"}</strong> account has been disabled after
      multiple failed login attempts. This is a security measure to protect
      your account.
    </p>
    <p style={styles.paragraph}>
      <strong>Time:</strong> Jan 12, 2026, 2:30 PM
      <br />
      <strong>IP Address:</strong> 192.168.1.1
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        Please contact your administrator to unlock your account.
      </p>
    </div>
  </EmailLayout>
);

const EventTemporaryLockoutPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Temporary Lockout</p>
    <AlertBox variant="warning">
      Your account has been temporarily locked due to failed login attempts.
    </AlertBox>
    <p style={styles.paragraph}>
      Your <strong>{"${realmName}"}</strong> account has been temporarily
      disabled after multiple failed login attempts. Please wait before trying
      again.
    </p>
    <p style={styles.paragraph}>
      <strong>Time:</strong> Jan 12, 2026, 2:30 PM
      <br />
      <strong>IP Address:</strong> 192.168.1.1
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you didn't attempt to log in, someone may be trying to access your
        account. Consider changing your password when the lockout expires.
      </p>
    </div>
  </EmailLayout>
);

// ============================================
// PLUGIN EMAILS
// ============================================

const OtpEmailPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>Login Code</p>
    <p style={styles.paragraph}>
      Use the following code to log in to your{" "}
      <strong>{"${realmName}"}</strong> account:
    </p>
    <div style={styles.buttonContainer}>
      <CodeBox>847291</CodeBox>
    </div>
    <p style={styles.muted}>This code will expire in 5 minutes.</p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        If you didn't request this code, someone may be trying to access
        your account. Please secure your account immediately.
      </p>
    </div>
  </EmailLayout>
);

// ============================================
// TEST EMAIL
// ============================================

const EmailTestPreview = () => (
  <EmailLayout>
    <p style={styles.heading}>SMTP Test</p>
    <p style={styles.paragraph}>
      This is a test email from <strong>{"${realmName}"}</strong>.
    </p>
    <p style={styles.paragraph}>
      If you're reading this, your email configuration is working correctly!
    </p>
    <div style={styles.footer}>
      <p style={styles.muted}>
        This email was sent as part of the SMTP configuration test.
      </p>
    </div>
  </EmailLayout>
);

// ============================================
// STORYBOOK META
// ============================================

export default {
  title: "Email Templates",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

type Story = StoryObj;

// User Action Emails
export const Verification: Story = {
  render: () => <EmailVerificationPreview />
};

export const VerificationWithCode: Story = {
  name: "Verification (Code)",
  render: () => <EmailVerificationWithCodePreview />
};

export const ResetPassword: Story = {
  render: () => <PasswordResetPreview />
};

export const UpdateEmailConfirmation: Story = {
  name: "Update Email Confirmation",
  render: () => <EmailUpdateConfirmationPreview />
};

export const AccountActions: Story = {
  render: () => <ExecuteActionsPreview />
};

export const IdentityProviderLink: Story = {
  name: "Identity Provider Link",
  render: () => <IdentityProviderLinkPreview />
};

export const OrganizationInvite: Story = {
  name: "Organization Invite",
  render: () => <OrgInvitePreview />
};

export const WorkflowNotification: Story = {
  name: "Workflow Notification",
  render: () => <WorkflowNotificationPreview />
};

// Event Notification Emails
export const EventLoginError: Story = {
  name: "Event: Login Error",
  render: () => <EventLoginErrorPreview />
};

export const EventPasswordUpdated: Story = {
  name: "Event: Password Updated",
  render: () => <EventUpdatePasswordPreview />
};

export const EventTOTPUpdated: Story = {
  name: "Event: 2FA Updated",
  render: () => <EventUpdateTotpPreview />
};

export const EventTOTPRemoved: Story = {
  name: "Event: 2FA Removed",
  render: () => <EventRemoveTotpPreview />
};

export const EventCredentialUpdated: Story = {
  name: "Event: Credential Updated",
  render: () => <EventUpdateCredentialPreview />
};

export const EventCredentialRemoved: Story = {
  name: "Event: Credential Removed",
  render: () => <EventRemoveCredentialPreview />
};

export const EventPermanentLockout: Story = {
  name: "Event: Account Locked (Permanent)",
  render: () => <EventPermanentLockoutPreview />
};

export const EventTemporaryLockout: Story = {
  name: "Event: Account Locked (Temporary)",
  render: () => <EventTemporaryLockoutPreview />
};

// Plugin Emails
export const OtpLoginCode: Story = {
  name: "Plugin: OTP Login Code",
  render: () => <OtpEmailPreview />
};

// Test Email
export const SMTPTest: Story = {
  render: () => <EmailTestPreview />
};
