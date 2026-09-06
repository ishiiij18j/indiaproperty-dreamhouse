import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Home Loans, RERA Diligence & NRI Advisory | Ananta Estates" },
      {
        name: "description",
        content:
          "Residential sales, home loan arrangement, RERA and title diligence, registration support, NRI advisory and property management across India.",
      },
      { property: "og:title", content: "Services | Ananta Estates" },
      {
        property: "og:description",
        content: "Everything from first viewing to registration and property management in India.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    title: "Residential Sales",
    copy: "Primary launches and resale homes in prime micro-markets, with true carpet-area comparisons and honest per-sq-ft benchmarks for the locality.",
    points: ["Curated shortlists", "Developer negotiation", "Allotment & agreement support"],
  },
  {
    n: "02",
    title: "Home Loan Desk",
    copy: "Pre-approved offers from HDFC, SBI, ICICI, Axis and leading NBFCs, compared on effective rate rather than headline rate.",
    points: ["Eligibility assessment", "Rate comparison", "Disbursal coordination"],
  },
  {
    n: "03",
    title: "Legal & RERA Diligence",
    copy: "Title chain, encumbrance certificate, RERA registration, OC/CC status and society dues verified in a written note before token money.",
    points: ["Title search", "RERA verification", "Agreement vetting"],
  },
  {
    n: "04",
    title: "Registration & Stamp Duty",
    copy: "Stamp duty computation, e-registration appointments and sub-registrar accompaniment in every city we operate in.",
    points: ["Stamp duty calculation", "e-Registration slots", "Franking & handover"],
  },
  {
    n: "05",
    title: "NRI Advisory",
    copy: "FEMA-compliant purchase structuring, NRE/NRO fund flow, power of attorney drafting and remote possession for buyers abroad.",
    points: ["FEMA compliance", "PoA drafting", "Repatriation planning"],
  },
  {
    n: "06",
    title: "Property Management",
    copy: "Tenanting, rent collection, maintenance and annual compliance for owners who live in another city or country.",
    points: ["Tenant screening", "Rent & dues", "Upkeep visits"],
  },
];

function ServicesPage() {
  return (
    <>
      <header className="border-b border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <p className="eyebrow">Services</p>
          <h1 className="display-lg mt-4 max-w-3xl">
            From vision to registration — handled by one team.
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-px bg-border/60 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.n} className="bg-background p-8">
              <span className="font-display text-3xl text-primary">{s.n}</span>
              <h2 className="mt-4 text-2xl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="size-1 bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 bg-primary px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground"
          >
            Browse projects <ArrowRight className="size-4" />
          </Link>
          <a href="tel:+912266001200" className="text-sm text-muted-foreground hover:text-primary">
            Or call +91 22 6600 1200
          </a>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow">Fees, plainly</p>
            <h2 className="display-lg mt-4">No hidden brokerage.</h2>
            <ul className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>Buyer advisory: 1% of transaction value, payable on registration.</li>
              <li>Legal diligence: ₹35,000 per property, adjusted against advisory fee.</li>
              <li>Home loan desk: free — banks pay us, and we disclose exactly how much.</li>
              <li>Property management: 5% of annual rent, billed monthly.</li>
            </ul>
          </div>
          <div className="surface-panel p-8">
            <h2 className="text-2xl">Ask us anything</h2>
            <div className="mt-6">
              <EnquiryForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
