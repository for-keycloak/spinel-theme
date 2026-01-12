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
import { styles, colors } from "../styles";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const { exp } = createVariablesHelper("workflow-notification.ftl" as any);

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "spinel"
};

export const templateName = "Workflow Notification";

const infoStyle = {
  backgroundColor: "#CCE5FF",
  border: `3px solid ${colors.black}`,
  color: colors.black,
  padding: "16px",
  marginBottom: "24px"
};

export const Template = ({ locale }: TemplateProps) => (
  <Html lang={locale}>
    <Head />
    <Preview>Action required for {exp("realmName")}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <div style={styles.headerDecoration} />
        <Text style={styles.heading}>Approval Required</Text>

        <Section style={infoStyle}>
          <Text style={{ ...styles.paragraph, margin: 0 }}>
            A workflow requires your attention.
          </Text>
        </Section>

        <Text style={styles.paragraph}>
          There is a pending workflow item that requires your review for{" "}
          <strong>{exp("realmName")}</strong>.
        </Text>

        <Section style={styles.buttonContainer}>
          <Button href={exp("link")} style={styles.button} height={48} width={200}>
            Review Request
          </Button>
        </Section>

        <Section style={styles.footer}>
          <Text style={styles.muted}>
            This notification was sent because you are designated as an approver
            for this workflow.
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
  return "Workflow approval required";
};
