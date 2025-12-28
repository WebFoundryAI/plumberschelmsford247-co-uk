import { supabase } from "@/integrations/supabase/client";
import { BRAND } from "@/config/brand";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export async function trackPhoneClick(sourcePage: string) {
  // Track conversion in GA4
  if (typeof window !== "undefined" && window.gtag) {
    // Primary phone click conversion
    window.gtag("event", "phone_click", {
      event_category: "conversion",
      event_label: sourcePage,
      phone_number: BRAND.phone,
      value: 75, // Higher value than form as more intent
      currency: "GBP",
    });
    
    // Also track as standard contact event
    window.gtag("event", "contact", {
      method: "phone",
      source_page: sourcePage,
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
