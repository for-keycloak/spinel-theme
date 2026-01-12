import KcPage from "../KcPage";
import { createGetKcContextMock } from "keycloakify/login/KcContext";

// Shared mock setup for all story files
export const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension: {
    themeName: "spinel",
    properties: {}
  },
  kcContextExtensionPerPage: {},
  overrides: {},
  overridesPerPage: {}
});

// Re-export for story meta configuration
export { KcPage };
