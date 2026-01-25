import type { KcContext as KcContextBase } from "keycloakify/login/KcContext";

// Context for the email-otp-authenticator plugin
// https://github.com/for-keycloak/email-otp-authenticator
type KcContextLoginEmailOtp = KcContextBase.Common & {
  pageId: "login-email-otp.ftl";
  url: KcContextBase.Common["url"];
};

export type KcContext = KcContextBase | KcContextLoginEmailOtp;

// Keycloakify auto-detects extra pages by scanning for "xxx.ftl": pattern
// @ts-ignore - This object exists solely for Keycloakify's build-time detection
const _dependencies = { "login-email-otp.ftl": {} }; void _dependencies;
