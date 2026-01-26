import { i18nBuilder } from "keycloakify/login/i18n";

// Message keys for the email-otp-authenticator plugin device trust feature
// These are provided by the plugin at runtime, but we define fallbacks here
// for Storybook and type safety
const { useI18n, ofTypeI18n } = i18nBuilder
  .withCustomTranslations({
    en: {
      dontAskForCodePermanently: "Don't ask for a code on this device again",
      dontAskForCodeFor: "Don't ask for a code on this device for {0} {1}",
      unitDayOne: "day",
      unitDayMany: "days",
      unitWeekOne: "week",
      unitWeekMany: "weeks",
      unitMonthOne: "month",
      unitMonthMany: "months",
      unitYearOne: "year",
      unitYearMany: "years"
    }
  })
  .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
