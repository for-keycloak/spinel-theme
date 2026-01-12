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

const { exp } = createVariablesHelper("identity-provider-link.ftl");

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Identity Provider Link";

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Link your {exp("identityProviderDisplayName")} account</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Link Account</Text>

        <Text style={styles.paragraph}>
          Someone wants to link your <strong>{exp("identityProviderDisplayName")}</strong>{" "}
          account with your <strong>{exp("realmName")}</strong> account. If this was you,
          click the button below to link the accounts.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={exp("link")} style={styles.button} height={48} width={200}>
            Link Accounts
          </Button>
        </Section>

        <Text style={styles.muted}>
          This link will expire in {exp("linkExpirationFormatter(linkExpiration)")}.
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you didn't initiate this request, you can safely ignore this email.
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
  return "Link your account";
};
