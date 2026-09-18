/**
 * Sample legal page content for Paramount Club.
 * Review with counsel before publishing as final policy text.
 */

import { CONTACT, SITE_NAME, SITE_LOCATION } from "@/lib/site";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export const privacyPageContent = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  subtitle:
    "How Paramount Club collects, uses, and protects information you share with us.",
  updated: "18 September 2026",
  intro:
    "This Privacy Policy explains how Paramount Club (“we”, “us”, or “our”) handles personal information when you visit our website, enquire about dates, subscribe to updates, or contact our team. By using our website or submitting an enquiry, you agree to the practices described here.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        `${SITE_NAME} is a luxury wedding and events venue based in ${SITE_LOCATION.city}, ${SITE_LOCATION.region}, ${SITE_LOCATION.country}.`,
        `Our venue address is ${CONTACT.address}. For privacy questions, please call us on ${CONTACT.phone} or visit our Contact page.`,
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "We collect information you choose to provide and limited technical data needed to operate the website.",
      ],
      bullets: [
        "Enquiry details — name, email, phone number, preferred dates, celebration type, guest estimates, catering and stage preferences, and any notes you include.",
        "Newsletter interest — email address and consent when you join our community list.",
        "Contact messages — details you send through our contact form or other direct communication.",
        "Technical data — browser type, device information, approximate location derived from IP address, and pages visited, collected through standard web logs and analytics where enabled.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: [
        "We use personal information only for legitimate business purposes related to hosting and supporting your celebration enquiry.",
      ],
      bullets: [
        "To respond to date requests and confirm availability with our managers.",
        "To discuss packages, stage direction, catering, and facilities.",
        "To send updates you have consented to receive.",
        "To improve our website experience and measure interest in our services.",
        "To protect our venue, guests, and systems against misuse or fraud.",
      ],
    },
    {
      heading: "Sharing of information",
      paragraphs: [
        "We do not sell your personal information. We may share limited details with trusted service providers who help us operate (for example, email delivery or hosting), and only as needed to fulfil your request or comply with law.",
        "If you book an event, relevant details may be shared internally with our operations, hospitality, and management teams.",
      ],
    },
    {
      heading: "Data retention",
      paragraphs: [
        "We keep enquiry and contact records for as long as needed to manage your request and for reasonable business, legal, or accounting purposes. Newsletter details are kept until you unsubscribe or ask us to remove them.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You may ask us to update or delete information we hold about you, withdraw newsletter consent, or request a copy of the details associated with your enquiry, subject to applicable law.",
        `To make a request, contact us on ${CONTACT.phone} or through our Contact page.`,
      ],
    },
    {
      heading: "Cookies and similar technologies",
      paragraphs: [
        "Our website may use essential cookies required for basic functionality and optional analytics cookies to understand how visitors use the site. You can control cookies through your browser settings.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "We take reasonable technical and organisational measures to protect personal information. No online transmission or storage method is completely secure, so we encourage you to share only what is necessary for your enquiry.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "Our website and enquiry services are intended for adults arranging celebrations. We do not knowingly collect personal information from children.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when revisions are published. Continued use of the website after updates means you accept the revised policy.",
      ],
    },
  ] satisfies LegalSection[],
};

export const termsPageContent = {
  eyebrow: "Legal",
  title: "Terms and Conditions",
  subtitle:
    "The terms that guide use of the Paramount Club website and enquiry process.",
  updated: "18 September 2026",
  intro:
    "These Terms and Conditions (“Terms”) govern your use of the Paramount Club website and any date, package, or venue enquiry submitted through it. By accessing the site or submitting a request, you agree to these Terms.",
  sections: [
    {
      heading: "About Paramount Club",
      paragraphs: [
        `${SITE_NAME} is an events venue in ${SITE_LOCATION.city}, Pakistan, offering spaces and hospitality for weddings, Mehndi, Walima, engagements, birthdays, corporate gatherings, and private celebrations.`,
        "Website content is provided for information and enquiry purposes. It does not itself create a confirmed booking.",
      ],
    },
    {
      heading: "Website use",
      paragraphs: [
        "You agree to use this website lawfully and respectfully. You must not attempt to disrupt the site, misuse forms, submit false information, scrape content at scale, or infringe intellectual property belonging to Paramount Club or others.",
      ],
    },
    {
      heading: "Enquiries and availability",
      paragraphs: [
        "Date requests submitted through our Check Your Date flow or contact channels are enquiries only. Availability shown on the calendar is indicative and for guidance. Final confirmation is always provided personally by our managers.",
        "Selecting dates, celebration types, stage preferences, or packages online does not reserve the venue until our team confirms in writing and any required agreements or deposits are completed.",
      ],
    },
    {
      heading: "Pricing and packages",
      paragraphs: [
        "Package descriptions, guest ranges, décor directions, and facility notes on the website are illustrative. Exact pricing, inclusions, and terms are confirmed during consultation and may vary based on date, season, guest count, catering arrangements, and selected services.",
      ],
    },
    {
      heading: "Bookings and events",
      paragraphs: [
        "If you proceed to book Paramount Club, a separate event agreement or confirmation will set out deposit amounts, payment schedules, cancellation rules, house policies, and responsibilities for décor, catering, entertainment, and guest conduct.",
        "These website Terms do not replace that event agreement.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "All branding, photography, video, text, and design on this website belong to Paramount Club or its licensors. You may view and share links for personal, non-commercial purposes. You may not copy, reproduce, or reuse our media or brand assets without prior written permission.",
      ],
    },
    {
      heading: "Third-party links",
      paragraphs: [
        "Our website may link to third-party services such as Google Maps, Facebook, or Instagram. We are not responsible for the content, privacy practices, or availability of those external sites.",
      ],
    },
    {
      heading: "Disclaimer",
      paragraphs: [
        "The website is provided on an “as available” basis. While we aim for accuracy, we do not warrant that all information is complete, current, or free from error. Venue images and stage designs are representative and may differ from the final setup of your event.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by applicable law, Paramount Club is not liable for indirect, incidental, or consequential losses arising from use of this website or reliance on online content. Nothing in these Terms excludes liability that cannot be excluded under Pakistani law.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        `These Terms are governed by the laws of ${SITE_LOCATION.country}. Any dispute arising from website use or online enquiries shall be subject to the competent courts of ${SITE_LOCATION.city}, unless a confirmed event agreement states otherwise.`,
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `For questions about these Terms, contact Paramount Club at ${CONTACT.address}, phone ${CONTACT.phone}, or through our Contact page.`,
      ],
    },
  ] satisfies LegalSection[],
};
