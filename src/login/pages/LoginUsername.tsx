import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { getSocialProvidersNode } from "./shared/SocialProviders";

export default function LoginUsername(
  props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes
  });

  const {
    social,
    realm,
    url,
    login,
    registrationDisabled,
    messagesPerField
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const socialProvidersNode = getSocialProvidersNode(social?.providers);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("username")}
      headerNode={msg("doLogIn")}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      infoNode={
        <div id="kc-registration-container">
          <div id="kc-registration">
            <span>
              {msg("noAccount")}{" "}
              <a tabIndex={6} href={url.registrationUrl}>
                {msg("doRegister")}
              </a>
            </span>
          </div>
        </div>
      }
      socialProvidersNode={socialProvidersNode}
    >
      <div id="kc-form">
        <div id="kc-form-wrapper">
          <form
            id="kc-form-login"
            onSubmit={() => {
              setIsLoginButtonDisabled(true);
              return true;
            }}
            action={url.loginAction}
            method="post"
          >
            <div className={kcClsx("kcFormGroupClass")}>
              <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                {!realm.loginWithEmailAllowed
                  ? msg("username")
                  : !realm.registrationEmailAsUsername
                    ? msg("usernameOrEmail")
                    : msg("email")}
              </label>
              <input
                tabIndex={2}
                id="username"
                className={kcClsx("kcInputClass")}
                name="username"
                defaultValue={login.username ?? ""}
                type="text"
                autoFocus
                autoComplete="username"
                aria-invalid={messagesPerField.existsError("username")}
              />
              {messagesPerField.existsError("username") && (
                <span
                  id="input-error"
                  className={kcClsx("kcInputErrorMessageClass")}
                  aria-live="polite"
                  dangerouslySetInnerHTML={{
                    __html: kcSanitize(
                      messagesPerField.getFirstError("username")
                    )
                  }}
                />
              )}
            </div>

            {realm.rememberMe && (
              <div className={kcClsx("kcFormGroupClass")}>
                <div className="checkbox">
                  <label>
                    <input
                      tabIndex={3}
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      defaultChecked={!!login.rememberMe}
                    />{" "}
                    {msg("rememberMe")}
                  </label>
                </div>
              </div>
            )}

            <div
              id="kc-form-buttons"
              className={kcClsx("kcFormGroupClass")}
            >
              <input
                tabIndex={4}
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
          </form>
        </div>
      </div>
    </Template>
  );
}
