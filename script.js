// Navigation toggle for mobile
function toggleNav() {
    document.getElementById('site-nav').classList.toggle('open');
}

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Google Analytics - Replace YOUR_MEASUREMENT_ID with your actual GA4 measurement ID
(function() {
    const gaId = 'G-XXXXXXXXXX'; // TODO: Replace with actual GA4 measurement ID
    
    // Load GA4 script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);
    
    // Initialize GA4
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId);
})();

// Analytics event tracking
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Add structured data for Person/Organization
function addStructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Fred Deichler",
        "jobTitle": "Agile Coach",
        "description": "International Agile Coach and Speaker with 13+ years experience coaching 50+ teams",
        "url": "https://www.freddeichler.com",
        "image": "https://www.freddeichler.com/IMG_3523.png",
        "sameAs": [
            "https://www.linkedin.com/in/freddeichler/",
            "https://linktr.ee/freddeichler"
        ],
        "knowsAbout": ["Agile Coaching", "Scrum", "Kanban", "Evidence-Based Management", "Flow Metrics", "AI in Teams"],
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "University of Minnesota, Crookston"
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(personSchema);
    document.head.appendChild(script);
}

// Navbar scroll effect
let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow to navbar on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = 'none';
    } lastScroll = currentScroll;
});

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

// Generate gradient color for talk image
function getTalkGradient(index) {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)'
    ];
    return gradients[index % gradients.length];
}

// Get initials from conference name
function getInitials(name) {
    return name.split(' ').filter(word => word.length > 0).slice(0, 2).map(word => word[0].toUpperCase()).join('');
}

// Generate talk image path (uses explicit image or auto-detects from talkId)
function getTalkImagePath(talk) {
    // If image is explicitly set, use it
    if (talk.image && talk.image.trim() !== '') {
        return talk.image;
    }
    // Otherwise, auto-construct path from talkId
    if (talk.talkId) {
        return `/media/conferences/${talk.talkId}/logo.png`;
    }
    return null;
}

// Generate talk image (uses real image if available, otherwise initials)
function getTalkImage(talk, index) {
    const imagePath = getTalkImagePath(talk);
    if (imagePath) {
        return `<img src="${imagePath}" alt="${talk.event}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: inherit;" onerror="this.parentElement.innerHTML='${getInitials(talk.event).replace(/'/g, "\\'")}'; this.parentElement.style.background='${getTalkGradient(index)}'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center'; this.parentElement.style.fontSize='2rem'; this.parentElement.style.fontWeight='bold'; this.parentElement.style.color='white';" />`;
    }
    // Fallback to gradient + initials
    return `<div style="background: ${getTalkGradient(index)}; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; color: white; border-radius: inherit;">${getInitials(talk.event)}</div>`;
}

// Store talks globally for filtering
let allTalks = [];
let currentFilter = 'all';

