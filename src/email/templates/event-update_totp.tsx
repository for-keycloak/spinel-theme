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

const { exp } = createVariablesHelper("event-update_totp.ftl");

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Event: TOTP Updated";

const successStyle = {
  backgroundColor: "#D4EDDA",
  border: `3px solid ${colors.black}`,
  color: colors.black,
  padding: "16px",
  marginBottom: "24px"
};

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Two-factor authentication updated for {exp("realmName")}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>2FA Updated</Text>

        <Section style={successStyle}>
          <Text style={{ ...styles.paragraph, margin: 0 }}>
            Your two-factor authentication has been updated.
          </Text>
        </Section>

        <Text style={styles.paragraph}>
          The authenticator app configuration for your{" "}
          <strong>{exp("realmName")}</strong> account was updated.
        </Text>

        <Text style={styles.paragraph}>
          <strong>Time:</strong> {exp("event.date")}
          <br />
          <strong>IP Address:</strong> {exp("event.ipAddress")}
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you made this change, no further action is needed. If you didn't
            update your 2FA settings, please contact your administrator immediately.
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
  return "Two-factor authentication updated";
};
