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

const { exp } = createVariablesHelper("org-invite.ftl");

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Organization Invitation";

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>You've been invited to join {exp("orgName" as any)}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Organization Invite</Text>

        <Text style={styles.paragraph}>
          You have been invited to join <strong>{exp("orgName" as any)}</strong> on{" "}
          <strong>{exp("realmName")}</strong>. Click the button below to accept
          the invitation.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={exp("link")} style={styles.button} height={48} width={200}>
            Accept Invitation
          </Button>
        </Section>

        <Text style={styles.muted}>
          This invitation will expire in {exp("linkExpirationFormatter(linkExpiration)")}.
        </Text>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            If you weren't expecting this invitation, you can safely ignore this email.
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
  return "You've been invited to an organization";
};
