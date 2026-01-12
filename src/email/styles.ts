// Neo-brutalist email styles
// Note: Email clients have limited CSS support, so we use inline styles

export const colors = {
  // Light mode (default for email)
  cream: "#FFFDF7",
  black: "#0D0D0D",
  white: "#FFFFFF",
  gray: "#6B6B6B",
  accent: "#e64c4c",
  accentPastel: "#eb7070"
};

export const styles = {
  body: {
    backgroundColor: colors.cream,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: "0",
    padding: "40px 20px"
  },

  container: {
    backgroundColor: colors.white,
    border: `3px solid ${colors.black}`,
    boxShadow: `8px 8px 0 ${colors.black}`,
    margin: "0 auto",
    maxWidth: "600px",
    padding: "40px"
  },

  headerDecoration: {
    backgroundColor: colors.accent,
    height: "6px",
    margin: "0 auto 24px",
    width: "60px"
  },

  heading: {
    color: colors.black,
    fontSize: "28px",
    fontWeight: "900",
    letterSpacing: "-0.02em",
    lineHeight: "1.2",
    margin: "0 0 24px",
    textAlign: "center" as const,
    textTransform: "uppercase" as const
  },

  paragraph: {
    color: colors.black,
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "0 0 16px"
  },

  button: {
    backgroundColor: colors.accent,
    border: `3px solid ${colors.black}`,
    boxShadow: `4px 4px 0 ${colors.black}`,
    color: colors.black,
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "0.05em",
    padding: "16px 32px",
    textDecoration: "none",
    textTransform: "uppercase" as const
  },

  buttonContainer: {
    margin: "32px 0",
    textAlign: "center" as const
  },

  link: {
    color: colors.black,
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "4px"
  },

  footer: {
    borderTop: `3px solid ${colors.black}`,
    color: colors.gray,
    fontSize: "14px",
    lineHeight: "1.5",
    marginTop: "32px",
    paddingTop: "24px"
  },

  muted: {
    color: colors.gray,
    fontSize: "14px"
  }
};
