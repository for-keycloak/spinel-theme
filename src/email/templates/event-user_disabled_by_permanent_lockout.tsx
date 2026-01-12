import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Preview,
  render
} from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { styles, colors } from "../styles";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const { exp } = createVariablesHelper("event-user_disabled_by_permanent_lockout.ftl");

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Event: Account Locked (Permanent)";

const errorStyle = {
  backgroundColor: "#FFCCD5",
  border: `3px solid ${colors.black}`,
  color: colors.black,
  padding: "16px",
  marginBottom: "24px"
};

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Your {exp("realmName")} account has been locked</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Account Locked</Text>

        <Section style={errorStyle}>
          <Text style={{ ...styles.paragraph, margin: 0 }}>
            Your account has been permanently locked due to too many failed login attempts.
          </Text>
        </Section>

        <Text style={styles.paragraph}>
          Your <strong>{exp("realmName")}</strong> account has been disabled after
          multiple failed login attempts. This is a security measure to protect
          your account.
        </Text>

        <Text style={styles.paragraph}>
          <strong>Time:</strong> {exp("event.date")}
          <br />
          <strong>IP Address:</strong> {exp("event.ipAddress")}
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            Please contact your administrator to unlock your account.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async () => {
  return "Your account has been locked";
};
