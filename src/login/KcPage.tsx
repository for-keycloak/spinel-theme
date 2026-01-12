import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";

const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));
const LoginUsername = lazy(() => import("./pages/LoginUsername"));
const LoginEmailOtp = lazy(() => import("./pages/LoginEmailOtp"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return (
              <Login
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          case "login-username.ftl":
            return (
              <LoginUsername
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          // Third-party plugin: email-otp-authenticator
          // https://github.com/for-keycloak/email-otp-authenticator
          case "login-email-otp.ftl":
            return (
              <LoginEmailOtp
                kcContext={kcContext as any}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          case "login-page-expired.ftl":
            return (
              <LoginPageExpired
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
        }
      })()}
    </Suspense>
  );
}

const classes = {
  // Form layout
  kcFormClass: "kc-form",
  kcFormGroupClass: "form-group",
  kcFormButtonsClass: "form-buttons",
  kcFormOptionsClass: "form-options",
  kcFormOptionsWrapperClass: "form-options-wrapper",
  kcFormSettingClass: "form-setting",
  kcFormGroupHeader: "form-group-header",

  // Labels and inputs
  kcLabelWrapperClass: "label-wrapper",
  kcLabelClass: "label",
  kcInputWrapperClass: "input-wrapper",
  kcInputClass: "input",
  kcInputGroup: "input-group",
  kcInputClassRadio: "input-radio",
  kcInputClassCheckbox: "input-checkbox",
  kcInputErrorMessageClass: "input-error",
  kcCheckboxInputClass: "input-checkbox",

  // Buttons
  kcButtonClass: "btn",
  kcButtonPrimaryClass: "btn-primary",
  kcButtonDefaultClass: "btn-secondary",
  kcButtonBlockClass: "btn-block",
  kcButtonLargeClass: "btn-large",

  // Auth list (select authenticator)
  kcSelectAuthListClass: "auth-list",
  kcSelectAuthListItemClass: "auth-list-item",
  kcSelectAuthListItemIconClass: "auth-list-icon",
  kcSelectAuthListItemBodyClass: "auth-list-body",
  kcSelectAuthListItemHeadingClass: "auth-list-heading",
  kcSelectAuthListItemDescriptionClass: "auth-list-description",
  kcSelectAuthListItemFillClass: "auth-list-fill",
  kcSelectAuthListItemArrowClass: "auth-list-arrow",
  kcSelectAuthListItemArrowIconClass: "auth-list-arrow-icon",

  // OTP
  kcLoginOTPListClass: "otp-list",
  kcLoginOTPListInputClass: "otp-list-input",
  kcLoginOTPListItemHeaderClass: "otp-list-header",
  kcLoginOTPListItemIconBodyClass: "otp-list-icon-body",
  kcLoginOTPListItemIconClass: "otp-list-icon",
  kcLoginOTPListItemTitleClass: "otp-list-title",

  // WebAuthn
  kcWebAuthnDefaultIcon: "webauthn-icon",
  kcWebAuthnKeyIcon: "webauthn-key-icon",

  // Form buttons wrapper
  kcFormButtonsWrapperClass: "form-buttons-wrapper",

  // Recovery codes
  kcRecoveryCodesWarning: "recovery-codes-warning",
  kcRecoveryCodesActions: "recovery-codes-actions",
  kcRecoveryCodesList: "recovery-codes-list",
  kcRecoveryCodesConfirmation: "recovery-codes-confirmation",

  // Social/Organization list
  kcFormSocialAccountListClass: "social-list",
  kcFormSocialAccountListGridClass: "social-list-grid",
  kcFormSocialAccountListButtonClass: "social-list-button",
  kcFormSocialAccountGridItem: "social-grid-item",
  kcFormSocialAccountNameClass: "social-name"
} satisfies { [key in ClassKey]?: string };
