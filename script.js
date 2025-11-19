// Navigation toggle for mobile
function toggleNav() {
    document.getElementById('site-nav').classList.toggle('open');
}

// Update copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Google Analytics
(function () {
    const gaId = 'G-XXXXXXXXXX'; // TODO: Replace with actual GA4 measurement ID

    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId);
})();

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Navbar scroll effect
let lastScroll = 0;
const header = document.querySelector('.site-header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Filter talks by category (DOM-based)
function filterTalks(category) {
    const items = document.querySelectorAll('.talk-item');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update buttons
    buttons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    let visibleIndex = 0;

    items.forEach(item => {
        const itemCategory = item.dataset.category;
        const isVisible = category === 'all' || itemCategory === category;

        if (isVisible) {
            item.style.display = 'grid'; // Restore grid display
            // Re-apply zigzag classes
            item.classList.remove('left', 'right');
            item.classList.add(visibleIndex % 2 === 0 ? 'left' : 'right');
            visibleIndex++;

            // Trigger fade-in if needed
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        } else {
            item.style.display = 'none';
        }
    });
}

// Modal Logic
function openTalkModal(talk) {
    const modal = document.getElementById('talk-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;

    trackEvent('Speaking', 'modal_open', talk.title);

    body.innerHTML = `<div style="text-align:center; padding:2rem;">Loading…</div>`;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');

    const close = (e) => {
        if (e.target.dataset.close === 'true' || e.key === 'Escape') {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            document.removeEventListener('keydown', close);
        }
    };
    modal.addEventListener('click', close, { once: true });
    document.addEventListener('keydown', close);

    // Load feedback detail json
    const id = talk.talkId || '';
    fetch(`/feedback/${id}.json`).then(r => r.json()).then(data => {
        renderTalkModal(talk, data, body);
    }).catch(() => {
        body.innerHTML = `<div style="text-align:center; padding:2rem;">No detailed feedback available for this session.</div>`;
    });
}

function renderTalkModal(talk, fb, container) {
    // Re-use the same rendering logic, but adapted since we don't have the helper functions in JS anymore.
    // We'll just use basic rendering here.

    const monthYear = new Date(talk.date).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    const header = `
    <div class="modal-header">
      <div>
        <h2 style="margin:0">${talk.title}</h2>
        <p style="margin:0; color:var(--text-secondary)">${talk.event} • ${monthYear} • ${fb.responses || 0} responses</p>
      </div>
    </div>`;

    const metrics = fb.metrics || {};
    const metricRow = (label, value) => `
    <div class="metric">
      <div style="display:flex; justify-content:space-between; margin-bottom:.25rem"><span>${label}</span><span>${(value || 0).toFixed(1)}%</span></div>
      <div class="bar"><div class="fill" style="width:${value || 0}%"></div></div>
    </div>`;

    const metricsHtml = `
    <div>
      <h3 style="margin-top:0">Session Ratings</h3>
      ${metricRow('Relevant', metrics.relevant)}
      ${metricRow('Actionable', metrics.actionable)}
      ${metricRow('Engaging', metrics.engaging)}
      ${metricRow('Inspiring', metrics.inspiring)}
    </div>`;

    const testimonials = (fb.testimonials || []).slice(0, 50).map(t => `
    <div class="quote"><p style="margin:0 0 .5rem 0">“${t.text}”</p></div>
  `).join('');

    const testimonialsHtml = `
    <div>
      <h3 style="margin-top:0">What attendees said</h3>
      <div style="display:grid; gap:1rem">${testimonials || '<p style="color:var(--text-secondary)">No quotes yet.</p>'}</div>
    </div>`;

    container.innerHTML = header + `<div class="modal-grid">${metricsHtml}${testimonialsHtml}</div>`;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Track conversion points
    document.querySelectorAll('a[href="/contact/"]').forEach(link => {
        link.addEventListener('click', () => trackEvent('Navigation', 'contact_click', 'Contact Page'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('site-nav');
        const toggle = document.querySelector('.nav-toggle');
        if (nav && toggle && nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('open');
        }
    });
});
