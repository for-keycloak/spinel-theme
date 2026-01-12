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

const { exp } = createVariablesHelper("otp-email.ftl" as any);

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Email OTP Code";

const codeStyle = {
  backgroundColor: colors.cream,
  border: `3px solid ${colors.black}`,
  color: colors.black,
  display: "inline-block",
  fontSize: "36px",
  fontWeight: "900",
  letterSpacing: "0.3em",
  padding: "20px 40px",
  textAlign: "center" as const
};

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Your login code for {exp("realmName")}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Login Code</Text>

        <Text style={styles.paragraph}>
          Use the following code to log in to your{" "}
          <strong>{exp("realmName")}</strong> account:
        </Text>

        <Section style={styles.buttonContainer}>
          <Text style={codeStyle}>{exp("code" as any)}</Text>
        </Section>

        <Text style={styles.muted}>
          This code will expire in {exp("ttl" as any)} minutes.
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you didn't request this code, someone may be trying to access
            your account. Please secure your account immediately.
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
  return "Your login code";
};
