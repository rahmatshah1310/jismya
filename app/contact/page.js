import ContactForm from "@/app/contact/contact-form";

export const metadata = {
  title: "Contact Us | User.pk",
  description: "Get in touch with User.pk customer support. We're here to help with any questions or concerns.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ContactForm />
    </div>
  );
}
