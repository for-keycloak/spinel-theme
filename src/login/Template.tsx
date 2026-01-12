import { useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    kcContext,
    i18n,
    children
  } = props;

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
  const { realm, message, auth, url, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
  }, [documentTitle, realm.displayName, msgStr]);

  // Determine if we should show the username (for multi-step auth flows)
  const showUsernameHeader =
    auth !== undefined && auth.showUsername && !auth.showResetCredentials;

  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex flex-col font-[family-name:var(--font-grotesque)]">
      {/* Decorative background shapes */}
      <div className="decorative-bg fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--color-accent-pastel)] border-3 border-[var(--color-black)] rotate-12" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[var(--color-pink)] border-3 border-[var(--color-black)] -rotate-6" />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-[var(--color-blue)] border-3 border-[var(--color-black)] rotate-45" />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-[var(--color-green)] border-3 border-[var(--color-black)] -rotate-12" />
      </div>

      {/* Main content */}
      <main className="relative flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="brutalist-card">
            {/* Header decoration */}
            <div className="header-decoration" />

            {/* Header */}
            <header className="mb-6 text-center">
              {/* Either show the page title or the attempted username */}
              {!showUsernameHeader ? (
                <h1 className="text-3xl font-black tracking-tight text-[var(--color-black)] uppercase">
                  {headerNode}
                </h1>
              ) : (
                <div className="username-header">
                  <h1 className="text-3xl font-black tracking-tight text-[var(--color-black)] uppercase">
                    {headerNode}
                  </h1>
                  <div className="attempted-username">
                    <span>{auth.attemptedUsername}</span>
                    <a
                      href={url.loginRestartFlowUrl}
                      aria-label={msgStr("restartLoginTooltip")}
                      title={msgStr("restartLoginTooltip")}
                      className="restart-flow-link"
                    >
                      ↻
                    </a>
                  </div>
                </div>
              )}
            </header>

            {/* Required fields indicator */}
            {displayRequiredFields && (
              <div className="required-fields-hint">
                <span className="required">*</span> {msg("requiredFields")}
              </div>
            )}

            {/* Messages - hide warnings during app-initiated actions */}
            {displayMessage &&
              message !== undefined &&
              (message.type !== "warning" || !isAppInitiatedAction) && (
                <div
                  className={`alert ${
                    message.type === "error"
                      ? "alert-error"
                      : message.type === "warning"
                        ? "alert-warning"
                        : message.type === "success"
                          ? "alert-success"
                          : "alert-info"
                  }`}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: kcSanitize(message.summary)
                    }}
                  />
                </div>
              )}

            {/* Form content */}
            <div className="space-y-8">{children}</div>

            {/* Try another way link */}
            {auth !== undefined && auth.showTryAnotherWayLink && (
              <form
                id="kc-select-try-another-way-form"
                action={url.loginAction}
                method="post"
                className="mt-6"
              >
                <input type="hidden" name="tryAnotherWay" value="on" />
                <button type="submit" className="btn-secondary">
                  {msg("doTryAnotherWay")}
                </button>
              </form>
            )}

            {/* Social providers - only show if there's actual content */}
            {socialProvidersNode && (
              <div className="mt-10">
                <div className="divider">or</div>
                {socialProvidersNode}
              </div>
            )}

            {/* Info section */}
            {displayInfo && infoNode && (
              <div className="mt-10 pt-8 border-t-3 border-[var(--color-black)] text-center">
                {infoNode}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-8 text-center">
        {/* Language selector */}
        {enabledLanguages.length > 1 && (
          <div className="language-selector">
            <select
              value={currentLanguage.languageTag}
              onChange={(e) => {
                const selected = enabledLanguages.find(
                  (lang) => lang.languageTag === e.target.value
                );
                if (selected) {
                  window.location.href = selected.href;
                }
              }}
              aria-label={msgStr("languages")}
            >
              {enabledLanguages.map(({ languageTag, label }) => (
                <option key={languageTag} value={languageTag}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}
        <p className="text-sm font-bold text-[var(--color-black)] uppercase tracking-widest">
          {realm.displayName}
        </p>
      </footer>
    </div>
  );
}