// Load and display talks
async function loadTalks() {
    const upcomingContainer = document.getElementById('upcoming-talks');
    const pastContainer = document.getElementById('past-talks');
    const featuredContainer = document.getElementById('featured-talks');

    if (! upcomingContainer && ! pastContainer) 
        return; // Not on speaking page

        try {
            const response = await fetch('talks.json');
            allTalks = await response.json();
            const today = new Date().toISOString().split('T')[0];

            // Separate upcoming, featured, and past talks
            const upcoming = allTalks.filter(t => t.date >= today).sort((a, b) => a.date.localeCompare(b.date));
            const featured = allTalks.filter(t => t.featured === true);
            const past = allTalks.filter(t => t.date<today).sort((a, b) => b.date.localeCompare(a.date));

            // Render upcoming talks
            if (upcomingContainer) {
                if (upcoming.length === 0) {
                    upcomingContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No upcoming talks scheduled at the moment. Check back soon!</p>';
                } else {
                    upcoming.forEach((talk, index) => {
                        const card = document.createElement('div');
                        card.className = 'upcoming-card fade-in';
                        
                        // Generate image content
                        const imagePath = getTalkImagePath(talk);
                        const imageContent = imagePath
                            ? `<img src="${imagePath}" alt="${talk.event}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: inherit;" onerror="this.parentElement.innerHTML='${getInitials(talk.event).replace(/'/g, "\\'")}'; this.parentElement.style.background='${getTalkGradient(index)}'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center'; this.parentElement.style.fontSize='2rem'; this.parentElement.style.fontWeight='bold'; this.parentElement.style.color='white';" />`
                            : getInitials(talk.event);
                        
                        card.innerHTML = `
            <span class="upcoming-badge">🎤 UPCOMING</span>
            <div class="upcoming-content">
              <div class="upcoming-image">${imageContent}</div>
              <div class="upcoming-details">
                <h3>${
                            talk.event
                        } ${
                            talk.year
                        }</h3>
                <h4>${
                            talk.title
                        }</h4>
                <p>${
                            new Date(talk.date).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                            })
                        }</p>
              </div>
            </div>
          `;
                        upcomingContainer.appendChild(card);
                    });
                }
            }

            // Render featured talks
            if (featuredContainer) {
                featured.forEach((talk, index) => {
                    const card = document.createElement('div');
                    card.className = 'card fade-in';
                    card.style.cursor = 'pointer';
                    card.innerHTML = `
            <span class="category-badge">${talk.category || 'General'}</span>
            <h3 style="margin-top: var(--space-xs); margin-bottom: var(--space-sm);">${talk.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: var(--space-xs);">
              <strong>Duration:</strong> ${talk.duration || '45-60 min'}<br>
              <strong>Format:</strong> ${talk.format || 'Keynote, Workshop, Breakout'}
            </p>
            ${talk.link ? `<a href="${talk.link}" class="talk-link" onclick="event.stopPropagation()">View Recording →</a>` : ''}
          `;
                    card.addEventListener('click', () => openTalkModal(talk));
                    featuredContainer.appendChild(card);
                });
            }

            // Render past talks with zigzag timeline
            if (pastContainer) { // Add timeline line
                const timelineLine = document.createElement('div');
                timelineLine.className = 'timeline-line';
                pastContainer.appendChild(timelineLine);

                past.forEach((talk, index) => {
                    const isLeft = index % 2 === 0;
                    const item = document.createElement('div');
                    item.className = `talk-item ${
                        isLeft ? 'left' : 'right'
                    } fade-in`;
                    item.dataset.talkId = talk.talkId || '';

                    // Generate image content with fallback to initials
                    const imagePath = getTalkImagePath(talk);
                    const imageContent = imagePath
                        ? `<img src="${imagePath}" alt="${talk.event}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: inherit;" onerror="this.parentElement.innerHTML='${getInitials(talk.event).replace(/'/g, "\\'")}'; this.parentElement.style.background='${getTalkGradient(index)}'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center'; this.parentElement.style.fontSize='2rem'; this.parentElement.style.fontWeight='bold'; this.parentElement.style.color='white';" />`
                        : getInitials(talk.event);
                    
                    const imageDiv = `
          <div class="talk-image" style="background: ${
                        imagePath ? 'transparent' : getTalkGradient(index)
                    }">
            ${imageContent}
          </div>
        `;

                    const contentDiv = `
          <div class="talk-content">
            <span class="category-badge">${
                        talk.category || 'General'
                    }</span>
            <h3>${
                        talk.event
                    }</h3>
            <h4>${
                        talk.title
                    }</h4>
            <span class="talk-year">${
                        talk.year
                    }</span>
            ${
                        talk.link ? `<br><a href="${
                            talk.link
                        }" class="talk-link">View Recording →</a>` : ''
                    }
          </div>
        `;

                    item.innerHTML = imageDiv + contentDiv + '<div class="timeline-dot"></div>';
                    // click opens modal
                    item.addEventListener('click', () => openTalkModal(talk));
                    pastContainer.appendChild(item);
                });
            }

            // Setup filter buttons
            setupFilters();

            // Re-observe fade-in elements
            document.querySelectorAll('.fade-in').forEach((el, index) => {
                if (!el.style.opacity) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = `opacity 0.6s ease ${
                        index * 0.1
                    }s, transform 0.6s ease ${
                        index * 0.1
                    }s`;
                    observer.observe(el);
                }
            });

        } catch (error) {
            console.error('Error loading talks:', error);
            if (upcomingContainer) {
                upcomingContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Unable to load talks. Please try again later.</p>';
            }
        }
    }

    // Setup category filters
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get category
                const category = btn.dataset.category;
                currentFilter = category;
                
                // Filter talks
                filterTalks(category);
            });
        });
    }

    // Filter talks by category
    function filterTalks(category) {
        const pastContainer = document.getElementById('past-talks');
        if (!pastContainer) return;
        
        const today = new Date().toISOString().split('T')[0];
        let filteredTalks = allTalks.filter(t => t.date < today).sort((a, b) => b.date.localeCompare(a.date));
        
        if (category !== 'all') {
            filteredTalks = filteredTalks.filter(t => t.category === category);
        }
        
        // Clear and re-render
        pastContainer.innerHTML = '';
        
        // Add timeline line
        const timelineLine = document.createElement('div');
        timelineLine.className = 'timeline-line';
        pastContainer.appendChild(timelineLine);
        
        filteredTalks.forEach((talk, index) => {
            const isLeft = index % 2 === 0;
            const item = document.createElement('div');
            item.className = `talk-item ${isLeft ? 'left' : 'right'} fade-in`;
            item.dataset.talkId = talk.talkId || '';
            
            // Generate image content with fallback to initials
            const imagePath = getTalkImagePath(talk);
            const imageContent = imagePath
                ? `<img src="${imagePath}" alt="${talk.event}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: inherit;" onerror="this.parentElement.innerHTML='${getInitials(talk.event).replace(/'/g, "\\'")}'; this.parentElement.style.background='${getTalkGradient(index)}'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center'; this.parentElement.style.fontSize='2rem'; this.parentElement.style.fontWeight='bold'; this.parentElement.style.color='white';" />`
                : getInitials(talk.event);
            
            const imageDiv = `
        <div class="talk-image" style="background: ${
                imagePath ? 'transparent' : getTalkGradient(index)
            }">
          ${imageContent}
        </div>
      `;
            
            const contentDiv = `
        <div class="talk-content">
          <span class="category-badge">${talk.category || 'General'}</span>
          <h3>${talk.event}</h3>
          <h4>${talk.title}</h4>
          <span class="talk-year">${talk.year}</span>
          ${talk.link ? `<br><a href="${talk.link}" class="talk-link">View Recording →</a>` : ''}
        </div>
      `;
            
            item.innerHTML = imageDiv + contentDiv + '<div class="timeline-dot"></div>';
            item.addEventListener('click', () => openTalkModal(talk));
            pastContainer.appendChild(item);
        });
        
        // Re-observe fade-in
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
            observer.observe(el);
        });
    }

    // Add structured data for events on speaking page
    function addEventStructuredData() {
        if (!document.getElementById('past-talks') && !document.getElementById('upcoming-talks')) return;
        
        fetch('talks.json').then(r => r.json()).then(talks => {
            const events = talks.filter(t => t.date >= new Date().toISOString().split('T')[0]).map(talk => ({
                "@context": "https://schema.org",
                "@type": "Event",
                "name": talk.title,
                "description": `${talk.title} at ${talk.event} ${talk.year}`,
                "startDate": talk.date,
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "organizer": {
                    "@type": "Organization",
                    "name": talk.event
                },
                "performer": {
                    "@type": "Person",
                    "name": "Fred Deichler"
                }
            }));
            
            if (events.length > 0) {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.text = JSON.stringify(events);
                document.head.appendChild(script);
            }
        }).catch(() => {});
    }

    // Observe all fade-in elements
    document.addEventListener('DOMContentLoaded', () => {
        const fadeElements = document.querySelectorAll('.fade-in');

        fadeElements.forEach((el, index) => { // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease ${
                index * 0.1
            }s, transform 0.6s ease ${
                index * 0.1
            }s`;

            // Observe for intersection
            observer.observe(el);
        });

        // Load talks if on speaking page
        loadTalks();
        // Load homepage testimonials if present
        loadFeaturedTestimonials();
        // Load recent highlights on homepage
        loadRecentHighlights();
        // Load services testimonials if present
        loadServicesTestimonials();
        
        // Add structured data
        addStructuredData();
        addEventStructuredData();
        
        // Track conversion points
        document.querySelectorAll('a[href="contact.html"]').forEach(link => {
            link.addEventListener('click', () => trackEvent('Navigation', 'contact_click', 'Contact Page'));
        });
        
        document.querySelectorAll('a[href="services.html"]').forEach(link => {
            link.addEventListener('click', () => trackEvent('Navigation', 'services_click', 'Services Page'));
        });
        
        document.querySelectorAll('.talk-link').forEach(link => {
            link.addEventListener('click', () => trackEvent('Speaking', 'recording_click', link.textContent));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.getElementById('site-nav');
            const toggle = document.querySelector('.nav-toggle');

            if (nav && toggle && nav.classList.contains('open') && ! nav.contains(e.target) && ! toggle.contains(e.target)) {
                nav.classList.remove('open');
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({behavior: 'smooth', block: 'start'});
                }
            });
        });
    });

    async function loadFeaturedTestimonials() {
        const grid = document.getElementById('testimonials-grid');
        if (! grid) 
            return;
            try {
                const res = await fetch('testimonials.json');
                const items = await res.json();
                grid.innerHTML = items.slice(0, 6).map(
                    q => `
      <div class="quote">
        <p style="margin:0 0 .5rem 0">“${
                        q.quote
                    }”</p>
        <small style="color:var(--text-secondary)">${
                        q.event || ''
                    }</small>
      </div>
    `
                ).join('');
            } catch (e) { /* ignore */
            }
        }

        async function loadRecentHighlights() {
            const grid = document.getElementById('recent-highlights-grid');
            if (! grid) 
                return;
                try {
                    const res = await fetch('talks.json');
                    const talks = await res.json();
                    const today = new Date().toISOString().split('T')[0];
                    
                    // Get 3 most recent talks (past or upcoming)
                    const recentTalks = talks.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
                    
                    grid.innerHTML = recentTalks.map(talk => {
                        const isPast = talk.date < today;
                        const dateFormatted = new Date(talk.date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                        });
                        return `
        <div class="card" style="padding: var(--space-lg);">
          <span class="badge">${isPast ? 'Recent' : 'Upcoming'}</span>
          <h3 style="font-size: 1.125rem; margin-top: var(--space-sm);">${talk.event} ${talk.year}</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: var(--space-xs);">${talk.title}</p>
          <small style="color: var(--text-secondary);">${dateFormatted}</small>
        </div>
      `;
                    }).join('');
                } catch (e) { /* ignore */
                }
            }

        async function loadServicesTestimonials() {
            const grid = document.getElementById('services-testimonials');
            if (! grid) 
                return;
                try {
                    const res = await fetch('testimonials.json');
                    const items = await res.json();
                    grid.innerHTML = items.map(
                        q => `
      <div class="quote">
        <p style="margin:0 0 .5rem 0">"${
                            q.quote
                        }"</p>
        <small style="color:var(--text-secondary)">${
                            q.author || 'Attendee'
                        }${
                            q.event ? ` — ${
                                q.event
                            }` : ''
                        }</small>
      </div>
    `
                    ).join('');
                } catch (e) { /* ignore */
                }
            }
        // -------- Modal logic (lazy-load feedback) --------
        function openTalkModal(talk) {
            const modal = document.getElementById('talk-modal');
            const body = document.getElementById('modal-body');
            if (! modal || ! body) 
                return;
                
                // Track modal open
                trackEvent('Speaking', 'modal_open', talk.title);
                
                body.innerHTML = `<div style="text-align:center; padding:2rem;">Loading…</div>`;
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');

                // close handlers
                const close = (e) => {
                    if (e.target.dataset.close === 'true' || e.key === 'Escape') {
                        modal.style.display = 'none';
                        modal.setAttribute('aria-hidden', 'true');
                        document.removeEventListener('keydown', close);
                    }
                };
                modal.addEventListener('click', close, {once: true});
                document.addEventListener('keydown', close);

                // load feedback detail json
                const id = talk.talkId || '';
                fetch(`feedback/${id}.json`).then(r => r.json()).then(data => {
                    renderTalkModal(talk, data, body);
                }).catch(() => { // Close modal if no feedback available
                    modal.style.display = 'none';
                    modal.setAttribute('aria-hidden', 'true');
                    document.removeEventListener('keydown', close);
                });
            }

            function renderTalkModal(talk, fb, container) {
                const monthYear = new Date(talk.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                });
                // Generate modal thumbnail
                const imagePath = getTalkImagePath(talk);
                const thumbContent = imagePath
                    ? `<img src="${imagePath}" alt="${talk.event}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: inherit;" onerror="this.parentElement.innerHTML='${getInitials(talk.event).replace(/'/g, "\\'")}'; this.parentElement.style.background='${getTalkGradient(1)}'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center'; this.parentElement.style.fontSize='2rem'; this.parentElement.style.fontWeight='bold'; this.parentElement.style.color='white';" />`
                    : getInitials(talk.event);
                
                const header = `
    <div class="modal-header">
      <div class="thumb" style="background:${
                    imagePath ? 'transparent' : getTalkGradient(1)
                }">${thumbContent}</div>
      <div>
        <h2 style="margin:0">${
                    talk.title
                }</h2>
        <p style="margin:0; color:var(--text-secondary)">${
                    talk.event
                } • ${monthYear} • ${
                    fb.responses || 0
                } responses</p>
        ${talk.duration || talk.format ? `<p style="margin-top:0.5rem; color:var(--text-secondary); font-size:0.9rem;">
          ${talk.duration ? `<strong>Duration:</strong> ${talk.duration}` : ''}
          ${talk.duration && talk.format ? ' • ' : ''}
          ${talk.format ? `<strong>Format:</strong> ${talk.format}` : ''}
        </p>` : ''}
      </div>
    </div>`;

                const metrics = fb.metrics || {};
                const metricRow = (label, value) => `
    <div class="metric">
      <div style="display:flex; justify-content:space-between; margin-bottom:.25rem"><span>${label}</span><span>${
                    (value || 0).toFixed(1)
                }%</span></div>
      <div class="bar"><div class="fill" style="width:${
                    value || 0
                }%"></div></div>
    </div>`;

                const metricsHtml = `
    <div>
      <h3 style="margin-top:0">Session Ratings</h3>
      ${
                    metricRow('Relevant', metrics.relevant)
                }
      ${
                    metricRow('Actionable', metrics.actionable)
                }
      ${
                    metricRow('Engaging', metrics.engaging)
                }
      ${
                    metricRow('Inspiring', metrics.inspiring)
                }
      <div style="margin-top:1rem; display:flex; gap:1rem; flex-wrap:wrap">
        <span class="badge">${
                    fb.valuablePct || 0
                }% found valuable</span>
        <span class="badge">${
                    fb.hearAgainPct || 0
                }% want to hear again</span>
      </div>
    </div>`;

                const testimonials = (fb.testimonials || []).slice(0, 50).map(t => `
    <div class="quote"><p style="margin:0 0 .5rem 0">“${
                    t.text
                }”</p><small style="color:var(--text-secondary)"> </small></div>
  `).join('');

                const testimonialsHtml = `
    <div>
      <h3 style="margin-top:0">What attendees said</h3>
      <div style="display:grid; gap:1rem">${
                    testimonials || '<p style="color:var(--text-secondary)">No quotes yet.</p>'
                }</div>
    </div>`;

                container.innerHTML = header + `<div class="modal-grid">${metricsHtml}${testimonialsHtml}</div>`;
            }
