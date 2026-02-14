# Copilot Instructions for World Monitor

## Build, Test & Development

- **Development server**: `npm run dev` (runs on default Vite port)
- **Type checking**: `npm run typecheck` (TypeScript validation without building)
- **Production build**: `npm run build` (with TypeScript compilation)
- **Build variants**:
  - `npm run build:full` - Full geopolitical variant (includes all data sources)
  - `npm run build:tech` - Tech-focused variant (startups, AI, tech companies)
  - `npm run dev:tech` - Development server for tech variant
  - Set `VITE_VARIANT` environment variable to control which build is produced

## Architecture Overview

World Monitor is a geopolitical intelligence dashboard that visualizes real-time data from 50+ sources on an interactive map. The application has a modular component-based architecture with a core data pipeline architecture:

### High-Level Flow
1. **Config System** (`index.ts`, `variants/`) - Variant-specific data (feeds, geo locations, markets) loaded at build time
2. **Services Layer** (`services/`) - Fetches and processes data (news, markets, military tracking, satellites, etc.)
3. **Components Layer** (`components/`) - Renders UI panels with specialized logic for different data types
4. **App.ts** - Main orchestrator that wires components, manages data updates, handles user interactions

### Key Architectural Patterns

**Panel System**: Custom base `Panel` class provides:
- Resizable containers (localStorage-persisted sizes via `heightToSpan()`)
- Optional activity tracking and counters
- Internationalization (i18n) support
- Extended by specialized panels: `NewsPanel`, `MarketPanel`, `HeatmapPanel`, etc.

**Service Architecture**: Data fetching is organized by domain:
- Core feeds: `fetchCategoryFeeds()`, `fetchMultipleStocks()`, `fetchCrypto()`
- Geopolitical: `fetchMilitaryFlights()`, `fetchMilitaryVessels()`, `fetchProtestEvents()`
- Intelligence: `fetchGdeltTensions()`, `fetchPizzIntStatus()`, `fetchNaturalEvents()`
- Real-time streams: WebSocket-based AIS vessel tracking and military vessel tracking

**Signal Aggregation**: Multiple data sources feed into a unified signal system:
- `signalAggregator` - Combines signals from different sources
- `detectGeoConvergence()` - Identifies geopolitical events clustering in space/time
- `calculateCII()` - Country Instability Index based on multi-source analysis
- Temporal analysis via baseline tracking and deviation calculation

**Map Visualization**: Uses `MapContainer` component with:
- Deck.gl for visualization layers (scatterplots, heatmaps, arcs)
- MapLibre GL for base map
- Configurable layers stored in `DEFAULT_MAP_LAYERS`

### Data Freshness & Caching
- `dataFreshness` module tracks when each source was last updated
- SQLite-based local database (`initDB()`) for persistent storage of baseline metrics
- Cached theater posture calculations for military analysis
- Circuit breaker pattern for handling API failures

### Variant System
- `VITE_VARIANT` environment variable controls which features are compiled in
- Tech variant excludes military/conflict data, focuses on tech ecosystems and startups
- Full variant includes all geopolitical data
- Configuration is split between `variants/base.ts` (shared) and variant-specific configs

## Key Conventions

### File Organization
- **Type definitions**: Located alongside service/component files or centralized in `types/`
- **Configurations**: `config/` directory with modular files (`feeds.ts`, `geo.ts`, `markets.ts`, `variants/`, `panels.ts`, etc.)
- **Services**: Each domain has dedicated service file(s) in `services/`
- **Components**: UI components extend the base `Panel` class and follow naming convention: `XyzPanel.ts`

### Internationalization (i18n)
- All user-facing strings must use `t()` translation function imported from `@/utils`
- Translation keys are centralized in `i18n.ts` (which uses `i18n.ts.template` as reference)
- Locale detection uses `navigator.language` with fallback to localStorage (`localStorage.getItem('locale')`)
- Supported locales include at minimum `zh-TW` (Traditional Chinese) and English
- When adding UI text: run `npm run typecheck` after updating translation strings

### Event Handling & Cleanup
- Debounced event listeners use `debounce()` utility from `@/utils`
- Components must implement proper cleanup in methods like `destroy()` or similar
- WebSocket connections (AIS, military vessel tracking) must be properly disconnected via `disconnectAisStream()` and similar methods

### Data Types
- Use TypeScript interfaces for all data structures (defined in `types/`)
- Use `Record<string, T>` for dictionaries of objects (used extensively for panels, news aggregation)
- Many services return promises and use async/await pattern

### Status Tracking
- Status checks use dedicated functions: `getAisStatus()`, `getProtestStatus()`, etc.
- Configuration flags determine feature availability: `isOutagesConfigured()`, `isAisConfigured()`, `isMilitaryVesselTrackingConfigured()`
- Many features require API keys or external service configuration

### CSS & Styling
- Main stylesheet is `main.css` (213KB+ due to comprehensive component styling)
- Panels use CSS Grid layout with responsive span classes: `span-1`, `span-2`, `span-3`, `span-4`
- Language-specific adjustments needed (text length varies significantly between English and Chinese)

