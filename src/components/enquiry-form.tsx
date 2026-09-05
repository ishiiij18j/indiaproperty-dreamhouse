import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BUDGETS, CITIES } from "@/lib/estate";
import { submitEnquiry } from "@/lib/queries";

type Props = {
  propertyId?: string;
  propertyName?: string;
  compact?: boolean;
};

const emptyForm = {
  full_name: "",
  phone: "",
  email: "",
  city: "",
  budget: "",
  message: "",
};

export function EnquiryForm({ propertyId, propertyName, compact }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: () =>
      submitEnquiry({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        city: form.city || null,
        budget: form.budget || null,
        message:
          (propertyName ? `[${propertyName}] ` : "") + form.message.trim() || null,
        property_id: propertyId ?? null,
      }),
    onSuccess: () => {
      setForm(emptyForm);
      toast.success("Thank you — our advisor will call you within 24 hours.");
    },
    onError: () => toast.error("Could not send your enquiry. Please try again."),
  });

  const set = (key: keyof typeof emptyForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.full_name.trim().length < 2) next.full_name = "Please enter your name";
    if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(form.phone.replace(/\s|-/g, "")))
      next.phone = "Enter a valid 10-digit Indian mobile number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const field =
    "w-full border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) mutation.mutate();
      }}
      className="space-y-4"
      noValidate
    >
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor="name" className="eyebrow">
            Full name
          </label>
          <input
            id="name"
            className={`${field} mt-2`}
            value={form.full_name}
            onChange={(e) => set("full_name", e.target.value)}
            placeholder="Ishika Jain"
          />
          {errors.full_name && <p className="mt-1 text-xs text-destructive">{errors.full_name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="eyebrow">
            Mobile number
          </label>
          <input
            id="phone"
            className={`${field} mt-2`}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98200 00000"
            inputMode="tel"
          />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="eyebrow">
            Email (optional)
          </label>
          <input
            id="email"
            className={`${field} mt-2`}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="city" className="eyebrow">
            Preferred city
          </label>
          <select
            id="city"
            className={`${field} mt-2`}
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          >
            <option value="">Select a city</option>
            {CITIES.filter((c) => c !== "All cities").map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="budget" className="eyebrow">
            Budget
          </label>
          <select
            id="budget"
            className={`${field} mt-2`}
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            <option value="">Select a range</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="message" className="eyebrow">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className={`${field} mt-2 resize-none`}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder={
              propertyName ? `I would like a site visit for ${propertyName}.` : "Tell us what you are looking for."
            }
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-primary px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {mutation.isPending ? "Sending…" : "Request a callback"}
      </button>
      <p className="text-xs text-muted-foreground">
        By submitting you agree to be contacted by an Ananta Estates advisor. We never share your
        details.
      </p>
    </form>
  );
}
