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

const { exp } = createVariablesHelper("email-verification.ftl");

// For jsx-email preview
export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Email Verification";

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Verify your email for {exp("realmName")}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Verify Your Email</Text>

        <Text style={styles.paragraph}>
          Someone has created a <strong>{exp("realmName")}</strong> account with
          this email address. If this was you, click the button below to verify
          your email address.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={exp("link")} style={styles.button} height={48} width={200}>
            Verify Email
          </Button>
        </Section>

        <Text style={styles.muted}>
          This link will expire in {exp("linkExpirationFormatter(linkExpiration)")}.
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you didn't create this account, you can safely ignore this email.
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
  return "Verify your email";
};
