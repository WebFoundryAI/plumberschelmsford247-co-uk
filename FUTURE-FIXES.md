# Future Fixes

## Medium Priority

- **API keys in Git history** – `GOOGLE_MAPS_API_KEY` is in `.env` and `netlify.toml` which are tracked. Rotate keys and set them only via hosting platform UI.
- **`.env` not in `.gitignore`** – Only `.env.local` is excluded. Add `.env` to `.gitignore`.
- **Sign up for Ideal Postcodes account** – The `iddqd` community test key is limited to 15 requests/day/IP. Sign up at https://ideal-postcodes.co.uk for a production key and set `IDEAL_POSTCODES_API_KEY` in Cloudflare Pages dashboard.
- **No postcode lookup tests** – Lead API has good test coverage (170 tests), but postcode lookup functions have none.

## Low Priority

- **Missing skip-to-content link** – No skip link for keyboard users to jump past header navigation.
- **`wrangler.toml` has empty `account_id`/`zone_id`** – Only matters if deploying the Cloudflare Worker.
- **XSS in address dropdown text** – `addr.line` from the Ideal Postcodes API isn't HTML-escaped when injected via `innerHTML`. Low real-world risk since the API is trusted.
- **In-memory rate limiting resets on function restart** – Standard for serverless; acceptable for current traffic level. Consider persistent store (Redis/Supabase) if traffic grows.
- **Phone validation too loose** – Frontend only checks for 10+ digits. Could use a proper UK phone number regex.
- **No CSRF protection on forms** – Forms don't include CSRF tokens. Low risk since API is same-origin with no auth cookies.
