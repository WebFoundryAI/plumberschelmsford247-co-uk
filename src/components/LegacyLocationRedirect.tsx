import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Client-side fallback redirect from /location/* to /locations/*
 * Preserves path and query parameters
 * Uses window.location.replace for proper redirect behavior
 */
export function LegacyLocationRedirect() {
  const location = useLocation();
  
  useEffect(() => {
    const { pathname, search } = location;
    
    // Extract path after /location/
    const match = pathname.match(/^\/location\/?(.*)$/);
    if (match) {
      const remainingPath = match[1];
      // Build new URL: /locations/{remainingPath} + query params
      // Remove trailing slash from path, then add it back consistently
      const cleanPath = remainingPath.replace(/\/+$/, "");
      const newUrl = `/locations/${cleanPath}${cleanPath ? "/" : ""}${search}`;
      
      // Use replace to avoid adding to history (mimics 301 behavior)
      window.location.replace(newUrl);
    }
  }, [location]);
  
  // Show nothing while redirecting
  return null;
}
