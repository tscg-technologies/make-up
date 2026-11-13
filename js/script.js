/**
 * MAKEUP BUSINESS - Main JavaScript
 * Vanilla JS for Mobile Navigation, Sticky Header, FAQ Accordion,
 * Category Filters, Booking Form Validation & Demonstration Messages,
 * Lightbox Modal, and Scroll Reveal Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initSmoothScroll();
  initFaqAccordion();
  initCategoryFilters();
  initLightbox();
  initScrollReveal();
  initBookingForms();
  initBackToTop();
  initUrlParamSelection();
});

/* -------------------------------------------------------------------------
   1. Sticky Header
   ------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* -------------------------------------------------------------------------
   2. Responsive Mobile Navigation
   ------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on clicking outside or clicking any link
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  navMenu.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------------------------------------------------------------
   3. Smooth Scrolling for Internal Hash Anchors
   ------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* -------------------------------------------------------------------------
   4. FAQ Accordion
   ------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items in the same container for clean accordion UX
      const parentContainer = item.closest('.faq-container');
      if (parentContainer) {
        parentContainer.querySelectorAll('.faq-item').forEach(sibling => {
          sibling.classList.remove('active');
          const siblingBtn = sibling.querySelector('.faq-header');
          if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
        });
      }

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* -------------------------------------------------------------------------
   5. Interactive Category Filters (Services & Gallery)
   ------------------------------------------------------------------------- */
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  if (!filterButtons.length || !filterItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        const itemCategories = (item.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   6. Gallery Lightbox Modal
   ------------------------------------------------------------------------- */
function initLightbox() {
  const lightboxModal = document.getElementById('galleryLightbox');
  if (!lightboxModal) return;

  const closeBtn = lightboxModal.querySelector('.lightbox-close-btn');
  const lightboxBody = lightboxModal.querySelector('.lightbox-body');
  const lightboxTitle = lightboxModal.querySelector('.lightbox-title');
  const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');

  const openLightbox = (targetCard) => {
    const title = targetCard.getAttribute('data-title') || 'MAKEUP BUSINESS Look';
    const desc = targetCard.getAttribute('data-desc') || 'Signature luxury makeup styling.';
    const placeholderClass = targetCard.getAttribute('data-placeholder') || 'placeholder-makeup-business-hero';
    const badgeLabel = targetCard.getAttribute('data-badge') || 'Concept Look';

    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCaption) lightboxCaption.textContent = desc;

    if (lightboxBody) {
      lightboxBody.innerHTML = `
        <div class="img-placeholder ${placeholderClass} ratio-16-9"></div>
      `;
    }

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-lightbox-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(trigger);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* -------------------------------------------------------------------------
   7. Scroll Reveal Animations
   ------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* -------------------------------------------------------------------------
   8. Booking & Contact Forms (Frontend-Only Demonstration)
   ------------------------------------------------------------------------- */
function initBookingForms() {
  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const feedbackBox = form.querySelector('.form-feedback') || createFeedbackBox(form);

      // Validate Text & Select Required Fields
      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        const val = input.value.trim();
        const errorEl = form.querySelector(`#error-${input.id}`);

        if (!val) {
          isValid = false;
          input.classList.add('is-invalid');
          if (errorEl) {
            errorEl.textContent = 'This field is required.';
            errorEl.classList.add('visible');
          }
        } else {
          input.classList.remove('is-invalid');
          if (errorEl) errorEl.classList.remove('visible');
        }
      });

      // Email Validation
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorEl = form.querySelector(`#error-${emailInput.id}`);
        if (!emailRegex.test(emailInput.value.trim())) {
          isValid = false;
          emailInput.classList.add('is-invalid');
          if (errorEl) {
            errorEl.textContent = 'Please enter a valid email address.';
            errorEl.classList.add('visible');
          }
        }
      }

      // Phone Validation (Min 10 digits for Indian/general demo format)
      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.value.trim()) {
        const phoneRegex = /^[0-9+\-\s()]{8,15}$/;
        const errorEl = form.querySelector(`#error-${phoneInput.id}`);
        if (!phoneRegex.test(phoneInput.value.trim())) {
          isValid = false;
          phoneInput.classList.add('is-invalid');
          if (errorEl) {
            errorEl.textContent = 'Please enter a valid phone number (8-15 digits).';
            errorEl.classList.add('visible');
          }
        }
      }

      // Date Validation (Must not be in the past)
      const dateInput = form.querySelector('input[type="date"]');
      if (dateInput && dateInput.value) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const errorEl = form.querySelector(`#error-${dateInput.id}`);

        if (selectedDate < today) {
          isValid = false;
          dateInput.classList.add('is-invalid');
          if (errorEl) {
            errorEl.textContent = 'Please select a future event date.';
            errorEl.classList.add('visible');
          }
        }
      }

      if (!isValid) {
        feedbackBox.className = 'form-feedback error';
        feedbackBox.innerHTML = '<strong>Submission Error:</strong> Please correct the highlighted fields above.';
        feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Gather summary details for demo feedback
      const nameInput = form.querySelector('#customerName') || form.querySelector('input[name="name"]');
      const serviceSelect = form.querySelector('#serviceSelect') || form.querySelector('select[name="service"]');
      const eventTypeSelect = form.querySelector('#eventType') || form.querySelector('select[name="eventType"]');
      const customerName = nameInput ? nameInput.value.trim() : 'Guest';
      const serviceName = serviceSelect && serviceSelect.value ? serviceSelect.options[serviceSelect.selectedIndex].text : 'Makeup Service';
      const eventType = eventTypeSelect && eventTypeSelect.value ? eventTypeSelect.options[eventTypeSelect.selectedIndex].text : 'Special Event';

      // Friendly demo confirmation without claiming real transmission
      feedbackBox.className = 'form-feedback success';
      feedbackBox.innerHTML = `
        <strong>✦ Demo Enquiry Received Successfully!</strong><br>
        Thank you, <em>${escapeHtml(customerName)}</em>. Your illustrative enquiry for <strong>${escapeHtml(serviceName)}</strong> (${escapeHtml(eventType)}) has been validated.<br>
        <span style="font-size:0.84rem; display:block; margin-top:8px; opacity:0.9;">
          <em>Note: This is a frontend demonstration website. No customer details have been transmitted externally, and no actual appointment has been confirmed.</em>
        </span>
      `;

      form.reset();
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

function createFeedbackBox(form) {
  const box = document.createElement('div');
  box.className = 'form-feedback';
  form.appendChild(box);
  return box;
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

/* -------------------------------------------------------------------------
   9. URL Query Parameters for Service Pre-selection
   Allows clicking "Book Now" on a service card to populate the contact page form.
   ------------------------------------------------------------------------- */
function initUrlParamSelection() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const eventParam = urlParams.get('event');

  if (serviceParam) {
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
      serviceSelect.value = serviceParam;
    }
  }

  if (eventParam) {
    const eventTypeSelect = document.getElementById('eventType');
    if (eventTypeSelect) {
      eventTypeSelect.value = eventParam;
    }
  }
}

/* -------------------------------------------------------------------------
   10. Back to Top Button
   ------------------------------------------------------------------------- */
function initBackToTop() {
  let backBtn = document.querySelector('.back-to-top');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Back to top');
    backBtn.innerHTML = '↑';
    document.body.appendChild(backBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
