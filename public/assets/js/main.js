'use strict';
/* Rozana front-end interactions - English-only public release.
   A localized /ar/ version will be built later for cleaner UX and SEO. */

const blogPosts = [
  {id:1, slug:'data-governance-gcc', detail:'insight-data-governance-gcc.html', color:'#8A60D0', patternAngle:135, category:'Data Governance', date:'April 28, 2026', title:'The Data Governance Imperative for GCC Enterprises', excerpt:'Why ownership, data quality and governance discipline matter before dashboards and AI scale.'},
  {id:2, slug:'seo-aeo-geo', detail:'insight-seo-aeo-geo.html', color:'#C9A76C', patternAngle:45, category:'SEO', date:'May 8, 2026', title:'SEO, AEO and GEO: Search Visibility Beyond Keywords', excerpt:'Modern search visibility depends on structured answers, entity clarity, schema readiness and credible topical coverage.'},
  {id:3, slug:'seo-ready-websites', detail:'insight-seo-ready-web-design.html', color:'#5B8DD9', patternAngle:120, category:'Web Design', date:'May 6, 2026', title:'SEO-Ready Websites for Consulting and B2B Companies', excerpt:'How web design, content architecture, mobile performance and conversion paths turn a website into a business asset.'},
  {id:4, slug:'ai-models-chatbots', detail:'insight-ai-models-chatbots.html', color:'#8A60D0', patternAngle:80, category:'AI Models', date:'May 12, 2026', title:'Choosing the Right AI Model for Business Chatbots', excerpt:'A practical overview of model and automation options for service, knowledge and workflow use cases.'},
  {id:5, slug:'digital-growth-campaigns', detail:'insight-digital-growth-campaigns.html', color:'#C9A76C', patternAngle:25, category:'Digital Growth', date:'May 16, 2026', title:'Digital Growth Needs More Than Campaigns', excerpt:'How paid media, social campaigns, landing pages and reporting connect into one growth system.'}
];


function trackRozanaEvent(eventName, params){
  const payload=Object.assign({page_path:window.location.pathname, page_location:window.location.href, page_title:document.title}, params||{});
  if(window.RozanaAnalytics && typeof window.RozanaAnalytics.track==='function'){
    window.RozanaAnalytics.track(eventName, payload);
    return;
  }
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push(Object.assign({event:eventName}, payload));
}

function initEventTracking(){
  document.addEventListener('click',e=>{
    const cta=e.target.closest('a.btn-p,a.btn-g,a.nav__cta,a.blog-read,a.hero-link,a.service-link,a.use-card-link');
    if(!cta)return;
    trackRozanaEvent('cta_click',{
      cta_text:(cta.textContent||'').trim().replace(/\s+/g,' ').slice(0,90),
      cta_href:cta.getAttribute('href')||'',
      cta_class:cta.className||''
    });
  });
}

function renderMarquee(){
  const mq=document.getElementById('mqTrack');
  if(!mq)return;
  const items=['Digital Marketing','SEO Visibility','Website Presence','Market Analysis','AI Workflows','Chatbot Support','Content Automation','Customer Insights','Paid Media','Growth Strategy','GCC Market','Practical Advisory'];
  mq.innerHTML=[...items,...items].map(t=>`<span class="mq-item">${t}<span class="mq-sep">✦</span></span>`).join('');
}

function renderBlog(){
  const g=document.getElementById('blogGrid');
  if(!g)return;
  g.innerHTML=blogPosts.map(p=>{
    const pat=`<svg class="blog-pattern" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="bp${p.id}" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(${p.patternAngle||135} 150 90)"><line x1="0" y1="0" x2="30" y2="0" stroke="${p.color}" stroke-width="0.5" opacity="0.4"/></pattern></defs><rect width="300" height="180" fill="url(#bp${p.id})"/><circle cx="60" cy="90" r="45" fill="${p.color}" opacity="0.06"/><circle cx="240" cy="60" r="30" fill="${p.color}" opacity="0.08"/></svg>`;
    return `<article class="blog-card"><div class="blog-thumb">${pat}<span class="blog-cat">${p.category}</span></div><div class="blog-body"><div class="blog-date">${p.date}</div><h3 class="blog-ttl">${p.title}</h3><p class="blog-exc">${p.excerpt}</p><a href="${p.detail||('insights.html#'+p.slug)}" class="blog-read">Read Insight<svg viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div></article>`;
  }).join('');
}

function setYear(){
  const year=String(new Date().getFullYear());
  document.querySelectorAll('.footerYear,#footerYear').forEach(el=>{el.textContent=year;});
}

function initNav(){
  const nav=document.getElementById('mainNav');
  if(!nav)return;
  const check=()=>nav.classList.toggle('scrolled',window.scrollY>40);
  window.addEventListener('scroll',check,{passive:true});
  check();
}

function initMenu(){
  const btn=document.getElementById('menuBtn');
  const menu=document.getElementById('mobileMenu');
  if(!btn||!menu)return;
  let open=false;
  const setOpen=state=>{
    open=!!state;
    btn.classList.toggle('open',open);
    menu.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    document.body.style.overflow=open?'hidden':'';
    document.body.classList.toggle('menu-open',open);
    if(open){
      menu.setAttribute('tabindex','-1');
      setTimeout(()=>menu.focus({preventScroll:true}),60);
    }else{
      btn.focus({preventScroll:true});
    }
  };
  const toggle=()=>setOpen(!open);
  btn.addEventListener('click',toggle);
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(open)setOpen(false);}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open)setOpen(false);});
  window.addEventListener('resize',()=>{if(window.innerWidth>960&&open)setOpen(false);},{passive:true});
}

