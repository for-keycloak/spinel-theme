import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type LoginEmailOtpContext = Extract<KcContext, { pageId: "login-email-otp.ftl" }>;

// This page handles the email-otp-authenticator plugin
// https://github.com/for-keycloak/email-otp-authenticator
export default function LoginEmailOtp(
  props: PageProps<LoginEmailOtpContext, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes
  });

  const { url } = kcContext;
  // messagesPerField comes from Common but TypeScript needs a cast for plugin pages
  const messagesPerField = (kcContext as any).messagesPerField ?? {
    existsError: () => false,
    get: () => "",
    getFirstError: () => ""
  };
  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("email-otp")}
      headerNode={msg("doLogIn")}
    >
      <form
        id="kc-otp-login-form"
        action={url.loginAction}
        method="post"
        onSubmit={() => {
          setIsLoginButtonDisabled(true);
          return true;
        }}
      >
        <div className={kcClsx("kcFormGroupClass")}>
          <label htmlFor="email-otp" className={kcClsx("kcLabelClass")}>
            {msg("loginOtpOneTime")}
          </label>
          <input
            id="email-otp"
            name="email-otp"
            type="text"
            autoFocus
            autoComplete="one-time-code"
            dir="ltr"
            className={kcClsx("kcInputClass")}
            aria-invalid={messagesPerField.existsError("email-otp")}
          />
          {messagesPerField.existsError("email-otp") && (
            <span
              id="input-error-email-otp"
              className={kcClsx("kcInputErrorMessageClass")}
              aria-live="polite"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(messagesPerField.getFirstError("email-otp"))
              }}
            />
          )}
        </div>

        <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
          <input
            disabled={isLoginButtonDisabled}
            className={kcClsx(
              "kcButtonClass",
              "kcButtonPrimaryClass",
              "kcButtonBlockClass",
              "kcButtonLargeClass"
            )}
            name="login"
            id="kc-login"
            type="submit"
            value={msgStr("doLogIn")}
          />
        </div>

        <div id="kc-form-options" className={kcClsx("kcFormGroupClass")}>
          <input
            className={kcClsx(
              "kcButtonClass",
              "kcButtonDefaultClass",
              "kcButtonBlockClass"
            )}
            name="resend"
            id="kc-resend"
            type="submit"
            value="Resend Code"
          />
        </div>
      </form>
    </Template>
  );
}
