import { supabase } from "@/integrations/supabase/client";
import { BRAND } from "@/config/brand";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export async function trackPhoneClick(sourcePage: string) {
  // Track in GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_click", {
      event_category: "engagement",
      event_label: sourcePage,
      phone_number: BRAND.phone,
    });
  }

  // Track in database
  try {
    await supabase.from("leads").insert({
      name: "",
      phone: BRAND.phone,
      email: "",
      postcode: "",
      service: "phone-call",
      location: BRAND.primaryLocation,
      message: "Phone number clicked",
      source_page: sourcePage,
    });
  } catch (error) {
    // Silently fail - don't interrupt the call
    console.error("Failed to track phone click:", error);
  }
}
