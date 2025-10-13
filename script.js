// Navigation toggle for mobile
function toggleNav() {
  document.getElementById('site-nav').classList.toggle('open');
}

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

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
  }
  
  lastScroll = currentScroll;
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
  return name.split(' ')
    .filter(word => word.length > 0)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');
}

// Load and display talks
async function loadTalks() {
  const upcomingContainer = document.getElementById('upcoming-talks');
  const pastContainer = document.getElementById('past-talks');
  
  if (!upcomingContainer && !pastContainer) return; // Not on speaking page
  
  try {
    const response = await fetch('talks.json');
    const talks = await response.json();
    const today = new Date().toISOString().split('T')[0];
    
    // Separate upcoming and past talks
    const upcoming = talks.filter(t => t.date >= today).sort((a, b) => a.date.localeCompare(b.date));
    const past = talks.filter(t => t.date < today).sort((a, b) => b.date.localeCompare(a.date));
    
    // Render upcoming talks
    if (upcomingContainer) {
      if (upcoming.length === 0) {
        upcomingContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No upcoming talks scheduled at the moment. Check back soon!</p>';
      } else {
        upcoming.forEach((talk, index) => {
          const card = document.createElement('div');
          card.className = 'upcoming-card fade-in';
          card.innerHTML = `
            <span class="upcoming-badge">🎤 UPCOMING</span>
            <div class="upcoming-content">
              <div class="upcoming-image">${getInitials(talk.event)}</div>
              <div class="upcoming-details">
                <h3>${talk.event} ${talk.year}</h3>
                <h4>${talk.title}</h4>
                <p>${new Date(talk.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          `;
          upcomingContainer.appendChild(card);
        });
      }
    }
    
    // Render past talks with zigzag timeline
    if (pastContainer) {
      // Add timeline line
      const timelineLine = document.createElement('div');
      timelineLine.className = 'timeline-line';
      pastContainer.appendChild(timelineLine);
      
      past.forEach((talk, index) => {
        const isLeft = index % 2 === 0;
        const item = document.createElement('div');
        item.className = `talk-item ${isLeft ? 'left' : 'right'} fade-in`;
        item.dataset.talkId = talk.talkId || '';
        
        const imageDiv = `
          <div class="talk-image" style="background: ${getTalkGradient(index)}">
            ${getInitials(talk.event)}
          </div>
        `;
        
        const contentDiv = `
          <div class="talk-content">
            <h3>${talk.event}</h3>
            <h4>${talk.title}</h4>
            <span class="talk-year">${talk.year}</span>
            ${talk.link ? `<br><a href="${talk.link}" class="talk-link">View Recording →</a>` : ''}
          </div>
        `;
        
        item.innerHTML = imageDiv + contentDiv + '<div class="timeline-dot"></div>';
        // click opens modal
        item.addEventListener('click', () => openTalkModal(talk));
        pastContainer.appendChild(item);
      });
    }
    
    // Re-observe fade-in elements
    document.querySelectorAll('.fade-in').forEach((el, index) => {
      if (!el.style.opacity) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
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

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  fadeElements.forEach((el, index) => {
    // Set initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    // Observe for intersection
    observer.observe(el);
  });
  
  // Load talks if on speaking page
  loadTalks();
  // Load homepage testimonials if present
  loadFeaturedTestimonials();
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('site-nav');
    const toggle = document.querySelector('.nav-toggle');
    
    if (nav && toggle && nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

async function loadFeaturedTestimonials(){
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  try{
    const res = await fetch('testimonials.json');
    const items = await res.json();
    grid.innerHTML = items.slice(0,6).map(q=>`
      <div class="quote">
        <p style="margin:0 0 .5rem 0">“${q.quote}”</p>
        <small style="color:var(--text-secondary)">${q.event||''}</small>
      </div>
    `).join('');
  }catch(e){ /* ignore */ }
}
// -------- Modal logic (lazy-load feedback) --------
function openTalkModal(talk){
  const modal = document.getElementById('talk-modal');
  const body = document.getElementById('modal-body');
  if (!modal || !body) return;
  body.innerHTML = `<div style="text-align:center; padding:2rem;">Loading…</div>`;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden','false');

  // close handlers
  const close = (e)=>{ if (e.target.dataset.close === 'true' || e.key === 'Escape'){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); document.removeEventListener('keydown', close);} };
  modal.addEventListener('click', close, { once:true });
  document.addEventListener('keydown', close);

  // load feedback detail json
  const id = talk.talkId || '';
  fetch(`feedback/${id}.json`).then(r=>r.json()).then(data=>{
    renderTalkModal(talk, data, body);
  }).catch(()=>{
    body.innerHTML = `<p style="color:var(--text-secondary)">No detailed feedback available yet.</p>`;
  });
}

function renderTalkModal(talk, fb, container){
  const monthYear = new Date(talk.date).toLocaleDateString('en-US',{month:'long', year:'numeric'});
  const header = `
    <div class="modal-header">
      <div class="thumb" style="background:${getTalkGradient(1)}">${getInitials(talk.event)}</div>
      <div>
        <h2 style="margin:0">${talk.title}</h2>
        <p style="margin:0; color:var(--text-secondary)">${talk.event} • ${monthYear} • ${fb.responses||0} responses</p>
      </div>
    </div>`;

  const metrics = fb.metrics || {};
  const metricRow = (label, value)=>`
    <div class="metric">
      <div style="display:flex; justify-content:space-between; margin-bottom:.25rem"><span>${label}</span><span>${(value||0).toFixed(1)}%</span></div>
      <div class="bar"><div class="fill" style="width:${value||0}%"></div></div>
    </div>`;

  const metricsHtml = `
    <div>
      <h3 style="margin-top:0">Session Ratings</h3>
      ${metricRow('Relevant', metrics.relevant)}
      ${metricRow('Actionable', metrics.actionable)}
      ${metricRow('Engaging', metrics.engaging)}
      ${metricRow('Inspiring', metrics.inspiring)}
      <div style="margin-top:1rem; display:flex; gap:1rem; flex-wrap:wrap">
        <span class="badge">${fb.valuablePct||0}% found valuable</span>
        <span class="badge">${fb.hearAgainPct||0}% want to hear again</span>
      </div>
    </div>`;

  const testimonials = (fb.testimonials||[]).slice(0,50).map(t=>`
    <div class="quote"><p style="margin:0 0 .5rem 0">“${t.text}”</p><small style="color:var(--text-secondary)"> </small></div>
  `).join('');

  const testimonialsHtml = `
    <div>
      <h3 style="margin-top:0">What attendees said</h3>
      <div style="display:grid; gap:1rem">${testimonials || '<p style="color:var(--text-secondary)">No quotes yet.</p>'}</div>
    </div>`;

  container.innerHTML = header + `<div class="modal-grid">${metricsHtml}${testimonialsHtml}</div>`;
}
