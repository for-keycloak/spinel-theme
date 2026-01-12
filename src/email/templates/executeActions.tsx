import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Preview,
  render
} from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { styles } from "../styles";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const { exp } = createVariablesHelper("executeActions.ftl");

// For jsx-email preview
export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Execute Actions";

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Action required for your {exp("realmName")} account</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Action Required</Text>

        <Text style={styles.paragraph}>
          Your administrator has requested that you update your{" "}
          <strong>{exp("realmName")}</strong> account by performing the
          required action(s). Click the button below to proceed.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={exp("link")} style={styles.button} height={48} width={200}>
            Complete Actions
          </Button>
        </Section>

        <Text style={styles.muted}>
          This link will expire in {exp("linkExpirationFormatter(linkExpiration)")}.
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you are unaware of why you received this email, please contact
            your administrator.
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
  return "Update your account";
};
