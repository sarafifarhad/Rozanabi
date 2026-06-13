const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.main-nav a');

function setHeaderState() {
  header.classList.toggle('scrolled', window.scrollY > 18);
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

reveals.forEach((element) => observer.observe(element));


// Product detail modal
const productModal = document.getElementById('productModal');
const modalProductImage = document.getElementById('modalProductImage');
const modalProductTitle = document.getElementById('modalProductTitle');
const modalProductType = document.getElementById('modalProductType');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalProductSpecs = document.getElementById('modalProductSpecs');
const modalWhatsApp = document.getElementById('modalWhatsApp');
const modalShare = document.getElementById('modalShare');
const shareNote = document.getElementById('shareNote');
let activeProduct = null;

function openProductModal(card) {
  if (!productModal || !card || !modalProductImage || !modalProductTitle || !modalProductType || !modalProductDescription || !modalWhatsApp) return;

  activeProduct = {
    title: card.dataset.productTitle || '',
    size: card.dataset.productSize || '',
    type: card.dataset.productType || '',
    notes: card.dataset.productNotes || '',
    best: card.dataset.productBest || '',
    image: card.dataset.productImage || '',
    description: card.dataset.productDescription || '',
    whatsapp: card.dataset.productWhatsapp || '',
    share: card.dataset.productShare || '',
    slug: card.dataset.productSlug || '',
    productUrl: card.dataset.productUrl || '',
    shareImage: card.dataset.productShareImage || ''
  };

  modalProductImage.src = activeProduct.image;
  modalProductImage.alt = activeProduct.title;
  modalProductTitle.textContent = activeProduct.title;
  modalProductType.textContent = activeProduct.type;
  if (modalProductSpecs) {
    modalProductSpecs.textContent = '';
    [
      ['Product Name', activeProduct.title],
      ['Size / ML', activeProduct.size],
      ['Type', activeProduct.type],
      ['Notes', activeProduct.notes],
      ['Best For', activeProduct.best]
    ].forEach(([label, value]) => {
      const item = document.createElement('div');
      const labelNode = document.createElement('span');
      const valueNode = document.createElement('strong');
      labelNode.textContent = label;
      valueNode.textContent = value;
      item.append(labelNode, valueNode);
      modalProductSpecs.appendChild(item);
    });
  }
  modalProductDescription.textContent = activeProduct.description;
  const productPageUrl = `${window.location.origin}${activeProduct.productUrl || `${window.location.pathname}#product=${activeProduct.slug || ''}`}`;
  const productImageUrl = activeProduct.shareImage
    ? `${window.location.origin}/${activeProduct.shareImage.replace(/^\//, '')}`
    : (activeProduct.image ? `${window.location.origin}/${activeProduct.image.replace(/^\//, '')}` : '');

  const whatsappProductMessage = [
    "Hello Afrouz Perfumes",
    "",
    "I would like to order this product:",
    productPageUrl ? `🔗 Product Link: ${productPageUrl}` : "",
    productImageUrl ? `🖼 Product Image: ${productImageUrl}` : "",
    "",
    `🧴 Product: ${activeProduct.title}`,
    `📏 Size: ${activeProduct.size}`,
    `✨ Type: ${activeProduct.type}`,
    `🌿 Notes: ${activeProduct.notes}`,
    `🎁 Best For: ${activeProduct.best}`,
    "",
    "Please send me the price, availability, and delivery/pickup options."
  ].filter(Boolean).join("
");

  modalWhatsApp.href = `https://wa.me/96879207798?text=${encodeURIComponent(whatsappProductMessage)}`;
  if (shareNote) shareNote.textContent = '';

  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-product-title]').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('.details-link')) event.preventDefault();
    openProductModal(card);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProductModal(card);
    }
  });
});

