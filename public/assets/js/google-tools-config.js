(function(){
  'use strict';
  window.RZ_GOOGLE_TOOLS_CONFIG = Object.assign({
    primaryDomain: 'https://rozanabi.com',
    wwwDomain: 'https://www.rozanabi.com',

    // Production Google IDs are loaded from /api/google-tools-config.
    // Set these in Vercel Environment Variables:
    // NEXT_PUBLIC_GTM_CONTAINER_ID, NEXT_PUBLIC_GA4_MEASUREMENT_ID, NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID.
    gtmContainerId: '',
    ga4MeasurementId: '',
    googleAdsConversionId: '',
    configEndpoint: '/api/google-tools-config',

    // Consent-aware loading. Google tags are prepared on every page, but analytics/ads storage
    // only becomes active after Accept All or saved preferences with the related category enabled.
    consentStorageKey: 'rz-cookie-consent-v54-83',
    requireCookieConsent: true,
    loadMode: 'gtm_preferred', // gtm_preferred | ga4_only | disabled
    debug: false
  }, window.RZ_GOOGLE_TOOLS_CONFIG || {});
})();
