import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalSection,
  LegalNote,
  LegalList,
  LegalListItem,
} from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — Yantrix Labs",
  description:
    "How Yantrix Labs collects, uses, stores, and protects your personal information. A transparent overview of our data practices for website visitors and prospective clients.",
};

const SECTIONS = [
  { id: "introduction", number: "01", title: "Introduction" },
  { id: "scope", number: "02", title: "Scope of This Policy" },
  { id: "information-we-collect", number: "03", title: "Information We Collect" },
  { id: "automatic-data", number: "04", title: "Automatically Collected Data" },
  { id: "contact-data", number: "05", title: "Contact Forms, Inquiries & Communications" },
  { id: "how-we-use", number: "06", title: "How We Use Personal Data" },
  { id: "cookies", number: "07", title: "Cookies & Similar Technologies" },
  { id: "analytics", number: "08", title: "Analytics & Third-Party Tools" },
  { id: "sharing", number: "09", title: "Sharing with Service Providers" },
  { id: "retention", number: "10", title: "Data Retention" },
  { id: "security", number: "11", title: "Security Safeguards" },
  { id: "rights", number: "12", title: "Your Rights & Choices" },
  { id: "requests", number: "13", title: "Making a Request" },
  { id: "international", number: "14", title: "International Data Transfers" },
  { id: "children", number: "15", title: "Children's Privacy" },
  { id: "third-party-links", number: "16", title: "Third-Party Links" },
  { id: "changes", number: "17", title: "Changes to This Policy" },
  { id: "contact", number: "18", title: "Contact & Grievance Details" },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Privacy Policy"
      subtitle="We are a studio, not a data business. This policy explains what personal information we handle, why we need it, and how you can control it — in plain English."
      effectiveDate="June 2025"
      sections={SECTIONS}
    >
      {/* 01 */}
      <LegalSection id="introduction" number="01" title="Introduction">
        <p>
          Yantrix Labs is a digital studio based in Jaipur, Rajasthan, India. We design and
          build websites, AI systems, and software for businesses. Our website is a marketing and
          credibility tool — it does not run user accounts, subscription flows, or consumer-facing
          services. The personal information we handle is therefore limited and purposeful.
        </p>
        <p>
          This Privacy Policy explains what we collect when you visit{" "}
          <a href="https://yantrixlabs.studio" className="text-brand underline-offset-2 hover:underline">
            yantrixlabs.studio
          </a>
          , get in touch about a project, or engage us as a client. We have written it in plain
          language because we believe privacy notices should actually be readable.
        </p>
      </LegalSection>

      {/* 02 */}
      <LegalSection id="scope" number="02" title="Scope of This Policy">
        <p>This policy applies to:</p>
        <LegalList>
          <LegalListItem>Visitors to our website, anywhere in the world</LegalListItem>
          <LegalListItem>Prospective clients who contact us via WhatsApp, email, or any contact form</LegalListItem>
          <LegalListItem>Clients whose personal details are processed in the course of a service engagement</LegalListItem>
        </LegalList>
        <p>
          It does not govern data practices within systems we build and deliver for our clients —
          those are covered by each client&apos;s own privacy arrangements. It also does not apply
          to third-party websites we link to from our pages.
        </p>
      </LegalSection>

      {/* 03 */}
      <LegalSection id="information-we-collect" number="03" title="Information We Collect">
        <p>
          We collect only what is necessary for a clear purpose. Here is what that looks like
          in practice:
        </p>

        <div className="space-y-3 not-prose">
          {[
            {
              label: "Inquiry & contact data",
              body: "When you reach out — via WhatsApp, email, or any form on this site — you share your name, email address, phone number, company name, and a description of what you need. We use this to respond and, where relevant, progress a commercial conversation.",
            },
            {
              label: "Client engagement data",
              body: "Once a project begins, we process additional information required to deliver the work: business details, access credentials (shared through secure channels), project communications, and invoicing information. All of this is handled with strict confidentiality.",
            },
            {
              label: "Website usage data",
              body: "When you visit the site, our hosting and analytics infrastructure records technical signals: approximate geographic location (country or region), browser type, device category, pages viewed, and time on page. This is aggregate and does not identify you personally.",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border/50 bg-card p-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brand/80">
                {item.label}
              </p>
              <p className="text-[14px] leading-relaxed text-foreground/75">{item.body}</p>
            </div>
          ))}
        </div>
      </LegalSection>

      {/* 04 */}
      <LegalSection id="automatic-data" number="04" title="Automatically Collected Data">
        <p>
          Like any modern website, our infrastructure records certain technical data each time
          a request is made to our servers. This includes:
        </p>
        <LegalList>
          <LegalListItem>
            <strong className="text-foreground font-medium">IP address.</strong>{" "}
            Logged by our hosting provider for security and traffic analysis. We do not store
            IP addresses linked to individual identities or use them for profiling.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Browser and device metadata.</strong>{" "}
            Browser name and version, operating system, screen resolution, and language settings.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Referrer URL.</strong>{" "}
            The address of the page you visited before arriving at our site, where the browser
            provides it.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Page views and interactions.</strong>{" "}
            Which pages you visited and how you navigated the site — used to understand what
            is useful and what we should improve.
          </LegalListItem>
        </LegalList>
        <p>
          This data helps us keep the website running well and understand how it performs. It
          is not used to build individual profiles, retarget visitors, or sold to any advertiser.
        </p>
      </LegalSection>

      {/* 05 */}
      <LegalSection id="contact-data" number="05" title="Contact Forms, Inquiries & Communications">
        <p>
          If you send us a message through any channel — WhatsApp, email, a contact form, or
          direct outreach — we receive and store the contents of that message along with any
          contact details you include.
        </p>
        <p>
          We use this information solely to respond to you and to manage a potential or active
          client relationship. We do not add you to any email list without your explicit
          agreement. Follow-up messages from us are always directly related to what you asked about.
        </p>
        <LegalNote>
          We never sell, rent, or share your contact details with third parties for marketing purposes. Full stop.
        </LegalNote>
      </LegalSection>

      {/* 06 */}
      <LegalSection id="how-we-use" number="06" title="How We Use Personal Data">
        <p>We process personal data for the following specific purposes:</p>
        <LegalList>
          <LegalListItem>
            <strong className="text-foreground font-medium">Responding to inquiries.</strong>{" "}
            To reply to messages and provide information about our services and availability.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Delivering services.</strong>{" "}
            To manage, execute, and support the work you have engaged us for.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Billing and administration.</strong>{" "}
            To issue invoices, record payments, and maintain records required by Indian tax and
            business law.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Website improvement.</strong>{" "}
            To understand how the site is used and make it clearer and more effective.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Legal compliance.</strong>{" "}
            To meet our obligations under applicable Indian law, including tax, contract, and
            record-keeping requirements.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Security.</strong>{" "}
            To detect, prevent, and respond to misuse of our website or services.
          </LegalListItem>
        </LegalList>
        <p>
          Where we rely on consent for any processing (such as optional communications), you
          may withdraw that consent at any time. Withdrawal does not affect anything processed
          before withdrawal.
        </p>
      </LegalSection>

      {/* 07 */}
      <LegalSection id="cookies" number="07" title="Cookies & Similar Technologies">
        <p>
          Our website uses a minimal number of cookies and browser storage mechanisms. We
          categorise them as follows:
        </p>
        <div className="not-prose space-y-3">
          {[
            {
              label: "Strictly necessary",
              body: "Required for the website to function correctly — for example, storing your dark or light mode preference. These cannot be disabled without breaking core functionality.",
            },
            {
              label: "Analytics",
              body: "Used to understand how visitors navigate the site in aggregate. We favour privacy-first analytics tools that do not track individuals across websites and do not use advertising cookies.",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border/50 bg-card p-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                {item.label}
              </p>
              <p className="text-[14px] leading-relaxed text-foreground/75">{item.body}</p>
            </div>
          ))}
        </div>
        <p>
          You can control cookie behaviour through your browser settings at any time. Disabling
          analytics cookies will not affect your ability to access the website.
        </p>
      </LegalSection>

      {/* 08 */}
      <LegalSection id="analytics" number="08" title="Analytics & Third-Party Tools">
        <p>
          We use analytics to understand site traffic and visitor behaviour in aggregate form.
          Our strong preference is for privacy-respecting platforms that avoid cross-site
          tracking, do not use advertising identifiers, and aggregate or anonymise data before
          storage.
        </p>
        <p>
          Our website is hosted on modern cloud infrastructure (Vercel or equivalent providers).
          These services process request data as part of normal website delivery under their own
          privacy commitments.
        </p>
        <p>
          The site also embeds interactive elements — such as 3D scenes and embedded media —
          that may request resources from third-party servers when they load. We configure these
          where possible to minimise data sharing, but we recommend reviewing the respective
          providers&apos; privacy policies for full details.
        </p>
      </LegalSection>

      {/* 09 */}
      <LegalSection id="sharing" number="09" title="Sharing with Service Providers">
        <p>
          We share personal data only where necessary and only with trusted service providers
          who help us run the website and deliver our services. These may include:
        </p>
        <LegalList>
          <LegalListItem>
            <strong className="text-foreground font-medium">Hosting providers</strong> — for secure website delivery and uptime
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Analytics platforms</strong> — for anonymised, aggregate usage analysis
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Communication tools</strong> — email and messaging platforms through which we engage with clients and prospects
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Payment and invoicing tools</strong> — for invoice issuance and payment processing where applicable
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Project management tools</strong> — used internally to track deliverables and client communications
          </LegalListItem>
        </LegalList>
        <p>
          We require all service providers to maintain appropriate security standards and to
          use personal data only for the specific purpose for which it was shared. We do not
          sell personal data. We do not share data with advertisers.
        </p>
      </LegalSection>

      {/* 10 */}
      <LegalSection id="retention" number="10" title="Data Retention">
        <p>
          We hold personal data for as long as it is needed for the purpose it was collected,
          or as required by Indian law (tax and financial records, for example, carry statutory
          retention requirements).
        </p>
        <LegalList>
          <LegalListItem>
            <strong className="text-foreground font-medium">Inquiry data</strong> — retained for a reasonable period after first contact (typically up to 24 months), then deleted or anonymised unless an engagement began
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Client engagement data</strong> — retained for as long as required by legal, financial, and contractual obligations, generally 5–7 years as a responsible business practice
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Analytics data</strong> — stored in aggregate or anonymised form; individual session records are not retained long-term
          </LegalListItem>
        </LegalList>
        <p>
          You may request deletion of your data at any time — see Section 13 for how to do so.
        </p>
      </LegalSection>

      {/* 11 */}
      <LegalSection id="security" number="11" title="Security Safeguards">
        <p>
          We implement reasonable and proportionate technical and organisational safeguards to
          protect personal data from unauthorised access, loss, alteration, or disclosure:
        </p>
        <LegalList>
          <LegalListItem>HTTPS encryption for all data in transit to and from this website</LegalListItem>
          <LegalListItem>Access controls within our team, limiting who can access client information and to what extent</LegalListItem>
          <LegalListItem>Use of reputable, security-conscious infrastructure and hosting providers</LegalListItem>
          <LegalListItem>Periodic review of the tools and services used to process personal data</LegalListItem>
        </LegalList>
        <p>
          No data storage or transmission method is perfectly secure. We take our responsibilities
          seriously and apply sensible safeguards, but we cannot guarantee absolute security. In
          the event of a data breach that materially affects you, we will notify you promptly
          and take all reasonable steps to contain it.
        </p>
      </LegalSection>

      {/* 12 */}
      <LegalSection id="rights" number="12" title="Your Rights & Choices">
        <p>
          Depending on your location and applicable law, you may have the following rights in
          relation to your personal data:
        </p>
        <div className="not-prose space-y-2">
          {[
            { right: "Access", description: "Request a copy of the personal data we hold about you and an explanation of how we use it." },
            { right: "Correction", description: "Ask us to correct personal data that is inaccurate or update information that is incomplete." },
            { right: "Deletion", description: "Request that we delete your personal data, subject to legal obligations that require us to retain certain records." },
            { right: "Objection", description: "Object to processing based on legitimate interest. We will consider your objection and respond to it honestly." },
            { right: "Consent withdrawal", description: "Where we rely on consent for any processing, you may withdraw it at any time. This does not affect the lawfulness of processing before withdrawal." },
          ].map((item) => (
            <div key={item.right} className="flex gap-4 rounded-xl border border-border/50 bg-card px-5 py-4">
              <span className="mt-0.5 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-brand/80 w-20">
                {item.right}
              </span>
              <p className="text-[14px] leading-relaxed text-foreground/75">{item.description}</p>
            </div>
          ))}
        </div>
        <p>
          We aim to respond to all valid requests within 30 days. In complex cases, we may
          require up to 60 days, and we will let you know in advance if that is necessary.
        </p>
      </LegalSection>

      {/* 13 */}
      <LegalSection id="requests" number="13" title="Making a Request">
        <p>
          To exercise any of the rights above, contact us at{" "}
          <a
            href="mailto:hello@yantrixlabs.studio"
            className="text-brand underline-offset-2 hover:underline"
          >
            hello@yantrixlabs.studio
          </a>{" "}
          with the subject line <em>Privacy Request</em>. Please include enough detail for us
          to identify the relevant data and process your request accurately.
        </p>
        <p>
          We may need to verify your identity before processing certain requests. We will not
          charge a fee for reasonable, good-faith requests. We reserve the right to decline
          requests that are clearly unfounded, disproportionate, or repetitive.
        </p>
        <LegalNote>
          If you are dissatisfied with how we handle your request, you have the right to raise a
          concern through appropriate legal or regulatory channels under applicable Indian law.
        </LegalNote>
      </LegalSection>

      {/* 14 */}
      <LegalSection id="international" number="14" title="International Data Transfers">
        <p>
          Yantrix Labs is based in India. Several of the cloud tools and hosting providers we
          use operate servers outside India — including in the United States and the European
          Union. When data is transferred internationally, we take reasonable steps to ensure
          it receives equivalent protection, either through contractual commitments or the
          providers&apos; own data protection frameworks.
        </p>
        <p>
          We do not transfer personal data internationally for any purpose beyond what is
          required to deliver our services or operate this website.
        </p>
      </LegalSection>

      {/* 15 */}
      <LegalSection id="children" number="15" title="Children's Privacy">
        <p>
          This website is not directed at children under the age of 18. We do not knowingly
          collect personal information from minors. If you believe we have inadvertently received
          personal data from a person under 18, please contact us and we will delete it without
          delay.
        </p>
      </LegalSection>

      {/* 16 */}
      <LegalSection id="third-party-links" number="16" title="Third-Party Links">
        <p>
          This website may contain links to external services — such as our social media
          profiles, tools we recommend, or platforms we integrate with. These links are provided
          for your convenience only.
        </p>
        <p>
          Yantrix Labs is not responsible for the privacy practices or content of any website
          we link to. Once you leave our site, this policy no longer applies. We encourage you
          to read the privacy policy of any website you visit from here.
        </p>
      </LegalSection>

      {/* 17 */}
      <LegalSection id="changes" number="17" title="Changes to This Policy">
        <p>
          We update this Privacy Policy when our practices, tools, or legal obligations change.
          The effective date at the top of the page reflects the current version.
        </p>
        <p>
          For material changes — particularly anything that affects how we handle client data —
          we will make reasonable efforts to notify you directly. Continued use of the website
          after a policy update constitutes acceptance of the revised version.
        </p>
      </LegalSection>

      {/* 18 */}
      <LegalSection id="contact" number="18" title="Contact & Grievance Details">
        <p>
          For privacy-related questions, correction requests, deletion requests, or concerns,
          please reach out:
        </p>
        <div className="mt-5 rounded-xl border border-border/60 bg-card p-6">
          <p className="font-medium text-foreground">Yantrix Labs</p>
          <p className="mt-1.5 text-[14px] text-muted-foreground">
            Corporate Tower, C Scheme, Jaipur, Rajasthan, India
          </p>
          <a
            href="mailto:hello@yantrixlabs.studio"
            className="mt-2.5 inline-block text-[14px] text-brand transition-colors hover:underline underline-offset-2"
          >
            hello@yantrixlabs.studio
          </a>
          <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
            We acknowledge all privacy requests within 2 business days and aim to resolve them
            within 30 days. If you have an unresolved concern, you have the right to raise it
            through applicable legal channels under Indian law.
          </p>
        </div>
      </LegalSection>
    </LegalPageLayout>
  );
}
