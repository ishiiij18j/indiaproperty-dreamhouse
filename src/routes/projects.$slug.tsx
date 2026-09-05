import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, BedDouble, Bath, Ruler, ShieldCheck, CalendarDays } from "lucide-react";
import { propertiesQuery, propertyQuery } from "@/lib/queries";
import { formatArea, formatINR, imageFor } from "@/lib/estate";
import { EnquiryForm } from "@/components/enquiry-form";
import { PropertyCard } from "@/components/property-card";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ context, params }) => {
    const property = await context.queryClient.ensureQueryData(propertyQuery(params.slug));
    if (!property) throw notFound();
    await context.queryClient.ensureQueryData(propertiesQuery);
    return { name: property.name, locality: property.locality, city: property.city };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Residence not found — Ananta Estates" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name}, ${loaderData.locality} — Ananta Estates`;
    const description = `${loaderData.name} in ${loaderData.locality}, ${loaderData.city}. RERA-registered luxury residence with verified title and carpet area.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { slug } = Route.useParams();
  const { data: property } = useSuspenseQuery(propertyQuery(slug));
  const { data: all } = useSuspenseQuery(propertiesQuery);

  if (!property) return null;

  const similar = all.filter((p) => p.slug !== property.slug && p.city === property.city).slice(0, 3);

  const facts = [
    { icon: Ruler, label: "Carpet area", value: formatArea(property.carpet_area_sqft) },
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms > 0 ? `${property.bedrooms} BHK` : "Plot" },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms > 0 ? String(property.bathrooms) : "—" },
    { icon: CalendarDays, label: "Possession", value: property.possession ?? "On request" },
    { icon: ShieldCheck, label: "RERA", value: property.rera_number ?? "Applied for" },
  ];

  return (
    <>
      <div className="relative isolate h-[62vh] overflow-hidden">
        <img
          src={imageFor(property.image_key)}
          alt={`${property.name} in ${property.locality}, ${property.city}`}
          width={1280}
          height={960}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 lg:px-10">
          <Link to="/projects" className="eyebrow inline-flex items-center gap-2 hover:text-primary">
            <ArrowLeft className="size-3" /> All projects
          </Link>
          <h1 className="display-lg mt-4">{property.name}</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {property.locality} · {property.city} · {property.property_type}
          </p>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <div>
          <p className="font-display text-4xl text-primary">{formatINR(property.price_inr)}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {property.status === "sold" ? "Sold out" : "All inclusive, excluding stamp duty & GST"}
          </p>

          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{property.description}</p>

          <dl className="mt-10 grid gap-px border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="bg-background p-6">
                <f.icon className="size-4 text-primary" />
                <dt className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="display-lg mt-14 text-3xl">Amenities</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {property.amenities.map((a) => (
              <li key={a} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="size-1.5 bg-primary" />
                {a}
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit lg:sticky lg:top-28">
          <div className="surface-panel p-7">
            <h2 className="text-2xl">Schedule a site visit</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              An advisor for {property.city} will confirm your slot on WhatsApp.
            </p>
            <div className="mt-6">
              <EnquiryForm compact propertyId={property.id} propertyName={property.name} />
            </div>
          </div>
        </aside>
      </section>

      {similar.length > 0 && (
        <section className="border-t border-border/60 bg-card">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
            <p className="eyebrow">Also in {property.city}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
