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
import { styles } from "../styles";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const { exp } = createVariablesHelper("email-test.ftl");

// For jsx-email preview
export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "SMTP Test";

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Test email from {exp("realmName")}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>SMTP Test</Text>

        <Text style={styles.paragraph}>
          This is a test email from <strong>{exp("realmName")}</strong>.
        </Text>

        <Text style={styles.paragraph}>
          If you're reading this, your email configuration is working correctly!
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            This email was sent as part of the SMTP configuration test.
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
  return "[Keycloak] - SMTP test message";
};
