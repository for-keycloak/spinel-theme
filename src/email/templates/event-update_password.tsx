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

const { exp } = createVariablesHelper("event-update_password.ftl");

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Event: Password Updated";

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
    <Preview>Your password was changed for {exp("realmName")}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Password Changed</Text>

        <Section style={successStyle}>
          <Text style={{ ...styles.paragraph, margin: 0 }}>
            Your password has been successfully updated.
          </Text>
        </Section>

        <Text style={styles.paragraph}>
          The password for your <strong>{exp("realmName")}</strong> account was
          changed.
        </Text>

        <Text style={styles.paragraph}>
          <strong>Time:</strong> {exp("event.date")}
          <br />
          <strong>IP Address:</strong> {exp("event.ipAddress")}
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you made this change, no further action is needed. If you didn't
            change your password, please contact your administrator immediately.
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
  return "Your password was changed";
};
