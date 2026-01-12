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

const { exp } = createVariablesHelper("email-verification-with-code.ftl" as any);

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Email Verification (Code)";

const codeStyle = {
  backgroundColor: colors.cream,
  border: `3px solid ${colors.black}`,
  color: colors.black,
  display: "inline-block",
  fontSize: "32px",
  fontWeight: "900",
  letterSpacing: "0.3em",
  padding: "16px 32px",
  textAlign: "center" as const
};

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Your verification code for {exp("realmName")}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Verification Code</Text>

        <Text style={styles.paragraph}>
          Use the following code to verify your email address for your{" "}
          <strong>{exp("realmName")}</strong> account:
        </Text>

        <Section style={styles.buttonContainer}>
          <Text style={codeStyle}>{exp("code" as any)}</Text>
        </Section>

        <Text style={styles.muted}>
          This code will expire in {exp("linkExpirationFormatter(linkExpiration)")}.
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you didn't request this code, you can safely ignore this email.
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
  return "Your verification code";
};
