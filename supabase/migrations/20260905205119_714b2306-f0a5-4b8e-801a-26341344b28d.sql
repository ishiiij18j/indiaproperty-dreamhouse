CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  locality text NOT NULL,
  city text NOT NULL,
  property_type text NOT NULL,
  price_inr bigint NOT NULL,
  carpet_area_sqft integer NOT NULL,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms integer NOT NULL DEFAULT 0,
  rera_number text,
  possession text,
  description text NOT NULL DEFAULT '',
  amenities text[] NOT NULL DEFAULT '{}',
  image_key text NOT NULL DEFAULT 'prop-1',
  featured boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.properties TO anon;
GRANT SELECT ON public.properties TO authenticated;
GRANT ALL ON public.properties TO service_role;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Properties are publicly viewable" ON public.properties FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  city text,
  budget text,
  message text,
  property_id uuid REFERENCES public.properties(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiries TO anon;
GRANT INSERT ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

INSERT INTO public.properties (slug, name, locality, city, property_type, price_inr, carpet_area_sqft, bedrooms, bathrooms, rera_number, possession, description, amenities, image_key, featured, status) VALUES
('sea-crest-bandra','Sea Crest Residences','Bandra West','Mumbai','Apartment',185000000,2450,4,4,'P51800012345','Dec 2026','Sea-facing 4 BHK homes in Bandra West with wide decks, imported marble flooring and a private lift lobby for every residence.','{"Sea-facing deck","Private lift lobby","Clubhouse","Infinity pool","EV charging","24x7 security"}','prop-1',true,'available'),
('verdant-whitefield','Verdant Courtyard Villas','Whitefield','Bengaluru','Villa',67500000,3800,4,5,'PRM/KA/RERA/1251/446','Ready to move','Courtyard villas with hand-carved jaali screens, double-height living rooms and landscaped private gardens minutes from ITPL.','{"Private garden","Jaali facade","Home automation","Rainwater harvesting","Clubhouse","Kids play area"}','prop-2',true,'available'),
('aurum-golf-links','Aurum Penthouse','Golf Links','Delhi','Penthouse',420000000,6200,5,6,'DLRERA2023A0091','Mar 2027','A single-floor penthouse in Lutyens Delhi with Italian marble, brass detailing and a wraparound terrace over the golf course.','{"Wraparound terrace","Private pool","Concierge","Italian marble","Home theatre","Valet parking"}','prop-3',true,'available'),
('mistvalley-lonavala','Mist Valley Estate','Lonavala','Pune','Villa',94000000,4600,5,5,'P52100031477','Sep 2026','A hillside estate above the Western Ghats with an infinity pool, monsoon-facing verandahs and locally quarried basalt walls.','{"Infinity pool","Valley view","Staff quarters","Solar power","Bonfire deck","Gated estate"}','hero',true,'available'),
('kokapet-skyline','Skyline Terraces','Kokapet','Hyderabad','Apartment',32500000,2150,3,3,'P02400004512','Jun 2027','Three-bedroom sky homes in the Financial District with double-glazed windows and a rooftop observation deck.','{"Rooftop deck","Gym","Co-working lounge","Covered parking","Power backup","Vaastu compliant"}','prop-1',false,'available'),
('assagao-casa','Casa Assagao','Assagao','Goa','Villa',48000000,2900,3,4,'PRGO05210987','Ready to move','A Portuguese-Indian villa with laterite walls, an oyster-shell window facade and a plunge pool under the palms.','{"Plunge pool","Verandah","Heritage facade","Fully furnished","Rental managed","Gated lane"}','prop-2',false,'available'),
('alibaug-plot','Sunset Ridge Plots','Alibaug','Mumbai','Plot',21000000,5000,0,0,'P52000018822','Immediate','Freehold NA plots on a sunset-facing ridge, ten minutes from Awas beach with approved layout and internal roads.','{"NA sanctioned","Sunset facing","Internal roads","Water connection","Compound wall","Clear title"}','prop-2',false,'available'),
('koregaon-mansion','Koregaon Park Mansion','Koregaon Park','Pune','Penthouse',128000000,4100,4,5,'P52100029910','Dec 2025','A duplex mansion apartment on a leafy Koregaon Park lane with a private plunge pool and teakwood interiors.','{"Duplex layout","Plunge pool","Teak interiors","Private terrace","Concierge","Two-car garage"}','prop-3',false,'sold');