### Security & XSS Prevention
- **CRITICAL**: ALWAYS use `escapeHtml()` when inserting user-generated content or API data into DOM
  ```typescript
  import { escapeHtml } from '@/utils/sanitize';
  element.innerHTML = `<span>${escapeHtml(data.title)}</span>`;
  ```
- Never commit API keys or secrets—use environment variables
- Validate all external data before processing

## Deployment Guide

### Quick Start - Local Testing
```bash
npm install
npm run typecheck  # Always run this after ANY code change
npm run dev        # Development server on http://localhost:5173
npm run build      # Production build (default variant)
```

### GitHub Pages Deployment (Recommended)
This project uses GitHub Actions to automatically deploy to GitHub Pages when code is merged to `main`.

**Setup Steps:**
1. Fork the repository: https://github.com/koala73/worldmonitor
2. Create a feature branch and push changes
3. Create a Pull Request (GitHub Actions will run all checks)
4. Once PR checks pass, merge to `main`
5. Deployment automatically triggers - visit `https://<username>.github.io/worldmonitor/`

**GitHub Pages Configuration:**
- Source: GitHub Actions
- Branch: main
- Folder: / (root)

See `.github/workflows/deploy.yml` for the deployment workflow configuration.

### Build Variants
The project supports multiple build configurations controlled via `VITE_VARIANT`:
- **Default (full)**: Complete geopolitical intelligence dashboard
- **Tech**: Technology-focused variant (excludes military/conflict data)

```bash
# Full variant (includes all data sources)
npm run build:full

# Tech variant (startups, AI, tech companies)
npm run build:tech
```

### Vercel Deployment (Alternative)
If deploying to Vercel instead:
1. Connect GitHub account to Vercel
2. Import `pachelbel23/worldmonitor` repository
3. Configure environment variables:
   - `VITE_VARIANT`: Set to `full` or `tech`
4. Deploy and monitor at https://vercel.com/dashboard

## Critical: RSS Proxy Allowlist

When adding new RSS feeds in `src/config/feeds.ts`, you **MUST** also add the feed domain to the allowlist in `api/rss-proxy.js`:

```javascript
// In api/rss-proxy.js
const ALLOWED_DOMAINS = [
  // ... existing domains
  'www.ycombinator.com',  // Add new domain here
];
```

Feeds from unlisted domains return HTTP 403 "Domain not allowed" errors. Debugging: check browser DevTools → Console for 403 errors.

### Custom Feed Scrapers

Some sources (e.g., Beehiiv newsletters) don't provide RSS feeds. Custom scrapers are in `/api/`:

| Endpoint | Source | Notes |
|----------|--------|-------|
| `/api/fwdstart` | FwdStart Newsletter | Scrapes archive, 30min cache |

To add a new scraper:
1. Create `/api/source-name.js` edge function
2. Scrape source and return RSS XML format
3. Add to `src/config/feeds.ts`: `{ name: 'Source', url: '/api/source-name' }`
4. No need to add to rss-proxy allowlist (direct API)

## AI Summarization & Caching

The AI Insights panel uses server-side Redis to cache summaries (avoid duplicate API calls):

**Required environment variables** (for production):
```
GROQ_API_KEY=gsk_xxx                    # Primary (14.4K req/day)
OPENROUTER_API_KEY=sk-or-xxx            # Fallback (50/day)
UPSTASH_REDIS_REST_URL=https://xxx      # Redis cache (sign up at upstash.com)
UPSTASH_REDIS_REST_TOKEN=xxx
```

**How it works**: Headlines → hash → Redis cache check → Cache hit (return) or miss (call Groq → store 24h → return)

## Git Branch Rules

**CRITICAL**:
- **NEVER** push to `main` without explicit user request
- **NEVER** merge branches without explicit permission
- If on `beta`, push only to `beta`—don't switch and push to `main` without asking
- Pushing to the CURRENT branch after commits is OK

## MCP Servers

**Playwright**: Configured for browser automation and testing interactive features:
- Useful for testing map interactions, panel resizing, language switching, and modal dialogs
- Can verify real-time data updates and API integrations
- Helps validate responsive behavior across different screen sizes

**Filesystem**: For enhanced file operations and code exploration:
- Navigate directory structures and explore the codebase efficiently
- View and manage configuration files, type definitions, and service modules

**Git**: For repository analysis and development workflow:
- Review commit history and understand code evolution
- Analyze branches and track changes in the project

## Additional Notes for Copilot Sessions

### Verification Strategy
- No automated test suite exists (`jest`, `vitest` not configured)
- **Verification relies on**: `npm run typecheck` (run after every code change) + successful build + manual browser testing
- Verify no console errors appear in browser DevTools after changes

### Code Style
- **Indentation**: 2 spaces
- **Quotes**: Single quotes preferred
- **Imports**: Use absolute paths with `@/` alias (`import { t } from '@/utils'` not `../../utils`)
- **File naming**: PascalCase for classes/components (`TechEventsPanel.ts`), camelCase for utilities (`sanitize.ts`)
- **Strict TypeScript**: Enabled—address all type errors

### Status Checking Patterns
Use dedicated functions to check feature availability:
- `isOutagesConfigured()`, `isAisConfigured()`, `isMilitaryVesselTrackingConfigured()`
- `getAisStatus()`, `getProtestStatus()`, etc.
- Many features require API keys or external service configuration
