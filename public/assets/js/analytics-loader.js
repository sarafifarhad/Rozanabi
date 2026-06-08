(function(){
  'use strict';

  window.dataLayer = window.dataLayer || [];

  var DEFAULTS = {
    primaryDomain: 'https://rozanabi.com',
    wwwDomain: 'https://www.rozanabi.com',
    gtmContainerId: '',
    ga4MeasurementId: '',
    googleAdsConversionId: '',
    configEndpoint: '/api/google-tools-config',
    consentStorageKey: 'rz-cookie-consent',
    requireCookieConsent: true,
    loadMode: 'gtm_preferred',
    debug: false
  };

  var CONFIG = Object.assign({}, DEFAULTS, window.RZ_GOOGLE_TOOLS_CONFIG || {});
  var loaded = {gtm:false, ga4:false, ads:false, gtagBase:false};
  var configReady = false;
  var configPromise = null;

  function log(){
    if(CONFIG.debug && window.console){
      console.log.apply(console, ['[Rozana Google Tools]'].concat(Array.prototype.slice.call(arguments)));
    }
  }

  function isPlaceholder(value){
    return !value || /X{4,}|YOUR_|PLACEHOLDER|TOKEN_HERE|__|DISABLED/i.test(String(value));
  }

  function cleanId(value){
    return String(value || '').trim();
  }

  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function getStoredConsent(){
    try { return JSON.parse(localStorage.getItem(CONFIG.consentStorageKey) || '{}'); }
    catch(e){ return {}; }
  }

  function hasAnalyticsConsent(){
    if(!CONFIG.requireCookieConsent) return true;
    var c = getStoredConsent();
    return c.analytics === true || c.choice === 'accepted_all';
  }

  function hasMarketingConsent(){
    if(!CONFIG.requireCookieConsent) return true;
    var c = getStoredConsent();
    return c.marketing === true || c.choice === 'accepted_all';
  }

  function setConsentDefaults(){
    window.gtag('consent', 'default', {
      analytics_storage: hasAnalyticsConsent() ? 'granted' : 'denied',
      ad_storage: hasMarketingConsent() ? 'granted' : 'denied',
      ad_user_data: hasMarketingConsent() ? 'granted' : 'denied',
      ad_personalization: hasMarketingConsent() ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });
  }

  function updateConsentMode(){
    window.gtag('consent', 'update', {
      analytics_storage: hasAnalyticsConsent() ? 'granted' : 'denied',
      ad_storage: hasMarketingConsent() ? 'granted' : 'denied',
      ad_user_data: hasMarketingConsent() ? 'granted' : 'denied',
      ad_personalization: hasMarketingConsent() ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted'
    });
  }

  setConsentDefaults();

  function loadScript(src, attrs){
    if(document.querySelector('script[src="'+src+'"]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    Object.keys(attrs || {}).forEach(function(k){ s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
  }

  function loadGTM(){
    var id = cleanId(CONFIG.gtmContainerId);
    if(isPlaceholder(id) || loaded.gtm) return false;
    window.dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    loadScript('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id), {'data-rozana-google-tool':'gtm'});
    loaded.gtm = true;
    log('Loaded GTM', id);
    return true;
  }

  function loadGtagBase(preferredId){
    var id = cleanId(preferredId || CONFIG.ga4MeasurementId || CONFIG.googleAdsConversionId);
    if(isPlaceholder(id) || loaded.gtagBase) return !isPlaceholder(id);
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id), {'data-rozana-google-tool':'gtag'});
    window.gtag('js', new Date());
    loaded.gtagBase = true;
    log('Loaded gtag base', id);
    return true;
  }

  function loadGA4Direct(){
    var id = cleanId(CONFIG.ga4MeasurementId);
    if(isPlaceholder(id) || loaded.ga4 || !hasAnalyticsConsent()) return false;
    if(!loadGtagBase(id)) return false;
    window.gtag('config', id, {
      send_page_view: true,
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title
    });
    loaded.ga4 = true;
    log('Configured GA4 direct', id);
    return true;
  }

  function loadGoogleAdsDirect(){
    var id = cleanId(CONFIG.googleAdsConversionId);
    if(isPlaceholder(id) || loaded.ads || !hasMarketingConsent()) return false;
    if(!loadGtagBase(id)) return false;
    window.gtag('config', id, {send_page_view:false});
    loaded.ads = true;
    log('Configured Google Ads direct', id);
    return true;
  }

  function mergeRemoteConfig(remote){
    if(!remote || typeof remote !== 'object') return;
    CONFIG = Object.assign({}, CONFIG, remote);
    window.RZ_GOOGLE_TOOLS_CONFIG = Object.assign({}, window.RZ_GOOGLE_TOOLS_CONFIG || {}, CONFIG);
    if(window.RozanaAnalytics){ window.RozanaAnalytics.config = CONFIG; }
  }

  function fetchRemoteConfig(){
    var endpoint = cleanId(CONFIG.configEndpoint);
    if(!endpoint || configReady) return Promise.resolve(CONFIG);
    if(configPromise) return configPromise;

    configPromise = fetch(endpoint, {credentials:'same-origin', cache:'force-cache', headers:{'Accept':'application/json','X-Rozana-Config-Request':'google-tools'}})
      .then(function(res){ return res.ok ? res.json() : {}; })
      .then(function(remote){
        mergeRemoteConfig(remote);
        configReady = true;
        log('Loaded remote Google tools config', CONFIG);
        return CONFIG;
      })
      .catch(function(err){
        configReady = true;
        log('Could not load remote Google tools config', err);
        return CONFIG;
      });
    return configPromise;
  }

  function load(){
    updateConsentMode();

    if(CONFIG.loadMode === 'disabled') return false;

    if(!hasAnalyticsConsent() && !hasMarketingConsent()){
      log('No analytics or marketing consent. Google tools not loaded.');
      return false;
    }

    if(CONFIG.loadMode === 'gtm_preferred' && !isPlaceholder(CONFIG.gtmContainerId)){
      return loadGTM();
    }

    var loadedAny = false;
    loadedAny = loadGA4Direct() || loadedAny;
    loadedAny = loadGoogleAdsDirect() || loadedAny;
    return loadedAny;
  }

  function loadWhenReady(){
    return fetchRemoteConfig().then(function(){ return load(); });
  }

  function track(eventName, params){
    var safeName = String(eventName || 'custom_event').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, 40) || 'custom_event';
    var payload = Object.assign({
      event: safeName,
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title
    }, params || {});

    window.dataLayer.push(payload);

    if(loaded.ga4 && typeof window.gtag === 'function'){
      var gaParams = Object.assign({}, payload);
      delete gaParams.event;
      window.gtag('event', safeName, gaParams);
    }
    return payload;
  }

  window.RozanaAnalytics = {
    config: CONFIG,
    refreshConfig: fetchRemoteConfig,
    load: loadWhenReady,
    updateConsentMode: updateConsentMode,
    hasAnalyticsConsent: hasAnalyticsConsent,
    hasMarketingConsent: hasMarketingConsent,
    track: track,
    status: function(){
      return {
        loaded: Object.assign({}, loaded),
        analyticsConsent: hasAnalyticsConsent(),
        marketingConsent: hasMarketingConsent(),
        mode: CONFIG.loadMode,
        gtmContainerId: cleanId(CONFIG.gtmContainerId),
        ga4MeasurementId: cleanId(CONFIG.ga4MeasurementId),
        googleAdsConversionId: cleanId(CONFIG.googleAdsConversionId)
      };
    }
  };

  window.addEventListener('rozana:cookie-consent-updated', function(){
    loadWhenReady();
  });

  loadWhenReady();
})();
