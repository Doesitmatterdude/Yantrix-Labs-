import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalSection,
  LegalNote,
  LegalList,
  LegalListItem,
} from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms & Conditions — Yantrix Labs",
  description:
    "Terms and conditions governing the use of the Yantrix Labs website and engagement with our digital services, web development, and AI systems studio.",
};

export const dynamic = "force-static";

const SECTIONS = [
  { id: "introduction", number: "01", title: "Introduction" },
  { id: "acceptance", number: "02", title: "Acceptance of Terms" },
  { id: "eligibility", number: "03", title: "Eligibility & Lawful Use" },
  { id: "services", number: "04", title: "Services Overview" },
  { id: "proposals", number: "05", title: "Project Proposals & Separate Agreements" },
  { id: "pricing", number: "06", title: "Pricing, Deposits & Milestone Billing" },
  { id: "client-responsibilities", number: "07", title: "Client Responsibilities" },
  { id: "timelines", number: "08", title: "Timelines, Delays & Dependencies" },
  { id: "revisions", number: "09", title: "Revisions & Change Requests" },
  { id: "ip", number: "10", title: "Intellectual Property" },
  { id: "third-party", number: "11", title: "Third-Party Tools & Open Source" },
  { id: "confidentiality", number: "12", title: "Confidentiality" },
  { id: "acceptable-use", number: "13", title: "Acceptable Use & Prohibited Conduct" },
  { id: "studio-ip", number: "14", title: "Website Content & Studio IP" },
  { id: "warranties", number: "15", title: "Disclaimer of Warranties" },
  { id: "liability", number: "16", title: "Limitation of Liability" },
  { id: "indemnification", number: "17", title: "Indemnification" },
  { id: "termination", number: "18", title: "Suspension & Termination" },
  { id: "force-majeure", number: "19", title: "Force Majeure" },
  { id: "governing-law", number: "20", title: "Governing Law & Jurisdiction" },
  { id: "updates", number: "21", title: "Updates to These Terms" },
  { id: "contact", number: "22", title: "Contact Information" },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      badge="Legal"
      title="Terms &amp; Conditions"
      subtitle="These terms govern your use of the Yantrix Labs website and set out the general legal framework for studio-client relationships. Where a signed project agreement or proposal exists, it takes precedence over these general terms."
      effectiveDate="June 2025"
      sections={SECTIONS}
    >
      {/* 01 */}
      <LegalSection id="introduction" number="01" title="Introduction">
        <p>
          Yantrix Labs is a digital studio based in Jaipur, Rajasthan, India. We design and build
          websites, AI automation systems, digital products, and custom software. Our work is
          studio-scale: senior people, specific deliverables, and direct accountability.
        </p>
        <p>
          These Terms &amp; Conditions apply to your use of{" "}
          <a href="https://yantrixlabs.studio" className="text-brand underline-offset-2 hover:underline">
            yantrixlabs.studio
          </a>{" "}
          and any related subdomains. They also establish the baseline legal framework for how we
          engage with clients. Every project we take on is governed by a project-specific
          proposal or agreement — and where that document exists, it controls.
        </p>
        <p>
          By using this website, you confirm that you have read and understood these Terms. If
          you are acting on behalf of a business or other legal entity, you confirm you have the
          authority to bind that entity.
        </p>
      </LegalSection>

      {/* 02 */}
      <LegalSection id="acceptance" number="02" title="Acceptance of Terms">
        <p>
          Your continued use of this website constitutes acceptance of these Terms in their
          current form. We reserve the right to update them when our services, legal obligations,
          or business practices change. We communicate material changes by updating the effective
          date at the top of this page.
        </p>
        <p>
          If you do not agree with any part of these Terms, please do not use the website or
          engage our services.
        </p>
      </LegalSection>

      {/* 03 */}
      <LegalSection id="eligibility" number="03" title="Eligibility & Lawful Use">
        <p>
          This website is intended for professional and business inquiry. You must be at least
          18 years of age — or of legal majority in your jurisdiction — to submit inquiries,
          enter agreements, or engage our services.
        </p>
        <p>
          You agree to use this website only for lawful purposes. You will not use it in any way
          that violates applicable Indian or international law, infringes the rights of others, or
          interferes with the technical operation of the site.
        </p>
      </LegalSection>

      {/* 04 */}
      <LegalSection id="services" number="04" title="Services Overview">
        <p>
          Yantrix Labs delivers the following categories of services, among others:
        </p>
        <LegalList>
          <LegalListItem>Premium business websites and marketing sites — strategy, design, development, and launch</LegalListItem>
          <LegalListItem>Custom software development and digital product engineering</LegalListItem>
          <LegalListItem>AI automation systems, including lead generation engines, hiring screeners, and voice/calling agents</LegalListItem>
          <LegalListItem>WhatsApp automation, CRM workflow integration, and operations tooling</LegalListItem>
          <LegalListItem>Digital infrastructure advisory, setup, and technical implementation</LegalListItem>
          <LegalListItem>Ongoing support and maintenance retainers</LegalListItem>
        </LegalList>
        <p>
          The specific scope, deliverables, timeline, and price for any engagement are defined in
          a project proposal or statement of work we issue and you accept. These Terms form the
          background legal framework; the project document governs the specifics.
        </p>
      </LegalSection>

      {/* 05 */}
      <LegalSection id="proposals" number="05" title="Project Proposals & Separate Agreements">
        <LegalNote>
          Each engagement is governed by a project-specific proposal or agreement. Where a signed
          or accepted agreement exists, it takes precedence over these general Terms in any conflict.
        </LegalNote>
        <p>
          Proposals issued by Yantrix Labs are valid for 14 days from their issue date unless
          otherwise stated. A project begins only once both parties have confirmed scope in writing
          — including by email or messaging platform — and the agreed deposit has been received.
        </p>
        <p>
          Verbal discussions, informal calls, and preliminary conversations do not constitute
          binding commitments. What we have agreed in writing is what we have agreed.
        </p>
      </LegalSection>

      {/* 06 */}
      <LegalSection id="pricing" number="06" title="Pricing, Deposits & Milestone Billing">
        <p>
          All pricing is stated in Indian Rupees (INR) unless otherwise agreed in writing, and
          is exclusive of applicable taxes. GST and any other applicable levies will be charged
          at the prevailing rate at the time of invoicing.
        </p>
        <p>
          Our standard billing structure is milestone-based:
        </p>
        <LegalList>
          <LegalListItem>
            <strong className="text-foreground font-medium">Deposit (non-refundable once work begins).</strong>{" "}
            Typically 40–50% of total project value, due before any work starts. This reflects
            reservation of our team&apos;s capacity and is not a retainer against future work.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Milestone payments.</strong>{" "}
            Further payments tied to deliverable milestones, as specified in your project agreement.
          </LegalListItem>
          <LegalListItem>
            <strong className="text-foreground font-medium">Final payment.</strong>{" "}
            The remaining balance is due before handover of final files, access credentials, or
            live deployment. We do not transfer ownership of deliverables until this is settled.
          </LegalListItem>
        </LegalList>
        <p>
          Invoices are payable within the period stated on the invoice. Overdue payments may
          result in project work being paused until the account is current. We reserve the right
          to charge a late fee of 1.5% per month on overdue amounts, or as otherwise specified
          in the project agreement.
        </p>
      </LegalSection>

      {/* 07 */}
      <LegalSection id="client-responsibilities" number="07" title="Client Responsibilities">
        <p>
          We build at the pace the project allows, and that pace depends on you as much as us.
          By engaging Yantrix Labs, you agree to:
        </p>
        <LegalList>
          <LegalListItem>Provide accurate briefs, content, branding assets, and feedback in a timely manner</LegalListItem>
          <LegalListItem>Designate a clear point of contact with authority to approve decisions on your behalf</LegalListItem>
          <LegalListItem>Respond to review and approval requests within agreed timeframes</LegalListItem>
          <LegalListItem>Ensure that content, images, data, and trademarks you supply are legally yours to use and do not infringe third-party rights</LegalListItem>
          <LegalListItem>Provide necessary platform access — credentials, hosting details, APIs — in a timely and secure manner</LegalListItem>
          <LegalListItem>Notify us promptly if your requirements change materially during the project</LegalListItem>
        </LegalList>
        <p>
          Delays caused by your failure to fulfil these responsibilities may affect timelines
          and could result in additional costs. Where this occurs, we will communicate the
          impact and seek your written agreement before proceeding.
        </p>
      </LegalSection>

      {/* 08 */}
      <LegalSection id="timelines" number="08" title="Timelines, Delays & Dependencies">
        <p>
          Project timelines are estimates, prepared in good faith based on the scope agreed at
          the time of the proposal. They can shift — and we will tell you when that happens.
        </p>
        <p>
          Common factors that affect timelines include delayed feedback or approvals from your
          side, incomplete or late content delivery, scope changes, or disruptions from external
          dependencies (third-party APIs, hosting providers, domain registrars, and similar).
        </p>
        <p>
          Yantrix Labs will communicate schedule changes proactively. We are not liable for
          delays caused by circumstances outside our reasonable control, including client-side
          delays. Where scope changes materially affect the timeline, we will provide a revised
          estimate before continuing.
        </p>
      </LegalSection>

      {/* 09 */}
      <LegalSection id="revisions" number="09" title="Revisions & Change Requests">
        <p>
          Each project proposal specifies the number of revision rounds included in the agreed
          price. Revisions within this scope are addressed at no additional cost.
        </p>
        <LegalNote>
          A <strong>revision</strong> refines an existing agreed deliverable. A <strong>change
          request</strong> introduces new requirements, additional pages or features, or
          substantially alters the original brief. We will always clarify the distinction before
          any extra work begins, and quote additional cost and time in writing.
        </LegalNote>
        <p>
          We do not proceed on change requests until you have approved the additional scope and
          cost in writing. This protects both parties.
        </p>
      </LegalSection>

      {/* 10 */}
      <LegalSection id="ip" number="10" title="Intellectual Property">
        <p>
          <strong className="text-foreground font-medium">Custom deliverables.</strong>{" "}
          Upon receipt of full payment, Yantrix Labs transfers to you ownership of all bespoke
          code, designs, and content created specifically for your project, subject to the
          open-source and third-party licences described in Section 11.
        </p>
        <p>
          <strong className="text-foreground font-medium">Studio IP.</strong>{" "}
          Yantrix Labs retains ownership of all pre-existing intellectual property — proprietary
          frameworks, internal libraries, templates, methodologies, and tools — developed
          independently and used across multiple engagements. You receive a non-exclusive licence
          to use these as embedded components of your deliverables.
        </p>
        <p>
          <strong className="text-foreground font-medium">Portfolio rights.</strong>{" "}
          Unless you explicitly request otherwise in writing before the project begins, we
          reserve the right to include the completed project in our portfolio and case studies.
          We will not disclose confidential commercial information in doing so.
        </p>
      </LegalSection>

      {/* 11 */}
      <LegalSection id="third-party" number="11" title="Third-Party Tools & Open Source">
        <p>
          Most of what we build incorporates open-source software (React, Next.js, PostgreSQL,
          and others) as well as third-party APIs, hosted services, and SaaS tools. These
          components are governed by their own licences and terms of service — which are
          independent of Yantrix Labs and may change without notice.
        </p>
        <p>
          We document significant third-party dependencies in each project proposal. However,
          we are not responsible for changes, pricing increases, outages, or discontinuation
          of third-party services after your project is delivered.
        </p>
        <p>
          Where a project involves ongoing third-party subscriptions — hosting plans, API
          keys, SaaS accounts — responsibility for those subscriptions transfers to you at
          handover. We will clearly flag this in the relevant project agreement.
        </p>
      </LegalSection>

      {/* 12 */}
      <LegalSection id="confidentiality" number="12" title="Confidentiality">
        <p>
          Both parties agree to hold in confidence any non-public information exchanged during
          a project — including business strategies, financial details, technical specifications,
          client data, and pricing — and not to disclose it to third parties without prior
          written consent, except where required by law.
        </p>
        <p>
          This obligation survives the end of any project or working relationship. We will not
          use your confidential information for any purpose beyond delivering the agreed services.
        </p>
      </LegalSection>

      {/* 13 */}
      <LegalSection id="acceptable-use" number="13" title="Acceptable Use & Prohibited Conduct">
        <p>
          When using this website or engaging our services, you agree not to:
        </p>
        <LegalList>
          <LegalListItem>Attempt to gain unauthorised access to any part of this website, our systems, or any client systems</LegalListItem>
          <LegalListItem>Submit false, misleading, or fraudulent information in any form or inquiry</LegalListItem>
          <LegalListItem>Engage our services to build, distribute, or promote illegal content, harmful software, or deceptive applications</LegalListItem>
          <LegalListItem>Violate any applicable law or regulation, or infringe the rights of any third party</LegalListItem>
          <LegalListItem>Conduct yourself in a way that would damage our studio, our team, or our relationships with other clients</LegalListItem>
        </LegalList>
        <p>
          Violation of this section may result in immediate termination of the engagement,
          forfeiture of any deposit paid, and legal action where appropriate.
        </p>
      </LegalSection>

      {/* 14 */}
      <LegalSection id="studio-ip" number="14" title="Website Content & Studio IP">
        <p>
          All content on this website — text, visual design, code, animations, logos, and
          brand assets — is the intellectual property of Yantrix Labs, protected under
          applicable Indian copyright and IP law. You may not reproduce, adapt, or distribute
          any of it without our written permission.
        </p>
        <p>
          The Yantrix Labs name, wordmark, and brand elements are proprietary. Use of them in
          any commercial or promotional context without our consent is prohibited.
        </p>
      </LegalSection>

      {/* 15 */}
      <LegalSection id="warranties" number="15" title="Disclaimer of Warranties">
        <p>
          This website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We make no
          warranties — express or implied — regarding its accuracy, completeness, uptime, or
          freedom from errors or harmful code.
        </p>
        <p>
          In relation to services: we warrant that we will perform with reasonable skill and
          care. All other warranties, whether express or implied — including those of
          merchantability, fitness for a particular purpose, or non-infringement — are
          excluded to the fullest extent permitted by law.
        </p>
        <p>
          We do not guarantee specific business outcomes from any system or website we deliver.
          Outcomes depend on many factors outside our control, including how you use what we build.
        </p>
      </LegalSection>

      {/* 16 */}
      <LegalSection id="liability" number="16" title="Limitation of Liability">
        <LegalNote>
          To the fullest extent permitted under applicable law, Yantrix Labs&apos; total aggregate
          liability for any claim arising from these Terms or any project engagement shall not
          exceed the total fees paid by you for the specific service giving rise to that claim.
        </LegalNote>
        <p>
          We are not liable for indirect, incidental, consequential, punitive, or special
          damages — including loss of revenue, loss of data, loss of business opportunity, or
          reputational harm — even if we were advised such losses were possible.
        </p>
        <p>
          Nothing in these Terms limits liability for fraud, death or personal injury caused by
          negligence, or any other liability that cannot be excluded under applicable law.
        </p>
      </LegalSection>

      {/* 17 */}
      <LegalSection id="indemnification" number="17" title="Indemnification">
        <p>
          You agree to indemnify and hold harmless Yantrix Labs, its principals, employees, and
          contractors from any claims, liabilities, losses, and costs — including reasonable
          legal fees — arising out of:
        </p>
        <LegalList>
          <LegalListItem>Your breach of these Terms or any project agreement</LegalListItem>
          <LegalListItem>Your use of this website or our services in a manner not permitted herein</LegalListItem>
          <LegalListItem>Content, data, or materials you provided that infringe third-party rights or violate applicable law</LegalListItem>
        </LegalList>
      </LegalSection>

      {/* 18 */}
      <LegalSection id="termination" number="18" title="Suspension & Termination">
        <p>
          Either party may terminate a project engagement in writing if the other party
          materially breaches these Terms or a project agreement and fails to remedy the breach
          within 14 days of written notice.
        </p>
        <p>
          If you terminate without cause, you remain liable for all work completed to the date
          of termination, plus any non-recoverable third-party costs incurred on your behalf.
          The non-refundable deposit is not recoverable under any circumstance once work has begun.
        </p>
        <p>
          Yantrix Labs reserves the right to suspend website access without prior notice where
          we have reasonable grounds to believe a user is in breach of these Terms.
        </p>
      </LegalSection>

      {/* 19 */}
      <LegalSection id="force-majeure" number="19" title="Force Majeure">
        <p>
          Neither party is liable for delays or failures in performance caused by events beyond
          their reasonable control — including acts of God, natural disasters, government
          actions, internet infrastructure failures, pandemics, or civil unrest.
        </p>
        <p>
          The affected party must notify the other promptly and resume performance as soon as
          practicable. Prolonged force majeure events lasting more than 30 days may give either
          party the right to terminate the affected engagement in writing.
        </p>
      </LegalSection>

      {/* 20 */}
      <LegalSection id="governing-law" number="20" title="Governing Law & Jurisdiction">
        <p>
          These Terms are governed by and construed in accordance with the laws of India. Any
          dispute arising from these Terms or any project engagement shall be subject to the
          exclusive jurisdiction of the courts in Jaipur, Rajasthan.
        </p>
        <p>
          Before initiating any formal proceedings, both parties agree to make a genuine effort
          to resolve disputes through direct negotiation.
        </p>
      </LegalSection>

      {/* 21 */}
      <LegalSection id="updates" number="21" title="Updates to These Terms">
        <p>
          We update these Terms when our services, legal environment, or practices change. The
          effective date at the top of this page reflects the most recent version. For active
          clients with signed agreements, we will notify you directly of any material changes.
        </p>
        <p>
          Continued use of the website after an update is published constitutes acceptance of
          the revised Terms.
        </p>
      </LegalSection>

      {/* 22 */}
      <LegalSection id="contact" number="22" title="Contact Information">
        <p>
          For questions or clarifications about these Terms, contact us:
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
        </div>
      </LegalSection>
    </LegalPageLayout>
  );
}
