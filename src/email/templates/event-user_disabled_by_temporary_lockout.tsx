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

const { exp } = createVariablesHelper("event-user_disabled_by_temporary_lockout.ftl");

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Event: Account Locked (Temporary)";

const warningStyle = {
  backgroundColor: "#FFF3CD",
  border: `3px solid ${colors.black}`,
  color: colors.black,
  padding: "16px",
  marginBottom: "24px"
};

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Your {exp("realmName")} account is temporarily locked</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Temporary Lockout</Text>

        <Section style={warningStyle}>
          <Text style={{ ...styles.paragraph, margin: 0 }}>
            Your account has been temporarily locked due to failed login attempts.
          </Text>
        </Section>

        <Text style={styles.paragraph}>
          Your <strong>{exp("realmName")}</strong> account has been temporarily
          disabled after multiple failed login attempts. Please wait before trying
          again.
        </Text>

        <Text style={styles.paragraph}>
          <strong>Time:</strong> {exp("event.date")}
          <br />
          <strong>IP Address:</strong> {exp("event.ipAddress")}
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you didn't attempt to log in, someone may be trying to access your
            account. Consider changing your password when the lockout expires.
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
  return "Your account is temporarily locked";
};
