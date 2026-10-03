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

const { exp } = createVariablesHelper("otp-email.ftl" as any);

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Email OTP Code";

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>
      Your {exp("realmName")} login code: {exp("otp" as any)}
    </Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Login Code</Text>

        <Text style={styles.paragraph}>
          Use the following code to log in to your{" "}
          <strong>{exp("realmName")}</strong> account:
        </Text>

        <Section style={styles.buttonContainer}>
          <Text style={styles.codeContainer}>
            <span style={styles.code}>{exp("otp" as any)}</span>
          </Text>
        </Section>

        <Text style={styles.muted}>
          This code will expire in {exp("ttlMinutes" as any)} minutes.
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

// Written by hand so the code sits on the same line as "login code", which
// helps mail apps (e.g. Gmail's "Copy code" button) recognise it
const plainText = `Your ${exp("realmName")} login code: ${exp("otp" as any)}

This code will expire in ${exp("ttlMinutes" as any)} minutes.

If you didn't request this code, someone may be trying to access your account.
Please secure your account immediately.
`;

export const getTemplate: GetTemplate = async (props) => {
  if (props.plainText) return plainText;
  return await render(<Template {...props} />);
};

export const getSubject: GetSubject = async () => {
  return "Your login code";
};
