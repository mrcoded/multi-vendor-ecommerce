import * as React from "react";
import {
  Body,
  Container,
  Html,
  Head,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function EmailTemplate({
  name = "",
  redirectUrl = "/login",
  linkText = "Login",
}: {
  name: string;
  redirectUrl: string;
  linkText: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>A fine</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={`${baseUrl}/logo.png`} width={32} height={32} alt="logo" />

          <Text style={title}>{linkText}</Text>

          <Section>
            <Text>
              Hey <strong>{name}</strong>!
            </Text>
            <Text>
              Thank you for creating an account with Us, we have sent you a
              Verification email. Kindly check your inbox, click on the link to
              complete your onboarding process.
            </Text>

            <Link href={`${baseUrl}/${redirectUrl}`}>{linkText}</Link>
            <Section>
              <Row style={footerLogos}>
                <Column style={{ width: "66%" }}>
                  <Img
                    src={`${baseUrl}/static/slack-logo.png`}
                    width="120"
                    height="36"
                    alt="Slack"
                  />
                </Column>
                <Column>
                  <Section>
                    <Row>
                      <Column>
                        <Link href="/">
                          <Img
                            src={`${baseUrl}/static/slack-twitter.png`}
                            width="32"
                            height="32"
                            alt="Slack"
                            style={socialMediaIcon}
                          />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="/">
                          <Img
                            src={`${baseUrl}/static/slack-facebook.png`}
                            width="32"
                            height="32"
                            alt="Slack"
                            style={socialMediaIcon}
                          />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="/">
                          <Img
                            src={`${baseUrl}/static/slack-linkedin.png`}
                            width="32"
                            height="32"
                            alt="Slack"
                            style={socialMediaIcon}
                          />
                        </Link>
                      </Column>
                    </Row>
                  </Section>
                </Column>
              </Row>
            </Section>
          </Section>
          <Text style={links}>
            <Link style={link}></Link>
            <Link style={link}>Contact Support</Link>
          </Text>

          <Text style={footer}>A</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default EmailTemplate;

const main = {
  backgroundColor: "#fff",
  color: "#24292e",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI Emoji', 'Arial', 'Segoe UI', 'Apple Color Emoji','Helvetica Neue', sans-serif",
};

const container = {
  width: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};

const footerLogos: React.CSSProperties = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const title: React.CSSProperties = { fontSize: "24px", lineHeight: 1.25 };

const links: React.CSSProperties = { textAlign: "center" };

const link: React.CSSProperties = { color: "#0366d6", fontSize: "12px" };

const footer: React.CSSProperties = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center",
  marginTop: "60px",
};
