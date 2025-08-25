import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contact Us | User.pk",
  description: "Get in touch with User.pk customer support. We're here to help with any questions or concerns.",
};

export default function ContactPage() {
  return (
    <div className="container-custom py-20">
      <ContactForm />
    </div>
  );
}
