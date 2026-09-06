import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ananta Estates — Our Story" },
      {
        name: "description",
        content:
          "Since 2013 Ananta Estates has advised Indian and NRI families on luxury homes across six cities, with RERA-verified diligence on every listing.",
      },
      { property: "og:title", content: "About Ananta Estates — Our Story" },
      {
        property: "og:description",
        content: "A twelve-year-old Indian property advisory built on verified titles and honest pricing.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Verified first", copy: "RERA number, title chain and approvals checked before a listing goes live." },
  { title: "No pressure", copy: "We work on fixed advisory terms, so nobody is pushing inventory at you." },
  { title: "Local depth", copy: "Advisors who live in the micro-market they sell — Bandra, Koregaon Park, Whitefield." },
  { title: "Stay past keys", copy: "Society transfer, utility changes and interiors introductions after handover." },
];

const team = [
  { name: "Aditya Rao", role: "Founder & Principal Advisor", city: "Mumbai" },
  { name: "Meera Nair", role: "Head of Diligence", city: "Bengaluru" },
  { name: "Rohan Kapoor", role: "NRI Desk", city: "Delhi NCR" },
  { name: "Sanya Deshpande", role: "Client Experience", city: "Pune" },
];

function AboutPage() {
  return (
    <>
      <header className="border-b border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <p className="eyebrow">About</p>
          <h1 className="display-lg mt-4 max-w-3xl">
            Designing with purpose. Advising with respect.
          </h1>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <img
          src={founderImg}
          alt="Aditya Rao, founder of Ananta Estates"
          loading="lazy"
          width={900}
          height={1100}
          className="w-full object-cover"
        />
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p className="eyebrow">Founder's note</p>
          <p className="font-display text-3xl leading-snug text-foreground">
            "A home in India is bought once in a generation. It deserves more than a brochure."
          </p>
          <p>
            I spent my first six years selling towers for developers and watched families sign
            agreements they had never read. Ananta began in 2013 as the opposite of that: a small
            advisory that represents the buyer, reads every clause, and says no more often than yes.
          </p>
          <p>
            Today our team of eighteen works across Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad and
            Goa. We have closed over ₹4,200 crore of homes and, more importantly, walked away from
            projects worth twice that because the paperwork did not hold.
          </p>
          <p className="text-foreground">— Aditya Rao, Founder</p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-primary">
            Talk to our team <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <p className="eyebrow">What we hold to</p>
          <div className="mt-10 grid gap-px bg-border/60 md:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="bg-card p-8">
                <h2 className="text-xl">{v.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <p className="eyebrow">The team</p>
        <h2 className="display-lg mt-4">People you will actually meet.</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <div key={t.name} className="border-t border-border/60 pt-6">
              <h3 className="text-xl">{t.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t.role}
              </p>
              <p className="mt-3 text-sm text-primary">{t.city}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
