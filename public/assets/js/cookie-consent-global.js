(function(){
  'use strict';

  var COOKIE_KEY = (window.RZ_GOOGLE_TOOLS_CONFIG && window.RZ_GOOGLE_TOOLS_CONFIG.consentStorageKey) || 'rz-cookie-consent';
  var VERSION = 'v54.91';

  var bannerHtml = '' +
    '<aside aria-label="Cookie preferences" aria-live="polite" class="cookie" id="cookieBanner" role="dialog">' +
      '<button aria-label="Dismiss" class="cookie__close" id="cookieClose" type="button"><svg fill="none" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"></path></svg></button>' +
      '<div class="cookie__head"><div aria-hidden="true" class="cookie__icon"><svg fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10 6 6 0 0 1-6-6 4 4 0 0 1-4-4z" fill="none" stroke="currentColor" stroke-width="1.5"></path><circle cx="8.5" cy="11" fill="currentColor" r="1"></circle><circle cx="14" cy="14" fill="currentColor" r="1"></circle><circle cx="10" cy="16" fill="currentColor" r="1"></circle></svg></div><h2 class="cookie__title">Cookie Preferences</h2></div>' +
      '<p class="cookie__body">Rozana uses essential cookies for site operation. With your consent, we use analytics and marketing cookies to measure website performance and campaign results.</p>' +
      '<div class="cookie__prefs" id="cookiePrefs">' +
        '<div class="cookie__pref"><div><div class="cookie__pref-title">Essential Cookies</div><div class="cookie__pref-desc">Required for core site functionality and security. Always active.</div></div><input aria-label="Essential cookies always active" checked class="cookie__toggle" disabled type="checkbox"></div>' +
        '<div class="cookie__pref"><div><div class="cookie__pref-title">Analytics Cookies</div><div class="cookie__pref-desc">Enable Google Analytics 4 and Google Tag Manager measurement for page usage, traffic sources, content performance, form events, campaign performance, and user experience monitoring.</div></div><input aria-label="Analytics cookies" class="cookie__toggle" id="cookieAnalytics" type="checkbox"></div>' +
        '<div class="cookie__pref"><div><div class="cookie__pref-title">Marketing Cookies</div><div class="cookie__pref-desc">Enable Google Ads conversion measurement, remarketing readiness, ad personalization signals, and future paid-media tracking only when this category is accepted.</div></div><input aria-label="Marketing cookies" class="cookie__toggle" id="cookieMarketing" type="checkbox"></div>' +
      '</div>' +
      '<div class="cookie__actions"><button class="cookie__btn cookie__btn--decline" id="cookieReject" type="button">Reject All</button><button class="cookie__btn cookie__btn--manage" id="cookieManage" type="button">Manage Choices</button><button class="cookie__btn cookie__btn--save is-hidden-init" id="cookieSave" type="button">Save Choices</button><button class="cookie__btn cookie__btn--accept" id="cookieAccept" type="button">Accept All</button></div>' +
    '</aside>';

  var css = '' +
    '.cookie{position:fixed;right:14px;bottom:14px;z-index:9999;width:min(440px,calc(100vw - 28px));max-height:min(78vh,620px);overflow:auto;padding:18px;border:1px solid rgba(255,255,255,.15);border-radius:20px;background:linear-gradient(145deg,rgba(18,18,34,.98),rgba(34,22,58,.98));box-shadow:0 18px 56px rgba(0,0,0,.40);color:#f8f6ff;font-family:Inter,DM Sans,system-ui,-apple-system,Segoe UI,sans-serif;display:none}' +
    '.cookie.show{display:block}' +
    '.cookie__close{position:absolute;top:12px;right:12px;width:30px;height:30px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#fff;display:grid;place-items:center;cursor:pointer}' +
    '.cookie__head{display:flex;gap:10px;align-items:center;margin-bottom:10px;padding-right:34px}.cookie__icon{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:rgba(207,179,91,.14);color:#cfb35b;flex:0 0 auto}.cookie__icon svg{width:20px;height:20px}.cookie__title{font-size:17px;line-height:1.2;margin:0;color:#fff}.cookie__body{font-size:12.8px;line-height:1.55;color:rgba(248,246,255,.78);margin:0 0 13px}.cookie__prefs{display:none;margin:10px 0 14px}.cookie__prefs.show{display:grid;gap:8px}.cookie__pref{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,255,255,.045)}.cookie__pref-title{font-size:12.5px;font-weight:700;color:#fff}.cookie__pref-desc{font-size:11.4px;line-height:1.38;color:rgba(248,246,255,.68);margin-top:3px}.cookie__toggle{width:40px;height:21px;accent-color:#cfb35b;flex:0 0 auto}.cookie__actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;align-items:stretch}.cookie__btn{border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:10px 10px;font-family:Inter,DM Sans,system-ui,-apple-system,Segoe UI,sans-serif;font-weight:800;font-size:10.8px;line-height:1.15;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;text-align:center;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;background:rgba(255,255,255,.08);min-height:40px;min-width:0;overflow:hidden;text-overflow:ellipsis}.cookie__btn--accept,.cookie__btn--save{background:#cfb35b;color:#171326;border-color:#cfb35b}.cookie__btn--accept:hover,.cookie__btn--accept:focus-visible,.cookie__btn--save:hover,.cookie__btn--save:focus-visible{background:#d8bd73;color:#171326;border-color:#d8bd73;text-shadow:none}.cookie__btn--decline{background:rgba(255,255,255,.04)}.cookie__btn--manage{background:rgba(109,75,196,.18);border-color:rgba(167,137,255,.32)}.cookie__btn.is-hidden-init{display:none!important}[data-cookie-settings]{font:inherit;color:inherit;background:none;border:0;text-decoration:none!important;text-underline-offset:0;cursor:pointer;padding:0}.demo-cookie-settings-wrap{margin-top:12px}.demo-cookie-settings{opacity:.76}.demo-cookie-settings:hover{opacity:1}@media(max-width:560px){.cookie{left:10px;right:10px;bottom:10px;width:auto;max-height:min(76vh,560px);padding:14px;border-radius:17px}.cookie__head{gap:9px;margin-bottom:8px}.cookie__icon{width:30px;height:30px}.cookie__title{font-size:15.5px}.cookie__body{font-size:12.2px;line-height:1.48;margin-bottom:10px}.cookie__actions{display:grid;grid-template-columns:1fr 1fr;gap:7px}.cookie__btn{width:100%;padding:10px 8px;font-size:10px;letter-spacing:.06em;min-height:40px;white-space:nowrap}.cookie__pref{padding:9px}.cookie__pref-desc{display:none}}';

  function ensureStyles(){
    if(document.getElementById('rozana-cookie-global-style')) return;
    var style = document.createElement('style');
    style.id = 'rozana-cookie-global-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  var LEGACY_KEYS = ['rz-cookie-consent-v54-85','rz-cookie-consent-v54-84','rz-cookie-consent-v54-83','rz-cookie-consent-v54-80','rz-cookie-consent-v54-77','rz-cookie-consent-v54-76'];

  function readStored(){
    try{
      var raw = localStorage.getItem(COOKIE_KEY);
      if(raw) return JSON.parse(raw);
      for(var i=0;i<LEGACY_KEYS.length;i++){
        raw = localStorage.getItem(LEGACY_KEYS[i]);
        if(raw){
          var migrated = JSON.parse(raw);
          localStorage.setItem(COOKIE_KEY, JSON.stringify(migrated));
          return migrated;
        }
      }
      return null;
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
    reset: function(){ try{ localStorage.removeItem(COOKIE_KEY); LEGACY_KEYS.forEach(function(k){ localStorage.removeItem(k); }); }catch(e){}; location.reload(); }
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  }else{
    bind();
  }
})();
