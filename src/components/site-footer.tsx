import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 lg:px-10">
        <div>
          <span className="font-display text-2xl tracking-[0.3em]">ANANTA</span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            RERA-registered luxury residences across Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad
            and Goa.
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/projects" className="hover:text-primary">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Office</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Ananta House, 12 Altamount Road,
            <br />
            Cumballa Hill, Mumbai 400026
          </p>
        </div>

        <div>
          <p className="eyebrow">Reach us</p>
          <p className="mt-4 space-y-1 text-sm text-muted-foreground">
            <a href="tel:+912266001200" className="block hover:text-primary">
              +91 22 6600 1200
            </a>
            <a href="mailto:homes@anantaestates.in" className="block hover:text-primary">
              homes@anantaestates.in
            </a>
            <a
              href="https://wa.me/919820011200"
              target="_blank"
              rel="noreferrer"
              className="block hover:text-primary"
            >
              WhatsApp: +91 98200 11200
            </a>
          </p>
        </div>
      </div>

      <div className="hairline">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-10">
          <span>© {new Date().getFullYear()} Ananta Estates Pvt Ltd</span>
          <span>MahaRERA Agent Reg. A51900012345 · CIN U70100MH2014PTC256789</span>
        </div>
      </div>
    </footer>
  );
}
