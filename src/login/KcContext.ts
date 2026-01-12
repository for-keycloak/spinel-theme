import type { KcContext as KcContextBase } from "keycloakify/login/KcContext";

// Context for the email-otp-authenticator plugin
// https://github.com/for-keycloak/email-otp-authenticator
type KcContextLoginEmailOtp = KcContextBase.Common & {
  pageId: "login-email-otp.ftl";
  url: KcContextBase.Common["url"];
};

export type KcContext = KcContextBase | KcContextLoginEmailOtp;