function initDataScroll(){
  document.querySelectorAll('[data-scroll-target]').forEach(el=>{
    el.addEventListener('click',e=>{
      const id=el.getAttribute('data-scroll-target');
      const target=id ? document.getElementById(id) : null;
      if(!target)return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      try{
        if(window.history && window.history.replaceState){
          window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
      }catch(err){}
    });
  });
}

function initReveal(){
  const els=document.querySelectorAll('.reveal');
  if(!els.length)return;
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('vis'));return;}
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target);}});
  },{threshold:.1,rootMargin:'0px 0px -30px 0px'});
  els.forEach(el=>obs.observe(el));
}

function initScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const target=document.querySelector(a.getAttribute('href'));
      if(!target)return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
}

/* Contact form handling. Sends data to the Next.js API route and only shows success after the server confirms receipt. */
function initForm(){
  const form=document.getElementById('contactForm');
  const fields=document.getElementById('fFields');
  const success=document.getElementById('fSuccess');
  const btn=document.getElementById('fSubmit');
  const status=document.getElementById('fStatus');
  if(!form||!fields||!success)return;

  function setElementHidden(el, hidden){
    if(!el) return;
    el.hidden=!!hidden;
    el.style.display=hidden?'none':'';
    el.setAttribute('aria-hidden', hidden?'true':'false');
  }

  function turnstileKeyLooksConfigured(siteKey){
    return Boolean(siteKey) && !/YOUR_|PLACEHOLDER|X{4,}|DISABLED/i.test(String(siteKey));
  }

  function loadTurnstileScript(){
    return new Promise((resolve,reject)=>{
      if(window.turnstile && typeof window.turnstile.render==='function'){
        resolve(window.turnstile);
        return;
      }
      const existing=document.querySelector('script[data-rozana-turnstile-api]');
      if(existing){
        existing.addEventListener('load',()=>resolve(window.turnstile),{once:true});
        existing.addEventListener('error',()=>reject(new Error('Cloudflare Turnstile script could not be loaded.')),{once:true});
        return;
      }
      const script=document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async=true;
      script.defer=true;
      script.dataset.rozanaTurnstileApi='true';
      script.addEventListener('load',()=>resolve(window.turnstile),{once:true});
      script.addEventListener('error',()=>reject(new Error('Cloudflare Turnstile script could not be loaded.')),{once:true});
      document.head.appendChild(script);
    });
  }

  async function activateTurnstileIfConfigured(){
    const widget=form.querySelector('.cf-turnstile');
    if(!widget) return;
    const siteKey=String(widget.dataset.sitekey||'').trim();
    const configured=turnstileKeyLooksConfigured(siteKey);
    const placeholder=form.querySelector('.rz-turnstile-placeholder');
    const previewNote=form.querySelector('[data-turnstile-config-note]') || form.querySelector('.f-help--muted');
    const wrap=form.querySelector('[data-security-widget]');

    if(!configured){
      setElementHidden(widget,true);
      setElementHidden(placeholder,true);
      setElementHidden(previewNote,false);
      if(wrap) wrap.setAttribute('data-turnstile-status','waiting-for-site-key');
      return;
    }

    setElementHidden(placeholder,true);
    setElementHidden(previewNote,true);
    setElementHidden(widget,false);
    if(wrap) wrap.setAttribute('data-turnstile-status','active');

    if(widget.dataset.rozanaTurnstileRendered==='true') return;

    try{
      const turnstileApi=await loadTurnstileScript();
      if(!turnstileApi || typeof turnstileApi.render!=='function') return;
      widget.innerHTML='';
      turnstileApi.render(widget,{
        sitekey:siteKey,
        theme:widget.dataset.theme||'dark',
        callback:function(){
          if(wrap) wrap.setAttribute('data-turnstile-status','verified');
        },
        'expired-callback':function(){
          if(wrap) wrap.setAttribute('data-turnstile-status','expired');
        },
        'error-callback':function(){
          if(wrap) wrap.setAttribute('data-turnstile-status','error');
        }
      });
      widget.dataset.rozanaTurnstileRendered='true';
    }catch(e){
      if(wrap) wrap.setAttribute('data-turnstile-status','error');
      console.warn('Rozana Turnstile could not be initialized.', e);
    }
  }

  async function loadTurnstileConfig(){
    const widget=form.querySelector('.cf-turnstile');
    if(!widget) return;
    const current=String(widget.dataset.sitekey||'').trim();
    const needsConfig=!turnstileKeyLooksConfigured(current);
    if(!needsConfig){
      activateTurnstileIfConfigured();
      return;
    }
    try{
      const response=await fetch('/api/contact-config',{headers:{'Accept':'application/json','X-Rozana-Config-Request':'contact'},cache:'force-cache'});
      const data=await response.json();
      if(data && data.turnstileSiteKey){ widget.dataset.sitekey=String(data.turnstileSiteKey).trim(); }
    }catch(e){}
    activateTurnstileIfConfigured();
  }
  loadTurnstileConfig();

  const endpoint=form.getAttribute('action')||form.dataset.endpoint||'/api/contact';
  const setStatus=(msg,type)=>{
    if(!status)return;
    status.textContent=msg||'';
    status.dataset.state=type||'';
  };
  const defaultSubmitText=btn ? btn.textContent : 'Send Message';
  const setBusy=state=>{
    if(!btn)return;
    btn.disabled=!!state;
    btn.setAttribute('aria-busy',state?'true':'false');
    btn.style.opacity=state?'.6':'';
    btn.textContent=state?'Sending...':defaultSubmitText;
  };
  const validate=()=>{
    let ok=true;
    form.querySelectorAll('[required]').forEach(el=>{
      if(el.disabled)return;
      const value=(el.value||'').trim();
      const bad=!value||(el.type==='email'&&value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      el.classList.toggle('err',bad);
      if(bad)ok=false;
    });
    return ok;
  };
  const getTurnstileToken=()=>{
    const token=form.querySelector('[name="cf-turnstile-response"]');
    return token ? token.value : '';
  };
  const resetTurnstile=()=>{
    try{ if(window.turnstile) window.turnstile.reset(); }catch(e){}
  };

  function ensureHidden(name, value){
    let input=form.querySelector('[name="'+name+'"]');
    if(!input){
      input=document.createElement('input');
      input.type='hidden';
      input.name=name;
      form.insertBefore(input, form.firstChild);
    }
    input.value=value||'';
  }

  function csrfEndpointFromContactEndpoint(){
    try{
      return new URL('/api/csrf', window.location.href).href;
    }catch(e){
      return '/api/csrf';
    }
  }

  async function ensureCsrfToken(){
    const existing=form.querySelector('[name="rz_csrf_token"]');
    if(existing && existing.value) return true;
    try{
      const response=await fetch(csrfEndpointFromContactEndpoint(),{method:'GET',credentials:'same-origin',headers:{'Accept':'application/json'},cache:'no-store'});
      const data=await response.json();
      if(!response.ok || !data || !data.csrfToken) return false;
      ensureHidden('rz_csrf_token', data.csrfToken);
      return true;
    }catch(e){
      return false;
    }
  }

  function detectSubmissionLanguage(){
    return {language:'en', locale:'en-US'};
  }

  function syncSubmissionContext(){
    const detected=detectSubmissionLanguage();
    ensureHidden('pageLanguage', detected.language);
    ensureHidden('formLanguage', detected.language);
    ensureHidden('pageLocale', detected.locale);
    ensureHidden('pagePath', window.location.pathname||'');
    ensureHidden('formPath', window.location.pathname||'');
    ensureHidden('pageUrl', window.location.href||'');
    ensureHidden('pageTitle', document.title||'');
  }
  syncSubmissionContext();


  const phoneField=form.querySelector('[name="phone"]');
  const contactMethodField=form.querySelector('[name="contactMethod"]');
  const contactMethodHelp=document.getElementById('contactMethodHelp');
  const serviceField=form.querySelector('[name="service"]');
  const scopeField=form.querySelector('[name="scope"]');
  const websiteField=form.querySelector('[name="projectWebsite"]');
  const websiteHelp=document.getElementById('websiteHelp');
  const landingFields=document.getElementById('landingReviewFields');
  const instagramField=form.querySelector('[name="instagramUrl"]');
  const sectorField=form.querySelector('[name="businessSector"]');
  const scopeHelp=document.getElementById('scopeHelp');

  const serviceRules={
    'Market & Competitor Analysis':{
      title:'Market & Competitor Analysis selected',
      desc:'Research, positioning, competitor review and market opportunity support.',
      scopes:['Market & competitor analysis','Strategy & predictive insights','Ongoing monthly support','Discovery / not sure yet']
    },
    'Strategy & Predictive Insights':{
      title:'Strategy & Predictive Insights selected',
      desc:'Strategic planning, forecasting logic and decision support.',
      scopes:['Strategy & predictive insights','Data-driven decision support','Ongoing monthly support','Discovery / not sure yet']
    },
    'Process & Operational Analysis':{
      title:'Process & Operational Analysis selected',
      desc:'Workflow, process, operational gap and execution review.',
      scopes:['Process & operational analysis','Data-driven decision support','Ongoing monthly support','Discovery / not sure yet']
    },
    'Data-Driven Decision Making':{
      title:'Data-Driven Decision Making selected',
      desc:'Decision support, reporting logic and practical business intelligence.',
      scopes:['Data-driven decision support','Strategy & predictive insights','Ongoing monthly support','Discovery / not sure yet']
    },
    'SEO & Organic Growth':{
      title:'SEO & Organic Growth selected',
      desc:'Search visibility, website structure, content optimization and organic growth support.',
      scopes:['SEO & organic growth','Content marketing','Web design & development','Ongoing monthly support','Discovery / not sure yet']
    },
    'Social Media Marketing':{
      title:'Social Media Marketing selected',
      desc:'Social media strategy, content direction, audience insight and engagement support.',
      scopes:['Social media marketing','Content marketing','Ongoing monthly support','Discovery / not sure yet']
    },
    'Content Marketing':{
      title:'Content Marketing selected',
      desc:'Content strategy, creation, calendar planning, distribution and SEO content support.',
      scopes:['Content marketing','SEO & organic growth','Social media marketing','Ongoing monthly support','Discovery / not sure yet']
    },
    'PPC & Paid Media Management':{
      title:'PPC & Paid Media Management selected',
      desc:'Paid search, social ads, campaign setup, targeting and performance tracking.',
      scopes:['PPC & paid media','Landing page design & optimization','Ongoing monthly support','Discovery / not sure yet']
    },
    'Web Design & Development':{
      title:'Web Design & Development selected',
      desc:'Custom website design, UX, front-end, back-end, CMS, optimization and maintenance.',
      scopes:['Web design & development','Landing page design & optimization','SEO & organic growth','Ongoing monthly support','Discovery / not sure yet']
    },
    'Landing Page Design and Optimization':{
      requestType:'landing_page_design_optimization',
      landing:true,
      title:'Landing Page Design and Optimization selected',
      desc:'Landing page development, conversion path, contact actions and page optimization.',
      scopes:['Landing page design & optimization','PPC & paid media','SEO & organic growth','Ongoing monthly support','Discovery / not sure yet']
    },
    'Mobile App Development':{
      title:'Mobile App Development selected',
      desc:'App strategy, UI/UX, iOS and Android development, backend APIs, testing and support.',
      scopes:['Mobile app development','Process & operational analysis','Ongoing monthly support','Discovery / not sure yet']
    },
    'Email Marketing':{
      title:'Email Marketing selected',
      desc:'Email strategy, campaign design, automation, testing, reporting and deliverability support.',
      scopes:['Email marketing','Landing page design & optimization','Ongoing monthly support','Discovery / not sure yet']
    },
    'General Consulting Inquiry':{
      title:'General Consulting Inquiry selected',
      desc:'Broad business intelligence or digital growth inquiry.',
      scopes:['Market & competitor analysis','Strategy & predictive insights','Process & operational analysis','Data-driven decision support','SEO & organic growth','Social media marketing','Content marketing','PPC & paid media','Web design & development','Landing page design & optimization','Mobile app development','Email marketing','Ongoing monthly support','Discovery / not sure yet']
    },
    'Not Sure Yet':{
      title:'Not Sure Yet selected',
      desc:'Keep the request simple and describe your goal in the message.',
      scopes:['Discovery / not sure yet']
    }
  };

  const setGroupState=(el,enabled)=>{
    if(!el)return;
    const group=el.closest('.f-group');
    el.disabled=!enabled;
    if(group) group.classList.toggle('is-context-disabled',!enabled);
    if(!enabled) el.classList.remove('err');
  };

  const setRequiredVisual=(el,required)=>{
    if(!el)return;
    if(required) el.setAttribute('required','required');
    else el.removeAttribute('required');
    const group=el.closest('.f-group');
    const label=group ? group.querySelector('.f-label') : null;
    if(label){
      label.dataset.required=required?'true':'false';
      let star=label.querySelector('.req-star');
      if(required && !star){
        star=document.createElement('span');
        star.className='req-star';
        star.setAttribute('aria-hidden','true');
        star.textContent=' *';
        label.appendChild(star);
      }
      if(!required && star) star.remove();
    }
  };

  const syncContactMethod=()=>{
    if(!contactMethodField || !phoneField) return;
    const hasPhone=String(phoneField.value||'').trim().length>0;
    contactMethodField.disabled=!hasPhone;
    if(hasPhone){
      contactMethodField.setAttribute('required','required');
      if(contactMethodHelp) contactMethodHelp.textContent='Choose whether you prefer a call, WhatsApp, Telegram, or email contact.';
    }else{
      contactMethodField.removeAttribute('required');
      contactMethodField.value='';
      contactMethodField.classList.remove('err');
      if(contactMethodHelp) contactMethodHelp.textContent='Enter your phone number first, then choose how you prefer to be contacted.';
    }
    const group=contactMethodField.closest('.f-group');
    if(group) group.classList.toggle('is-context-disabled',!hasPhone);
  };

  const currentRule=()=> serviceField ? (serviceRules[serviceField.value]||null) : null;

  const syncServicePath=()=>{
    const rule=currentRule();
    const serviceSelected=!!(serviceField && serviceField.value);
    const params=new URLSearchParams(window.location.search||'');
    const request=params.get('request')||'';
    const reviewContext=request==='landing-page-review'||request==='free-landing-page-review';
    const landingSelected=!!(rule && rule.landing);
    if(scopeField){
      scopeField.disabled=!serviceSelected;
      const scopeGroup=scopeField.closest('.f-group');
      if(scopeGroup) scopeGroup.classList.toggle('is-context-disabled',!serviceSelected);
      Array.from(scopeField.options).forEach(opt=>{
        if(!opt.value){ opt.disabled=false; return; }
        opt.disabled=!!(rule && rule.scopes && !rule.scopes.includes(opt.value));
      });
      if(rule && scopeField.value && !rule.scopes.includes(scopeField.value)){
        scopeField.value='';
      }
      if(!serviceSelected) scopeField.value='';
      if(landingSelected && !scopeField.value && rule.scopes && rule.scopes.includes('Landing page design & optimization')) scopeField.value='Landing page design & optimization';
    }

    setGroupState(websiteField, true);
    if(websiteField){
      websiteField.removeAttribute('required');
      websiteField.disabled=false;
    }
    if(websiteHelp){
      websiteHelp.textContent='Share your website, Instagram, LinkedIn, Google Business Profile, app link, or any relevant page so we can understand your business better.';
    }

    // Business Field is required for all requests. Instagram is required only when it is relevant
    // to the selected service path, so BI / market-analysis inquiries do not have unnecessary friction.
    if(landingFields) landingFields.hidden=false;
    const instagramRequired=!!(landingSelected || (serviceField && ['Social Media Marketing','Landing Page Design and Optimization'].includes(serviceField.value)));
    if(instagramField){
      instagramField.disabled=false;
      setRequiredVisual(instagramField, instagramRequired);
      const group=instagramField.closest('.f-group');
      if(group) group.classList.remove('is-context-disabled');
    }
    if(sectorField){
      sectorField.disabled=false;
      setRequiredVisual(sectorField, true);
      const group=sectorField.closest('.f-group');
      if(group) group.classList.remove('is-context-disabled');
    }

    const requestType=form.querySelector('[name="requestType"]');
    if(requestType){
      requestType.value=landingSelected && reviewContext ? 'free_landing_page_review' : (rule && rule.requestType ? rule.requestType : '');
    }

    if(scopeHelp){
      scopeHelp.textContent=rule ? 'Only the scope options relevant to the selected service are available.' : 'Select Service Interest first. Unrelated scope options will be disabled.';
    }
  };

  const isLandingReviewSelected=()=>{
    const rule=currentRule();
    return !!(rule && rule.landing);
  };

  const syncLandingReviewFields=syncServicePath;


  const sanitizeRequestSource=(rawSource,fallbackReferrer)=>{
    const allowedTokens=['landing-page-oman','free-landing-page-review','landing-page-review','seo-review','contact-page','website','instagram','google-business-profile','email','whatsapp','direct'];
    const cleanString=(value)=>String(value||'').trim().replace(/[\r\n\t]/g,' ').slice(0,240);
    const sanitizeOne=(value)=>{
      const clean=cleanString(value);
      if(!clean)return '';
      const lower=clean.toLowerCase();
      if(/^[a-z0-9_-]{2,80}$/.test(lower) && allowedTokens.includes(lower))return lower;
      try{
        const url=new URL(clean, window.location.origin);
        const host=(url.hostname||'').toLowerCase();
        const current=(window.location.hostname||'').toLowerCase();
        const allowedHosts=['rozanabi.com','www.rozanabi.com',current,'localhost','127.0.0.1','::1'].filter(Boolean);
        if(!allowedHosts.includes(host))return '';
        const path=(url.pathname||'/').replace(/\/+/g,'/');
        if(path.includes('..'))return '';
        if(path==='/' || /^(?:\/|\/de\/|\/ar\/)[A-Za-z0-9._~\/-]*(?:\.html)?$/.test(path))return path;
      }catch(e){
        if(clean.charAt(0)==='/' && !clean.includes('..') && /^(?:\/|\/de\/|\/ar\/)[A-Za-z0-9._~\/-]*(?:\.html)?$/.test(clean))return clean;
      }
      return '';
    };
    return sanitizeOne(rawSource)||sanitizeOne(fallbackReferrer)||'';
  };

  const applyContactContext=()=>{
    const params=new URLSearchParams(window.location.search||'');
    const request=params.get('request')||'';
    const source=sanitizeRequestSource(params.get('source'),document.referrer);
    const requestType=form.querySelector('[name="requestType"]');
    const requestSource=form.querySelector('[name="requestSource"]');
    if(requestSource) requestSource.value=source;
    if(request==='landing-page-review'||request==='free-landing-page-review'){
      if(serviceField) serviceField.value='Landing Page Design and Optimization';
      if(requestType) requestType.value='free_landing_page_review';
      const note=document.getElementById('contactContextNote');
      if(note){
        note.hidden=false;
        note.innerHTML='<strong>Landing Page Review selected</strong><span>Share your Instagram, website if available, Google Business link if available, and what action you want customers to take: WhatsApp, call, location, booking or lead form.</span>';
      }
      const message=form.querySelector('[name="message"]');
      if(message && !message.value){
        message.placeholder='Tell us whether you need a simple landing page, Google Business setup, WhatsApp / call / location buttons, demo layout, or a better link for Instagram bio.';
      }
    }
    if(request==='seo-review'){
      if(requestType) requestType.value='seo_organic_growth';
      const service=form.querySelector('[name="service"]');
      if(service) service.value='SEO & Organic Growth';
      const scope=form.querySelector('[name="scope"]');
      if(scope) scope.value='SEO & organic growth';
      const note=document.getElementById('contactContextNote');
      if(note) note.hidden=false;
      const message=form.querySelector('[name="message"]');
      if(message && !message.value){
        message.placeholder='Tell us what you want reviewed: website visibility, SEO setup, tracking, content structure, or launch readiness.';
      }
    }
    syncLandingReviewFields();
  };
  applyContactContext();
  syncContactMethod();
  if(phoneField) phoneField.addEventListener('input',syncContactMethod);
  if(contactMethodField) contactMethodField.addEventListener('change',()=>contactMethodField.classList.remove('err'));
  if(serviceField) serviceField.addEventListener('change',syncLandingReviewFields);

  form.querySelectorAll('.f-input,.f-select,.f-textarea').forEach(el=>el.addEventListener('input',()=>el.classList.remove('err')));
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    setStatus('', '');
    syncSubmissionContext();
    if(!validate()){
      setStatus('Please complete all required fields before sending.', 'error');
      return;
    }

    // Only require Turnstile when the real Cloudflare widget is enabled.
    const turnstileWidget=form.querySelector('.cf-turnstile');
    const siteKey=turnstileWidget ? String(turnstileWidget.dataset.sitekey||'') : '';
    const turnstileConfigured=turnstileKeyLooksConfigured(siteKey);
    if(turnstileConfigured && !getTurnstileToken()){
      setStatus('Please complete the security verification before sending.', 'error');
      return;
    }

    const csrfReady=await ensureCsrfToken();
    if(!csrfReady){
      setStatus('Security token could not be prepared. Please refresh the page and try again.', 'error');
      return;
    }

    trackRozanaEvent('form_submit_attempt',{form_id:form.id||'contactForm', endpoint:endpoint});
    setBusy(true);

    try{
      const response=await fetch(endpoint,{
        method:'POST',
        body:new FormData(form),
        headers:{'Accept':'application/json'},
        credentials:'same-origin'
      });
      let data={};
      try{data=await response.json();}catch(jsonErr){}

      if(!response.ok || data.ok===false){
        const message=data.message||'The message could not be sent. Please try again or email contact@rozanabi.com directly.';
        trackRozanaEvent('form_submit_error',{form_id:form.id||'contactForm', status:response.status, message:message});
        setStatus(message, 'error');
        resetTurnstile();
        return;
      }

      trackRozanaEvent('form_submit_success',{form_id:form.id||'contactForm', status:response.status});
      if(data.redirect){
        try{
          const redirectUrl=new URL(String(data.redirect), window.location.origin);
          if(redirectUrl.origin===window.location.origin && ['/thank-you','/thank-you.html'].includes(redirectUrl.pathname)){
            window.location.href=redirectUrl.pathname+redirectUrl.search+redirectUrl.hash;
            return;
          }
        }catch(e){}
      }
      fields.classList.add('hidden');
      success.classList.add('show');
      setStatus(data.message||'Your inquiry has been received.', 'success');
      form.reset();
      resetTurnstile();
    }catch(err){
      trackRozanaEvent('form_submit_error',{form_id:form.id||'contactForm', status:'network_error'});
      setStatus('Connection error. Please try again or email contact@rozanabi.com directly.', 'error');
      resetTurnstile();
    }finally{
      setBusy(false);
    }
  });
}

