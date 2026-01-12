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

const { exp } = createVariablesHelper("event-login_error.ftl");

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Event: Login Error";

const warningStyle = {
  backgroundColor: "#FFCCD5",
  border: `3px solid ${colors.black}`,
  color: colors.black,
  padding: "16px",
  marginBottom: "24px"
};

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Failed login attempt on your {exp("realmName")} account</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Login Failed</Text>

        <Section style={warningStyle}>
          <Text style={{ ...styles.paragraph, margin: 0 }}>
            A failed login attempt was detected on your account.
          </Text>
        </Section>

        <Text style={styles.paragraph}>
          Someone attempted to sign in to your <strong>{exp("realmName")}</strong>{" "}
          account but entered incorrect credentials.
        </Text>

        <Text style={styles.paragraph}>
          <strong>Time:</strong> {exp("event.date")}
          <br />
          <strong>IP Address:</strong> {exp("event.ipAddress")}
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If this was you, you can ignore this message. If you don't recognize
            this activity, please secure your account by changing your password.
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
  return "Failed login attempt detected";
};
