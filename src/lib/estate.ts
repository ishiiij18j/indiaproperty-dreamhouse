import hero from "@/assets/hero.jpg";
import prop1 from "@/assets/prop-1.jpg";
import prop2 from "@/assets/prop-2.jpg";
import prop3 from "@/assets/prop-3.jpg";

export const propertyImages: Record<string, string> = {
  hero,
  "prop-1": prop1,
  "prop-2": prop2,
  "prop-3": prop3,
};

export function imageFor(key: string) {
  return propertyImages[key] ?? prop1;
}

/** Indian-format price: ₹1.85 Cr / ₹85 L */
export function formatINR(value: number) {
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (value >= 100000) {
    const l = value / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(2)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatArea(sqft: number) {
  return `${sqft.toLocaleString("en-IN")} sq ft`;
}

export const CITIES = [
  "All cities",
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Goa",
] as const;

export const TYPES = ["All types", "Apartment", "Villa", "Penthouse", "Plot"] as const;

export const BUDGETS = [
  "Under ₹2 Cr",
  "₹2 Cr – ₹5 Cr",
  "₹5 Cr – ₹10 Cr",
  "₹10 Cr – ₹25 Cr",
  "Above ₹25 Cr",
] as const;

export type Property = {
  id: string;
  slug: string;
  name: string;
  locality: string;
  city: string;
  property_type: string;
  price_inr: number;
  carpet_area_sqft: number;
  bedrooms: number;
  bathrooms: number;
  rera_number: string | null;
  possession: string | null;
  description: string;
  amenities: string[];
  image_key: string;
  featured: boolean;
  status: string;
};
