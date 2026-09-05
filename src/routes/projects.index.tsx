import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useMemo, useState } from "react";
import { propertiesQuery } from "@/lib/queries";
import { PropertyCard } from "@/components/property-card";
import { CITIES, TYPES } from "@/lib/estate";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Luxury Homes in India | Ananta Estates" },
      {
        name: "description",
        content:
          "Browse RERA-registered apartments, villas, penthouses and plots in Mumbai, Delhi, Bengaluru, Pune, Hyderabad and Goa.",
      },
      { property: "og:title", content: "Projects — Luxury Homes in India | Ananta Estates" },
      {
        property: "og:description",
        content: "Filter our curated Indian residences by city, type and budget.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(propertiesQuery),
  component: ProjectsPage,
});

const SORTS = [
  { key: "price-desc", label: "Price: high to low" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "area-desc", label: "Largest first" },
] as const;

function ProjectsPage() {
  return (
    <>
      <header className="border-b border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <p className="eyebrow">Projects</p>
          <h1 className="display-lg mt-4 max-w-2xl">
            Every address here has been walked, checked and verified.
          </h1>
        </div>
      </header>
      <Suspense
        fallback={<p className="mx-auto max-w-7xl px-5 py-20 text-sm text-muted-foreground">Loading…</p>}
      >
        <ProjectsList />
      </Suspense>
    </>
  );
}

function ProjectsList() {
  const { data } = useSuspenseQuery(propertiesQuery);
  const [city, setCity] = useState<string>("All cities");
  const [type, setType] = useState<string>("All types");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sort, setSort] = useState<string>("price-desc");

  const results = useMemo(() => {
    const list = data.filter(
      (p) =>
        (city === "All cities" || p.city === city) &&
        (type === "All types" || p.property_type === type) &&
        p.price_inr <= maxPrice * 10000000,
    );
    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price_inr - b.price_inr;
      if (sort === "area-desc") return b.carpet_area_sqft - a.carpet_area_sqft;
      return b.price_inr - a.price_inr;
    });
  }, [data, city, type, maxPrice, sort]);

  const select =
    "w-full border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none";

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
      <div className="grid gap-5 border border-border/60 bg-card p-6 md:grid-cols-4">
        <div>
          <label htmlFor="f-city" className="eyebrow">
            City
          </label>
          <select id="f-city" className={`${select} mt-2`} value={city} onChange={(e) => setCity(e.target.value)}>
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-type" className="eyebrow">
            Property type
          </label>
          <select id="f-type" className={`${select} mt-2`} value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-price" className="eyebrow">
            Budget up to ₹{maxPrice} Cr
          </label>
          <input
            id="f-price"
            type="range"
            min={1}
            max={500}
            step={1}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-5 w-full accent-primary"
          />
        </div>
        <div>
          <label htmlFor="f-sort" className="eyebrow">
            Sort by
          </label>
          <select id="f-sort" className={`${select} mt-2`} value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {results.length} {results.length === 1 ? "residence" : "residences"}
        </p>
        <button
          type="button"
          onClick={() => {
            setCity("All cities");
            setType("All types");
            setMaxPrice(500);
            setSort("price-desc");
          }}
          className="text-xs uppercase tracking-[0.2em] text-primary"
        >
          Reset filters
        </button>
      </div>

      {results.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No residences match these filters yet. Try widening your budget or city.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </section>
  );
}