/* Cookie consent - stores explicit cookie preferences in localStorage.
   Essential cookies are always active. Analytics and marketing only load after explicit consent. */
function initCookie(){
  if(window.RozanaCookieConsentGlobal && window.RozanaCookieConsentGlobal.active) return;
  const banner=document.getElementById('cookieBanner');
  if(!banner)return;
  const prefs=document.getElementById('cookiePrefs');
  const analytics=document.getElementById('cookieAnalytics');
  const marketing=document.getElementById('cookieMarketing');
  const manage=document.getElementById('cookieManage');
  const save=document.getElementById('cookieSave');
  const accept=document.getElementById('cookieAccept');
  const reject=document.getElementById('cookieReject');
  const close=document.getElementById('cookieClose');
  const COOKIE_KEY='rz-cookie-consent-v54-80';

  const readStored=()=>{
    try{
      const raw=localStorage.getItem(COOKIE_KEY);
      return raw ? JSON.parse(raw) : null;
    }catch(e){
      return null;
    }
  };

  const revealSaveButton=()=>{
    if(!save) return;
    save.classList.remove('is-hidden-init');
    save.style.display='inline-flex';
  };

  const setDefaultPreferenceChecks=()=>{
    const existing=readStored();
    if(existing){
      if(analytics) analytics.checked=!!existing.analytics;
      if(marketing) marketing.checked=!!existing.marketing;
      return;
    }
    // Default UI position for Manage Choices: monitoring and marketing are selected,
    // and the visitor can switch either category off before saving.
    if(analytics) analytics.checked=true;
    if(marketing) marketing.checked=true;
  };

  const openPreferences=()=>{
    setDefaultPreferenceChecks();
    banner.classList.add('show');
    if(prefs) prefs.classList.add('show');
    if(manage) manage.style.display='none';
    revealSaveButton();
  };

  const closeBanner=()=>{
    banner.classList.remove('show');
  };

  const store=(state)=>{
    closeBanner();
    const payload=Object.assign({essential:true,analytics:false,marketing:false,choice:'custom',version:'v54.76',date:new Date().toISOString()},state||{});
    try{localStorage.setItem(COOKIE_KEY,JSON.stringify(payload));}catch(e){}
    trackRozanaEvent('cookie_consent_update',{choice:payload.choice, analytics:!!payload.analytics, marketing:!!payload.marketing});
    try{window.dispatchEvent(new CustomEvent('rozana:cookie-consent-updated',{detail:payload}));}catch(e){}
    if(window.RozanaAnalytics&&typeof window.RozanaAnalytics.load==='function'){window.RozanaAnalytics.load();}
  };

  const existing=readStored();
  if(existing){
    if(existing.version!=='v54.76'){
      existing.version='v54.76';
      try{localStorage.setItem(COOKIE_KEY,JSON.stringify(existing));}catch(e){}
    }
    if(analytics) analytics.checked=!!existing.analytics;
    if(marketing) marketing.checked=!!existing.marketing;
  }else{
    if(analytics) analytics.checked=true;
    if(marketing) marketing.checked=true;
    setTimeout(()=>banner.classList.add('show'),900);
  }

  accept&&accept.addEventListener('click',()=>store({analytics:true,marketing:true,choice:'accepted_all'}));
  reject&&reject.addEventListener('click',()=>store({analytics:false,marketing:false,choice:'rejected_all'}));
  close&&close.addEventListener('click',()=>{
    if(readStored()) closeBanner();
    else store({analytics:false,marketing:false,choice:'dismissed'});
  });
  manage&&manage.addEventListener('click',openPreferences);
  save&&save.addEventListener('click',()=>store({analytics:!!(analytics&&analytics.checked),marketing:!!(marketing&&marketing.checked),choice:'saved_preferences'}));
}
function initInsightFilters(){
  const hub=document.getElementById('content-hub');
  if(!hub)return;
  const filters=Array.from(hub.querySelectorAll('.hub-filter'));
  const cards=Array.from(hub.querySelectorAll('.hub-card'));
  if(!filters.length||!cards.length)return;

  const normalize=v=>String(v||'').trim().toLowerCase();
  const showCard=(card,show)=>{
    card.classList.toggle('is-hidden',!show);
    card.hidden=!show;
    card.setAttribute('aria-hidden',show?'false':'true');
  };
  const applyFilter=(filterValue)=>{
    const selected=normalize(filterValue)||'all';
    filters.forEach(btn=>{
      const active=normalize(btn.dataset.filter)===selected;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });
    cards.forEach(card=>{
      const categories=normalize(card.dataset.category).split(/\s+/).filter(Boolean);
      const show=selected==='all'||categories.includes(selected);
      showCard(card,show);
    });
    hub.dataset.activeFilter=selected;
  };

  filters.forEach(btn=>{
    btn.setAttribute('aria-pressed',btn.classList.contains('active')?'true':'false');
    btn.addEventListener('click',e=>{
      e.preventDefault();
      applyFilter(btn.dataset.filter);
      trackRozanaEvent('insight_filter_click',{filter:String(btn.dataset.filter||'all')});
    });
  });

  // If the user lands on a specific insight card from another page, keep all cards visible
  // so the target article can be reached. Otherwise default to All.
  applyFilter('all');
}




