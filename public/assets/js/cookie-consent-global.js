(function(){
  'use strict';

  var COOKIE_KEY = (window.RZ_GOOGLE_TOOLS_CONFIG && window.RZ_GOOGLE_TOOLS_CONFIG.consentStorageKey) || 'rz-cookie-consent-v54-76';
  var VERSION = 'v54.76';

  var bannerHtml = '' +
    '<aside aria-label="Cookie preferences" aria-live="polite" class="cookie" id="cookieBanner" role="dialog">' +
      '<button aria-label="Dismiss" class="cookie__close" id="cookieClose" type="button"><svg fill="none" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path></svg></button>' +
      '<div class="cookie__head"><div aria-hidden="true" class="cookie__icon"><svg fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10 6 6 0 0 1-6-6 4 4 0 0 1-4-4z" fill="none" stroke="currentColor" stroke-width="1.5"></path><circle cx="8.5" cy="11" fill="currentColor" r="1"></circle><circle cx="14" cy="14" fill="currentColor" r="1"></circle><circle cx="10" cy="16" fill="currentColor" r="1"></circle></svg></div><h2 class="cookie__title">Cookie Preferences</h2></div>' +
      '<p class="cookie__body">Rozana Business Intelligence LLC uses essential cookies for site operation and, when accepted, analytics and marketing cookies for Google Tag Manager, Google Analytics 4, Google Ads conversion measurement, remarketing readiness, campaign traffic analysis, and website performance monitoring. You can accept all cookies, reject non-essential cookies, or manage your preferences.</p>' +
      '<div class="cookie__prefs" id="cookiePrefs">' +
        '<div class="cookie__pref"><div><div class="cookie__pref-title">Essential Cookies</div><div class="cookie__pref-desc">Required for core site functionality and security. Always active.</div></div><input aria-label="Essential cookies always active" checked class="cookie__toggle" disabled type="checkbox"></div>' +
        '<div class="cookie__pref"><div><div class="cookie__pref-title">Analytics Cookies</div><div class="cookie__pref-desc">Enable Google Analytics 4 and Google Tag Manager measurement for page usage, traffic sources, content performance, form events, campaign performance, and user experience monitoring.</div></div><input aria-label="Analytics cookies" class="cookie__toggle" id="cookieAnalytics" type="checkbox"></div>' +
        '<div class="cookie__pref"><div><div class="cookie__pref-title">Marketing Cookies</div><div class="cookie__pref-desc">Enable Google Ads conversion measurement, remarketing readiness, ad personalization signals, and future paid-media tracking only when this category is accepted.</div></div><input aria-label="Marketing cookies" class="cookie__toggle" id="cookieMarketing" type="checkbox"></div>' +
      '</div>' +
      '<div class="cookie__actions"><button class="cookie__btn cookie__btn--decline" id="cookieReject" type="button">Reject All</button><button class="cookie__btn cookie__btn--manage" id="cookieManage" type="button">Manage Choices</button><button class="cookie__btn cookie__btn--save is-hidden-init" id="cookieSave" type="button">Save Choices</button><button class="cookie__btn cookie__btn--accept" id="cookieAccept" type="button">Accept All</button></div>' +
    '</aside>';

  var css = '' +
    '.cookie{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(520px,calc(100vw - 36px));max-height:calc(100vh - 36px);overflow:auto;padding:22px;border:1px solid rgba(255,255,255,.16);border-radius:22px;background:linear-gradient(145deg,rgba(18,18,34,.98),rgba(34,22,58,.98));box-shadow:0 22px 70px rgba(0,0,0,.42);color:#f8f6ff;font-family:Inter,DM Sans,system-ui,-apple-system,Segoe UI,sans-serif;display:none}' +
    '.cookie.show{display:block}' +
    '.cookie__close{position:absolute;top:13px;right:13px;width:32px;height:32px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#fff;display:grid;place-items:center;cursor:pointer}' +
    '.cookie__head{display:flex;gap:12px;align-items:center;margin-bottom:12px}.cookie__icon{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:rgba(207,179,91,.14);color:#cfb35b}.cookie__icon svg{width:22px;height:22px}.cookie__title{font-size:18px;line-height:1.2;margin:0;color:#fff}.cookie__body{font-size:13.5px;line-height:1.65;color:rgba(248,246,255,.78);margin:0 34px 14px 0}.cookie__prefs{display:none;margin:12px 0 16px}.cookie__prefs.show{display:grid;gap:10px}.cookie__pref{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:rgba(255,255,255,.045)}.cookie__pref-title{font-size:13px;font-weight:700;color:#fff}.cookie__pref-desc{font-size:12px;line-height:1.45;color:rgba(248,246,255,.68);margin-top:3px}.cookie__toggle{width:42px;height:22px;accent-color:#cfb35b;flex:0 0 auto}.cookie__actions{display:flex;flex-wrap:wrap;gap:9px;align-items:center}.cookie__btn{border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:10px 14px;font-weight:700;font-size:12px;cursor:pointer;color:#fff;background:rgba(255,255,255,.08)}.cookie__btn--accept,.cookie__btn--save{background:#cfb35b;color:#171326;border-color:#cfb35b}.cookie__btn--decline{background:rgba(255,255,255,.04)}.cookie__btn--manage{background:rgba(109,75,196,.18);border-color:rgba(167,137,255,.32)}.cookie__btn.is-hidden-init{display:none!important}[data-cookie-settings]{font:inherit;color:inherit;background:none;border:0;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:0}.demo-cookie-settings-wrap{margin-top:12px}.demo-cookie-settings{opacity:.76}.demo-cookie-settings:hover{opacity:1}@media(max-width:560px){.cookie{right:12px;bottom:12px;width:calc(100vw - 24px);padding:18px;border-radius:18px}.cookie__actions{display:grid;grid-template-columns:1fr 1fr}.cookie__btn{width:100%}.cookie__body{margin-right:0}}';

  function ensureStyles(){
    if(document.getElementById('rozana-cookie-global-style')) return;
    var style = document.createElement('style');
    style.id = 'rozana-cookie-global-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function readStored(){
    try{
      var raw = localStorage.getItem(COOKIE_KEY);
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }

  function writeStored(payload){
    try{ localStorage.setItem(COOKIE_KEY, JSON.stringify(payload)); }catch(e){}
  }

  function dispatchConsent(payload){
    try{ window.dispatchEvent(new CustomEvent('rozana:cookie-consent-updated', {detail: payload})); }catch(e){}
    if(window.RozanaAnalytics && typeof window.RozanaAnalytics.load === 'function'){
      window.RozanaAnalytics.load();
    }
    if(window.RozanaAnalytics && typeof window.RozanaAnalytics.track === 'function'){
      window.RozanaAnalytics.track('cookie_consent_update', {
        choice: payload.choice,
        analytics: !!payload.analytics,
        marketing: !!payload.marketing
      });
    } else if(typeof window.trackRozanaEvent === 'function'){
      window.trackRozanaEvent('cookie_consent_update', {
        choice: payload.choice,
        analytics: !!payload.analytics,
        marketing: !!payload.marketing
      });
    }
  }

  function setChecks(existing){
    var analytics = document.getElementById('cookieAnalytics');
    var marketing = document.getElementById('cookieMarketing');
    if(existing){
      if(analytics) analytics.checked = !!existing.analytics;
      if(marketing) marketing.checked = !!existing.marketing;
    }else{
      if(analytics) analytics.checked = false;
      if(marketing) marketing.checked = false;
    }
  }

  function revealSave(){
    var save = document.getElementById('cookieSave');
    if(save){ save.classList.remove('is-hidden-init'); save.style.display = 'inline-flex'; }
  }

  function showPreferences(){
    var banner = document.getElementById('cookieBanner');
    var prefs = document.getElementById('cookiePrefs');
    var manage = document.getElementById('cookieManage');
    if(!banner) return;
    setChecks(readStored());
    banner.classList.add('show');
    if(prefs) prefs.classList.add('show');
    if(manage) manage.style.display = 'none';
    revealSave();
  }

  function closeBanner(){
    var banner = document.getElementById('cookieBanner');
    if(banner) banner.classList.remove('show');
  }

  function store(state){
    var payload = Object.assign({essential:true, analytics:false, marketing:false, choice:'custom', version:VERSION, date:new Date().toISOString()}, state || {});
    writeStored(payload);
    closeBanner();
    dispatchConsent(payload);
  }

  function ensureBanner(){
    if(!document.getElementById('cookieBanner')){
      document.body.insertAdjacentHTML('beforeend', bannerHtml);
    }
  }

  function bind(){
    ensureStyles();
    ensureBanner();
    var banner = document.getElementById('cookieBanner');
    if(!banner) return;
    if(banner.dataset.rozanaCookieBound === 'true') return;
    banner.dataset.rozanaCookieBound = 'true';

    var existing = readStored();
    if(existing && existing.version !== VERSION){
      existing.version = VERSION;
      writeStored(existing);
    }
    setChecks(existing);

    var accept = document.getElementById('cookieAccept');
    var reject = document.getElementById('cookieReject');
    var close = document.getElementById('cookieClose');
    var manage = document.getElementById('cookieManage');
    var save = document.getElementById('cookieSave');
    var analytics = document.getElementById('cookieAnalytics');
    var marketing = document.getElementById('cookieMarketing');

    if(accept) accept.addEventListener('click', function(){ store({analytics:true, marketing:true, choice:'accepted_all'}); });
    if(reject) reject.addEventListener('click', function(){ store({analytics:false, marketing:false, choice:'rejected_all'}); });
    if(close) close.addEventListener('click', function(){
      if(readStored()) closeBanner();
      else store({analytics:false, marketing:false, choice:'dismissed'});
    });
    if(manage) manage.addEventListener('click', showPreferences);
    if(save) save.addEventListener('click', function(){
      store({analytics:!!(analytics && analytics.checked), marketing:!!(marketing && marketing.checked), choice:'saved_preferences'});
    });

    Array.prototype.slice.call(document.querySelectorAll('[data-cookie-settings]')).forEach(function(button){
      if(button.dataset.cookieSettingsBound === 'true') return;
      button.dataset.cookieSettingsBound = 'true';
      button.addEventListener('click', function(e){ e.preventDefault(); showPreferences(); });
    });

    if(!existing){
      setTimeout(function(){ banner.classList.add('show'); }, 700);
    }
  }

  window.RozanaCookieConsentGlobal = {
    active: true,
    open: showPreferences,
    status: function(){ return readStored(); },
    reset: function(){ try{ localStorage.removeItem(COOKIE_KEY); }catch(e){}; location.reload(); }
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  }else{
    bind();
  }
})();
