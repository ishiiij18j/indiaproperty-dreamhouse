import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { formatArea, formatINR, imageFor, type Property } from "@/lib/estate";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: property.slug }}
      className="group block overflow-hidden border border-border/60 bg-card transition-colors hover:border-primary/60"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={imageFor(property.image_key)}
          alt={`${property.name}, ${property.locality}, ${property.city}`}
          loading="lazy"
          width={1280}
          height={960}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-background/80 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary">
          {property.status === "sold" ? "Sold out" : property.property_type}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-2xl">{property.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {property.locality} · {property.city}
        </p>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-lg text-primary">{formatINR(property.price_inr)}</p>
            <p className="text-xs text-muted-foreground">
              {property.bedrooms > 0 ? `${property.bedrooms} BHK · ` : ""}
              {formatArea(property.carpet_area_sqft)}
            </p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}
