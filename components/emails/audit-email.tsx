import { Html, Head, Preview, Body, Container, Text, Section } from '@react-email/components';

export function AuditEmailTemplate({ name, url, auditResult }: any) {
  return (
    <Html>
      <Head />
      <Preview>Your Yantrix Labs AI Audit for {url}</Preview>
      <Body style={{ fontFamily: 'system-ui' }}>
        <Container>
          <Text>Hi {name || 'there'},</Text>
          <Text>Here is the AI Website Audit you requested for {url}.</Text>
          <Section>
            <Text>Overall Score: {auditResult?.overallScore || 'N/A'}/100</Text>
            {/* You can map over auditResult.issues and recommendations here */}
          </Section>
          <Text>Reply to this email if you'd like to discuss fixing these issues!</Text>
        </Container>
      </Body>
    </Html>
  );
}