document.querySelectorAll('[data-product-close]').forEach((button) => {
  button.addEventListener('click', closeProductModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeProductModal();
});

if (modalShare) {
  modalShare.addEventListener('click', async () => {
    if (!activeProduct) return;
    const shareUrl = `${window.location.origin}${activeProduct.productUrl || `${window.location.pathname}#product=${activeProduct.slug || ''}`}`;
    const shareImageUrl = activeProduct.shareImage
      ? `${window.location.origin}/${activeProduct.shareImage.replace(/^\//, '')}`
      : (activeProduct.image ? `${window.location.origin}/${activeProduct.image.replace(/^\//, '')}` : '');
    const shareText = [
      `${activeProduct.title} | Afrouz Perfumes`,
      activeProduct.size ? `Size: ${activeProduct.size}` : '',
      activeProduct.type ? `Type: ${activeProduct.type}` : '',
      activeProduct.notes ? `Notes: ${activeProduct.notes}` : '',
      activeProduct.best ? `Best For: ${activeProduct.best}` : '',
      '',
      shareUrl
    ].filter(Boolean).join("\n");

    try {
      if (navigator.share) {
        let sharedWithImage = false;
        if (shareImageUrl && navigator.canShare) {
          try {
            const response = await fetch(shareImageUrl, { cache: 'force-cache' });
            const blob = await response.blob();
            const file = new File([blob], `${activeProduct.slug || 'afrouz-product'}.jpg`, { type: blob.type || 'image/jpeg' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({ title: `${activeProduct.title} | Afrouz Perfumes`, text: shareText, url: shareUrl, files: [file] });
              sharedWithImage = true;
            }
          } catch (imageShareError) {
            sharedWithImage = false;
          }
        }
        if (!sharedWithImage) {
          await navigator.share({ title: `${activeProduct.title} | Afrouz Perfumes`, text: shareText, url: shareUrl });
        }
        if (shareNote) shareNote.textContent = 'Ready to share with product image and details.';
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText}\n${shareImageUrl ? `Image: ${shareImageUrl}` : ''}`.trim());
        if (shareNote) shareNote.textContent = 'Product details copied. You can share it with friends.';
      } else {
        if (shareNote) shareNote.textContent = 'Copy this product link and share it with friends.';
      }
    } catch (error) {
      if (shareNote) shareNote.textContent = 'Sharing was cancelled.';
    }
  });
}


function openProductFromHash() {
  const hash = window.location.hash || '';
  const match = hash.match(/^#product=([^&]+)/);
  if (!match) return;

  const slug = decodeURIComponent(match[1]);
  const targetCard = document.querySelector(`[data-product-slug="${CSS.escape(slug)}"]`);
  if (targetCard) {
    setTimeout(() => openProductModal(targetCard), 250);
  }
}

window.addEventListener('hashchange', openProductFromHash);
openProductFromHash();


// Smart WhatsApp opening:
// Mobile: open WhatsApp app directly.
// Desktop: try WhatsApp desktop app first, then fallback to WhatsApp Web.
(function () {
  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent || "");
  }

  function parseWhatsAppLink(url) {
    try {
      const parsed = new URL(url, window.location.href);
      let phone = "";
      let text = "";

      if (parsed.hostname.includes("wa.me")) {
        phone = parsed.pathname.replace(/\D/g, "");
        text = parsed.searchParams.get("text") || "";
      } else if (parsed.hostname.includes("whatsapp.com")) {
        phone = parsed.searchParams.get("phone") || "";
        text = parsed.searchParams.get("text") || "";
      }

      return { phone, text };
    } catch (error) {
      return { phone: "96879207798", text: "" };
    }
  }

  function openSmartWhatsApp(event) {
    const link = event.target.closest('a[href*="wa.me"], a[href*="whatsapp.com/send"]');
    if (!link) return;

    event.preventDefault();

    const data = parseWhatsAppLink(link.href);
    const phone = data.phone || "96879207798";
    const encodedText = encodeURIComponent(data.text || "");

    const appUrl = `whatsapp://send?phone=${phone}${encodedText ? `&text=${encodedText}` : ""}`;
    const mobileFallback = `https://wa.me/${phone}${encodedText ? `?text=${encodedText}` : ""}`;
    const desktopFallback = `https://web.whatsapp.com/send?phone=${phone}${encodedText ? `&text=${encodedText}` : ""}`;

    if (isMobileDevice()) {
      window.location.href = appUrl;
      window.setTimeout(function () {
        window.location.href = mobileFallback;
      }, 900);
      return;
    }

    window.location.href = appUrl;
    window.setTimeout(function () {
      window.location.href = desktopFallback;
    }, 1000);
  }

  document.addEventListener("click", openSmartWhatsApp);
})();
