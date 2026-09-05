import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import ctaImg from "@/assets/cta.jpg";
import { propertiesQuery } from "@/lib/queries";
import { PropertyCard } from "@/components/property-card";
import { EnquiryForm } from "@/components/enquiry-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ananta Estates — Luxury Homes Across India" },
      {
        name: "description",
        content:
          "Handpicked RERA-registered apartments, villas, penthouses and plots in Mumbai, Delhi, Bengaluru, Pune, Hyderabad and Goa.",
      },
      { property: "og:title", content: "Ananta Estates — Luxury Homes Across India" },
      {
        property: "og:description",
        content: "Handpicked RERA-registered residences in India's finest addresses.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(propertiesQuery),
  component: Home,
});

const services = [
  { title: "Residential Sales", copy: "Curated primary and resale inventory in India's prime micro-markets." },
  { title: "Home Loans", copy: "Sanctioned rates from leading Indian banks and NBFCs, arranged in-house." },
  { title: "Legal & RERA", copy: "Title diligence, RERA verification, stamp duty and registration handled end to end." },
  { title: "NRI Advisory", copy: "Repatriation, FEMA compliance and remote possession for NRI buyers." },
];

const steps = [
  { n: "01", title: "Discovery", copy: "We map your budget, locality and possession timeline." },
  { n: "02", title: "Shortlist", copy: "A curated set of 4–6 residences with honest comparisons." },
  { n: "03", title: "Site Visits", copy: "Chauffeured visits, including weekend and evening slots." },
  { n: "04", title: "Diligence", copy: "RERA, title, approvals and society dues verified in writing." },
  { n: "05", title: "Handover", copy: "Registration, loan disbursal and keys — we stay till you move in." },
];

function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury hillside villa above the Western Ghats at dusk"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 lg:px-10">
          <p className="eyebrow">Mumbai · Delhi NCR · Bengaluru · Pune · Hyderabad · Goa</p>
          <h1 className="display-xl mt-6 max-w-4xl">
            Homes that hold their
            <br />
            value. <span className="text-primary">And their calm.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Ananta Estates represents a small, deliberate portfolio of RERA-registered residences
            across India — verified titles, honest pricing and advisors who stay past registration.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 bg-primary px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground"
            >
              Explore projects <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-border px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-foreground hover:border-primary hover:text-primary"
            >
              Book a site visit
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">About us</p>
            <h2 className="display-lg mt-5">
              Twelve years. Six cities.
              <br />
              One standard.
            </h2>
          </div>
          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              We began in 2013 with a single sea-facing tower in Bandra and a simple rule: never
              recommend a home we would not buy ourselves. Today that rule filters every project we
              list, from Lutyens penthouses to Alibaug plots.
            </p>
            <p>
              Every listing carries its RERA number, carpet-area figures as defined by the Act, and
              a written diligence note before you pay a rupee of token money.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary">
              Read our story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-border/60 pt-12 md:grid-cols-4">
          {[
            ["₹4,200 Cr", "Homes transacted"],
            ["1,180+", "Families settled"],
            ["6", "Cities covered"],
            ["100%", "RERA verified"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-display text-4xl text-primary">{value}</dt>
              <dd className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="display-lg mt-4">Featured residences</h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-primary">
              View all projects <ArrowRight className="size-4" />
            </Link>
          </div>
          <Suspense fallback={<p className="mt-12 text-sm text-muted-foreground">Loading…</p>}>
            <FeaturedGrid />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <p className="eyebrow">Services</p>
        <h2 className="display-lg mt-4 max-w-xl">From first viewing to final registration.</h2>
        <div className="mt-14 grid gap-px border border-border/60 bg-border/60 md:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="bg-background p-8">
              <h3 className="text-xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <p className="eyebrow">Process</p>
          <h2 className="display-lg mt-4">A collaborative journey.</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="font-display text-3xl text-primary">{s.n}</span>
                <h3 className="mt-3 text-xs uppercase tracking-[0.2em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img
          src={ctaImg}
          alt="Aerial view of a lit Indian residential township at night"
          loading="lazy"
          width={1920}
          height={900}
          className="absolute inset-0 -z-10 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-background/70" />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow">Let's begin</p>
            <h2 className="display-lg mt-4">Tell us what home means to you.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Share your requirement and an advisor will call within one working day with a
              shortlist — no spam, no call-centre follow-ups.
            </p>
          </div>
          <div className="surface-panel p-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedGrid() {
  const { data } = useSuspenseQuery(propertiesQuery);
  const featured = data.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {featured.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
