import './styles/main.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { inject } from '@vercel/analytics';
import { App } from './App';
import { debugInjectTestEvents, debugGetCells, getCellCount } from '@/services/geo-convergence';
import { initMetaTags } from '@/services/meta-tags';
import { i18n } from '@/utils';

// Initialize Vercel Analytics
inject();

// Initialize dynamic meta tags for sharing
initMetaTags();

const app = new App('app');
app.init().catch(console.error);

// Debug helpers for geo-convergence testing (remove in production)
(window as unknown as Record<string, unknown>).geoDebug = {
  inject: debugInjectTestEvents,
  cells: debugGetCells,
  count: getCellCount,
};

// Debug helpers for i18n
(window as unknown as Record<string, unknown>).i18nDebug = {
  getDebugInfo: () => i18n.getDebugInfo(),
  setLocale: (locale: string) => i18n.setLocale(locale),
};
