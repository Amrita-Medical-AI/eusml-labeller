import { RemixBrowser,useLocation, useMatches  } from "@remix-run/react";
import * as Sentry from '@sentry/remix';
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";


const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
};


Sentry.init({
  dsn: process.env.NODE_ENV === 'production' ? process.env.SENTRY_DSN : undefined,
  tracesSampleRate: 1,
  debug: process.env.NODE_ENV === 'development',
  tracePropagationTargets: ["localhost", /^https:\/\/eusml\.com/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.browserTracingIntegration({
      useEffect,
      useLocation,
      useMatches,
    }),
    Sentry.replayIntegration(),
  ],
});

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
