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

const { exp } = createVariablesHelper("email-verification-with-code.ftl" as any);

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Email Verification (Code)";

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>
      Your {exp("realmName")} verification code: {exp("code" as any)}
    </Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Verification Code</Text>

        <Text style={styles.paragraph}>
          Use the following code to verify your email address for your{" "}
          <strong>{exp("realmName")}</strong> account:
        </Text>

        <Section style={styles.buttonContainer}>
          <Text style={styles.codeContainer}>
            <span style={styles.code}>{exp("code" as any)}</span>
          </Text>
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

// Written by hand so the code sits on the same line as "verification code",
// which helps mail apps (e.g. Gmail's "Copy code" button) recognise it
const plainText = `Your ${exp("realmName")} verification code: ${exp("code" as any)}

This code will expire in ${exp("linkExpirationFormatter(linkExpiration)")}.

If you didn't request this code, you can safely ignore this email.
`;

export const getTemplate: GetTemplate = async (props) => {
  if (props.plainText) return plainText;
  return await render(<Template {...props} />);
};

export const getSubject: GetSubject = async () => {
  return "Your verification code";
};
