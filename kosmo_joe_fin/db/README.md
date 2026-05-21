# KOSMO_JOE_FIN Database Setup

## Roles

- Supabase `supa-DB-tuto`: app operation data such as members, plans, watchlists, and saved reports.
- Neon `kosmo-joe-fin-data`: financial data cache and analysis data such as prices, ETF holdings, news, earnings, backtests, and market indicators.

## Spring Profiles

- `local`: H2 local test database.
- `supabase`: connects to Supabase by environment variables.
- `neon`: connects to Neon by environment variables.

## Environment Variables

```text
SUPABASE_DB_URL=jdbc:postgresql://db.somkqvrvhjnvwqttrnty.supabase.co:5432/postgres
SUPABASE_DB_USERNAME=postgres
SUPABASE_DB_PASSWORD=your_supabase_database_password

NEON_DB_URL=jdbc:postgresql://your-neon-host/neondb?sslmode=require
NEON_DB_USERNAME=your_neon_role
NEON_DB_PASSWORD=your_neon_password
```

Do not commit real database passwords or API keys.

## Current Status

- Supabase app tables were applied to project `somkqvrvhjnvwqttrnty`.
- Neon project creation requires reauthentication in the Neon plugin before it can be created.

