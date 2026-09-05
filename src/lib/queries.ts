import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Property } from "@/lib/estate";

export const propertiesQuery = queryOptions({
  queryKey: ["properties"],
  queryFn: async (): Promise<Property[]> => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("price_inr", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Property[];
  },
});

export const propertyQuery = (slug: string) =>
  queryOptions({
    queryKey: ["property", slug],
    queryFn: async (): Promise<Property | null> => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data as Property) ?? null;
    },
  });

export type EnquiryInput = {
  full_name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  budget?: string | null;
  message?: string | null;
  property_id?: string | null;
};

export async function submitEnquiry(input: EnquiryInput) {
  const { error } = await supabase.from("enquiries").insert(input);
  if (error) throw error;
}
