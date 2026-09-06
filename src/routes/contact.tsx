import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ananta Estates — Book a Site Visit" },
      {
        name: "description",
        content:
          "Call, WhatsApp or write to Ananta Estates. Offices in Mumbai, Bengaluru and Gurugram; site visits across six Indian cities.",
      },
      { property: "og:title", content: "Contact Ananta Estates — Book a Site Visit" },
      {
        property: "og:description",
        content: "Share your requirement and an advisor calls within one working day.",
      },
    ],
  }),
  component: ContactPage,
});

const offices = [
  {
    city: "Mumbai",
    address: "Ananta House, 12 Altamount Road, Cumballa Hill, Mumbai 400026",
    phone: "+91 22 6600 1200",
  },
  {
    city: "Bengaluru",
    address: "4th Floor, Prestige Trade Tower, Palace Road, Bengaluru 560001",
    phone: "+91 80 4718 2200",
  },
  {
    city: "Gurugram",
    address: "Unit 902, Two Horizon Centre, Golf Course Road, Gurugram 122002",
    phone: "+91 124 470 3300",
  },
];

function ContactPage() {
  return (
    <>
      <header className="border-b border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <p className="eyebrow">Contact</p>
          <h1 className="display-lg mt-4 max-w-2xl">Start a conversation.</h1>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        <div className="space-y-8">
          <div className="space-y-4 text-sm text-muted-foreground">
            <a href="tel:+912266001200" className="flex items-center gap-4 hover:text-primary">
              <Phone className="size-4 text-primary" /> +91 22 6600 1200
            </a>
            <a
              href="https://wa.me/919820011200"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 hover:text-primary"
            >
              <Phone className="size-4 text-primary" /> WhatsApp +91 98200 11200
            </a>
            <a href="mailto:homes@anantaestates.in" className="flex items-center gap-4 hover:text-primary">
              <Mail className="size-4 text-primary" /> homes@anantaestates.in
            </a>
            <p className="flex items-center gap-4">
              <Clock className="size-4 text-primary" /> Mon–Sat, 10:00–19:00 IST
            </p>
          </div>

          <div className="grid gap-px bg-border/60">
            {offices.map((o) => (
              <div key={o.city} className="bg-background p-6">
                <h2 className="flex items-center gap-3 text-xl">
                  <MapPin className="size-4 text-primary" /> {o.city}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.address}</p>
                <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-2 block text-sm text-primary">
                  {o.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel h-fit p-8">
          <h2 className="text-2xl">Request a callback</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us your city, budget and timeline. An advisor responds within one working day.
          </p>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
