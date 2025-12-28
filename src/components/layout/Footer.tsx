import { Link, useLocation } from "react-router-dom";
import { BRAND } from "@/config/brand";
import { SERVICES } from "@/config/services";
import { LOCATIONS } from "@/config/locations";
import { Phone, Mail, MapPin } from "lucide-react";
import { PopularLinks } from "@/components/sections/PopularLinks";
import { trackPhoneClick } from "@/lib/trackPhoneClick";

export function Footer() {
  const location = useLocation();

  const handlePhoneClick = () => {
    trackPhoneClick(location.pathname);
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <h3 className="text-xl font-bold mb-4">{BRAND.brandName}</h3>
            {/* FIXED: /70 → /85 for contrast */}
            <p className="text-background/85 text-sm mb-4">{BRAND.tagline}</p>
            <div className="space-y-1 text-sm">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 text-background/90 hover:text-accent transition-colors min-h-[48px] py-2 md:min-h-0 md:py-0"
                onClick={handlePhoneClick}
              >
                <Phone className="h-4 w-4" />
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-background/90 hover:text-accent transition-colors min-h-[48px] py-2 md:min-h-0 md:py-0"
              >
                <Mail className="h-4 w-4" />
                {BRAND.email}
              </a>
              {/* FIXED: /80 → /90 for contrast */}
              <div className="flex items-start gap-2 text-background/90 py-2 md:py-0">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  {BRAND.addressLine1}
                  {BRAND.addressLine2 && <>, {BRAND.addressLine2}</>}
                  <br />
                  {BRAND.postcode}
                </span>
              </div>
            </div>
          </div>

        {/* Services column - FIXED: /70 → /85 */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-0 md:space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline font-medium"
                >
                  Blocked Drains Manchester
                </Link>
              </li>
              <li>
                <Link
                  to="/services/blocked-drains/blocked-sink"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Blocked Sinks
                </Link>
              </li>
              <li>
                <Link
                  to="/services/drain-jetting"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Drain Jetting
                </Link>
              </li>
              {SERVICES.filter(s => !['blocked-drains', 'drain-jetting'].includes(s.slug)).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas column - FIXED: /70 → /85 */}
          <div>
            <h4 className="font-semibold mb-4">Areas We Cover</h4>
            <ul className="space-y-0 md:space-y-2 text-sm">
              {LOCATIONS.slice(0, 6).map((location) => (
                <li key={location.slug}>
                  <Link
                    to={`/locations/${location.slug}`}
                    className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links column - FIXED: /70 → /85 */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-0 md:space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Sitemap
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  XML Sitemap
                </a>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Admin
                </Link>
              </li>
            </ul>

            {/* Legal links - FIXED: /70 → /85 */}
            <h4 className="font-semibold mb-3 mt-6">Legal</h4>
            <ul className="space-y-0 md:space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-background/85 hover:text-accent transition-colors block min-h-[48px] py-3 md:min-h-0 md:py-0 md:inline"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <PopularLinks />

        {/* FIXED: /60 → /80 for copyright text */}
        <div className="border-t border-background/20 mt-10 pt-6 text-center text-sm text-background/80">
          <p>
            © {new Date().getFullYear()} {BRAND.brandName}. All rights reserved.
            {BRAND.companyNumber && (
              <span className="block mt-1">
                Company No: {BRAND.companyNumber}
              </span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
