import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BRAND } from "@/config/brand";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackPhoneClick } from "@/lib/trackPhoneClick";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handlePhoneClick = () => {
    trackPhoneClick(location.pathname);
  };

  const navLinks = [
    { href: "/", label: "Blocked Drains" },
    { href: "/services/blocked-drains/blocked-sink", label: "Blocked Sinks" },
    { href: "/services/drain-jetting", label: "Drain Jetting" },
    { href: "/services/cctv-drain-surveys", label: "CCTV Surveys" },
    { href: "/services", label: "All Services" },
    { href: "/locations", label: "Areas We Cover" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      {/* Top bar with phone */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-wide flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            <a 
              href={`tel:${BRAND.phone}`} 
              className="font-medium hover:underline min-h-[44px] flex items-center px-1 -mx-1"
              onClick={handlePhoneClick}
            >
              {BRAND.phone}
            </a>
            {BRAND.emergencyAvailable && (
              <span className="ml-2 bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs font-semibold">
                24/7 Emergency
              </span>
            )}
          </div>
          <span className="hidden sm:block text-sm">{BRAND.serviceAreaLabel}</span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container-wide px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 min-h-[48px]">
            {BRAND.logoUrl ? (
              <img 
                src={BRAND.logoUrl} 
                alt={BRAND.brandName} 
                className="h-10 w-auto" 
                fetchPriority="high"
                width={160}
                height={40}
              />
            ) : (
              <span className="text-xl font-bold text-primary">{BRAND.brandName}</span>
            )}
          </Link>

          {/* Desktop navigation - FIXED: /80 → text-foreground for full contrast */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="ml-4" variant="cta">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </nav>

          {/* Mobile menu button - 48x48 touch target */}
          <button
            className="lg:hidden p-3 -mr-3 min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation - FIXED: /80 → text-foreground for full contrast */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-4 py-3 min-h-[48px] text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Button asChild className="w-full min-h-[48px]" variant="cta">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Get a Quote</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
