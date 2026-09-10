import { BRAND } from "./constants";

const addr = `${BRAND.address.line1}, ${BRAND.address.city}, ${BRAND.address.postcode}, ${BRAND.address.country}`;

export type Policy = {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

export const policies: Record<string, Policy> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "10 September 2026",
    sections: [
      { heading: "Who we are", body: [`${BRAND.name} ("we", "us") operates this website. Our registered address is ${addr}. You can contact us at ${BRAND.email}.`] },
      { heading: "Information we collect", body: ["We collect information you provide when you place an order, create an account, subscribe to our newsletter or contact us — such as your name, email, address and order details.", "We also collect limited technical data (e.g. cookies) to operate and improve the site."] },
      { heading: "How we use your information", body: ["To process and deliver your orders, provide customer support, send updates you've requested, and meet our legal obligations under UK GDPR."] },
      { heading: "Sharing", body: ["We share data only with service providers who help us run the store (e.g. hosting, payment and delivery partners) and only as needed."] },
      { heading: "Your rights", body: ["Under UK GDPR you have the right to access, correct, delete or restrict use of your personal data. Contact us to exercise these rights."] },
    ],
  },
  refund: {
    slug: "refund",
    title: "Refund Policy",
    updated: "10 September 2026",
    sections: [
      { heading: "30-day returns", body: ["We offer a 30-day returns window from the date you receive your order. Items must be unused and in their original packaging."] },
      { heading: "How to return", body: [`Contact us at ${BRAND.email} with your order number to start a return. We'll provide instructions.`] },
      { heading: "Refunds", body: ["Once we receive and inspect your return, we'll process your refund to the original payment method within 5–10 working days."] },
      { heading: "Faulty items", body: ["If an item is faulty or not as described, you are entitled to a repair, replacement or refund under the Consumer Rights Act 2015."] },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Service",
    updated: "10 September 2026",
    sections: [
      { heading: "Agreement", body: [`By using this website and placing an order you agree to these terms with ${BRAND.name}.`] },
      { heading: "Orders", body: ["All orders are subject to acceptance and availability. Prices include VAT; shipping is calculated at checkout. Payment processing is currently being integrated — orders are reserved and our team will contact you with payment details."] },
      { heading: "Pricing", body: ["We take care to ensure prices are accurate but reserve the right to correct errors."] },
      { heading: "Liability", body: ["Nothing in these terms limits your statutory rights as a consumer."] },
      { heading: "Governing law", body: ["These terms are governed by the laws of England and Wales."] },
    ],
  },
  shipping: {
    slug: "shipping",
    title: "Shipping Policy",
    updated: "10 September 2026",
    sections: [
      { heading: "Dispatch", body: ["We dispatch orders within 1 working day."] },
      { heading: "Delivery times & costs", body: ["Standard UK delivery is 2–3 working days. Orders over £50 qualify for free next-day delivery; otherwise a standard shipping fee applies at checkout."] },
      { heading: "Tracking", body: ["Order tracking is coming soon. Contact us with your order number for an update in the meantime."] },
      { heading: "International", body: ["We currently ship within the UK. International shipping is on our roadmap."] },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    updated: "10 September 2026",
    sections: [
      { heading: "What are cookies", body: ["Cookies are small text files stored on your device that help the site function and remember your preferences (such as your cart)."] },
      { heading: "How we use them", body: ["We use essential cookies to run the store and optional analytics cookies to understand how the site is used."] },
      { heading: "Managing cookies", body: ["You can control cookies through your browser settings. Disabling essential cookies may affect site functionality."] },
    ],
  },
};

export const policySlugs = Object.keys(policies);