function initSitewideScrollFx(){
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const addFx = (el, variant, delay, distance)=>{
    if(!el || el.classList.contains('scroll-fx-ignore')) return;
    if(el.classList.contains('scroll-fx')) return;
    el.classList.add('scroll-fx');
    if(variant) el.classList.add('scroll-fx--' + variant);
    if(delay != null) el.style.setProperty('--fx-delay', delay + 'ms');
    if(distance != null) el.style.setProperty('--fx-distance', distance + 'px');
  };

  const assignGroup = (nodes, variantCycle) => {
    const list = Array.from(nodes).filter(el=>{
      if(!el || !el.tagName) return false;
      if(el.closest('footer')) return false;
      if(el.matches('script,style,link,meta')) return false;
      if(el.classList.contains('scroll-fx-ignore')) return false;
      const txt = (el.textContent || '').trim();
      const visual = el.querySelector && el.querySelector('img,svg,picture,video');
      return txt.length > 18 || !!visual;
    });
    list.forEach((el, idx)=>{
      const variant = Array.isArray(variantCycle) ? variantCycle[idx % variantCycle.length] : (variantCycle || 'up');
      addFx(el, variant, Math.min(idx, 7) * 70, idx < 3 ? 28 : 22);
    });
  };

  const pick = (selector, variant='up') => {
    document.querySelectorAll(selector).forEach((el, idx)=>{
      addFx(el, variant, (idx % 6) * 55, 24);
    });
  };

  // Section-level intros and heroes
  pick('main section > .container > .sec-head, main section > .container > .split-head, main section > .container > .section-head, main section > .container > .section-intro', 'up');
  pick('header.hero .hero-copy, header.hero .hero-text, header.hero .hero-intro', 'left');
  pick('header.hero .hero-actions, header.hero .hero-cta, header.hero .btn-row', 'up');
  pick('header.hero .hero-media, header.hero .hero-graphic, header.hero .hero-visual', 'right');

  // Targeted cards/components used around the site
  [
    '.why-card','.work-step','.pro-card','.industry-note','.hub-card','.brief-card','.brief-link',
    '.contact-card','.contact-method','.contact-option','.f-group','.faq-item','.faq-card',
    '.about-brand-panel','.about-insight-panel','.about-card','.about-value-card','.cta-card',
    '.use-case-card','.case-study-card','.case-card','.blog-card','.article-card','.demo-card',
    '.pricing-card','.legal-card','.policy-card','.trusted-logo-item','.feature-card','.service-card'
  ].forEach(sel => {
    const nodes = document.querySelectorAll(sel);
    if(nodes.length) assignGroup(nodes, ['up','up','up','scale']);
  });

  // Generic grids / rows - reveal direct children professionally
  document.querySelectorAll('[class*="grid"], [class*="cards"], .mini-list, .logo-row, .cards-row, .stats-grid').forEach(grid=>{
    const items = Array.from(grid.children).filter(el=>{
      if(!el || !el.tagName) return false;
      if(el.matches('script,style')) return false;
      if(el.classList.contains('scroll-fx-ignore')) return false;
      const txt = (el.textContent || '').trim();
      const visual = el.querySelector && el.querySelector('img,svg,picture,video');
      return txt.length > 14 || !!visual;
    });
    if(items.length >= 2 && items.length <= 12){
      assignGroup(items, ['up','left','right','up']);
    }
  });

  // Common content blocks inside sections
  document.querySelectorAll('main section .container > *').forEach((el, idx)=>{
    if(el.classList && !el.classList.contains('scroll-fx') && !el.matches('.hero-content,.hero-bg,.scroll-ind') && !el.closest('.pro-grid,[class*="grid"],[class*="cards"]')){
      const txt = (el.textContent || '').trim();
      if(txt.length > 28 || (el.querySelector && el.querySelector('img,svg,picture,video'))){
        addFx(el, idx % 2 ? 'up' : 'fade', (idx % 5) * 50, 20);
      }
    }
  });

  const revealEls = document.querySelectorAll('.scroll-fx');
  if(reduceMotion || !('IntersectionObserver' in window)){
    revealEls.forEach(el=>el.classList.add('is-inview'));
  } else {
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -10% 0px'});
    revealEls.forEach(el=>io.observe(el));
  }

  // Subtle parallax for visuals only
  const parallaxSelectors = [
    '#home .home-hero-ribbon--cinematic',
    'header.hero .hero-bg .glow',
    '.about-brand-panel',
    '.about-insight-panel',
    '.mission-banner',
    '.cta-card__media',
    '.about-hero-image',
    '.about-intro-banner',
    '.insight-aperture',
    '.not-found-graphic',
    '.thank-you-graphic',
    '.page-hero .hero-visual',
    '.page-hero .hero-graphic'
  ].join(',');

  const parallaxEls = Array.from(document.querySelectorAll(parallaxSelectors)).filter(el=>el && !el.classList.contains('parallax-soft-ignore'));
  if(!reduceMotion && parallaxEls.length && window.innerWidth > 960){
    let ticking = false;
    const clamp = (n, min, max)=>Math.min(max, Math.max(min, n));
    const updateParallax = ()=>{
      const vh = window.innerHeight || 1;
      parallaxEls.forEach((el, idx)=>{
        const rect = el.getBoundingClientRect();
        if(rect.bottom < -80 || rect.top > vh + 80) return;
        const center = rect.top + rect.height/2;
        const distance = (center - vh/2) / vh;
        const y = clamp(distance * -16, -16, 16);
        const x = clamp(((idx % 2 === 0 ? 1 : -1) * distance * -6), -8, 8);
        const s = 1 + clamp((1 - Math.abs(distance)) * .012, 0, .012);
        el.style.setProperty('--parallax-y', y.toFixed(2) + 'px');
        el.style.setProperty('--parallax-x', x.toFixed(2) + 'px');
        el.style.setProperty('--parallax-scale', s.toFixed(4));
        el.classList.add('parallax-soft');
      });
      ticking = false;
    };
    const onScroll = ()=>{
      if(!ticking){
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      }
    };
    updateParallax();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll, {passive:true});
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  setYear();
  renderBlog();
  renderMarquee();
  initNav();
  initMenu();
  initReveal();
  initSitewideScrollFx();
  initScroll();
  initDataScroll();
  initEventTracking();
  initForm();
  initCookie();
  initInsightFilters();
});


/* v94: reliable Insights hub filter pills */
(function(){
  function initInsightFilters(){
    var filterBar = document.querySelector('.hub-filters');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.hub-card[data-category]'));
    if(!filterBar || !cards.length) return;

    var buttons = Array.prototype.slice.call(filterBar.querySelectorAll('.hub-filter[data-filter]'));

    function applyFilter(value){
      cards.forEach(function(card){
        var categories = (card.getAttribute('data-category') || '').split(/\s+/);
        var shouldShow = value === 'all' || categories.indexOf(value) !== -1;
        card.classList.toggle('is-hidden', !shouldShow);
        card.style.display = shouldShow ? '' : 'none';
      });

      buttons.forEach(function(btn){
        var active = btn.getAttribute('data-filter') === value;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    buttons.forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });

    var current = buttons.find(function(btn){ return btn.classList.contains('active'); });
    applyFilter(current ? current.getAttribute('data-filter') : 'all');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initInsightFilters);
  } else {
    initInsightFilters();
  }
})();






/* v53.69 reopen cookie settings from footer and cookie policy page */
(function(){
  function bindCookieSettingsButtons(){
    if(window.RozanaCookieConsentGlobal && window.RozanaCookieConsentGlobal.active) return;
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-cookie-settings]'));
    if(!buttons.length) return;
    buttons.forEach(function(button){
      if(button.dataset.cookieSettingsBound === 'true') return;
      button.dataset.cookieSettingsBound = 'true';
      button.addEventListener('click', function(){
        var banner = document.getElementById('cookieBanner');
        var prefs = document.getElementById('cookiePrefs');
        var manage = document.getElementById('cookieManage');
        var save = document.getElementById('cookieSave');
        if(!banner) return;
        try{
          var raw = localStorage.getItem('rz-cookie-consent-v54-80');
          var existing = raw ? JSON.parse(raw) : null;
          var analytics = document.getElementById('cookieAnalytics');
          var marketing = document.getElementById('cookieMarketing');
          if(analytics) analytics.checked = existing ? !!existing.analytics : true;
          if(marketing) marketing.checked = existing ? !!existing.marketing : true;
        }catch(err){}
        banner.classList.add('show');
        if(prefs) prefs.classList.add('show');
        if(manage) manage.style.display = 'none';
        if(save){ save.classList.remove('is-hidden-init'); save.style.display = 'inline-flex'; }
      });
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bindCookieSettingsButtons);
  } else {
    bindCookieSettingsButtons();
  }
})();
