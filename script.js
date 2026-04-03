/* ============================================================
   Data Layer — Projets & Expériences
   ============================================================ */

const projects = [
  {
    title: "AWS ELT Pipeline — T&T Foods",
    description: "Pipeline ELT end-to-end sur AWS (S3, Glue, Lambda, Athena) avec gouvernance IAM, contrôle qualité des données et couche analytique Power BI. Architecture Medallion (Bronze / Silver / Gold).",
    tags: ["Python", "AWS", "Glue", "Athena", "Power BI", "IAM"],
    link: "",
    highlight: true
  },
  {
    title: "ETL IDFM / RATP — Transit Data",
    description: "Pipeline ETL production-grade sur données de mobilité Île-de-France (IDFM / RATP). Structure modulaire E/T/L, config YAML, tests unitaires et d'intégration.",
    tags: ["Python", "ETL", "DuckDB", "Git"],
    link: "https://github.com/LANCAGH/",
    highlight: false
  },
  {
    title: "Nielsen PDM Analytics — Power BI",
    description: "Modèle analytique Power Pivot / Power Query avec mesures DAX pour parts de marché, contribution CA et évolutions volumiques sur données Nielsen GMS.",
    tags: ["Power BI", "DAX", "Power Query", "Nielsen"],
    link: "",
    highlight: false
  },
  {
    title: "Geocoding Pipeline — 5 200 points de vente",
    description: "Pipeline Python de géocodage de 5 200+ magasins via Google Maps API. Parallélisation ThreadPoolExecutor, checkpoint/resume, encodage UTF-8-sig.",
    tags: ["Python", "Google Maps API", "Pandas", "ThreadPoolExecutor"],
    link: "",
    highlight: false
  }
];

const experiences = [
  {
    date: "2024 – 2026",
    type: "Alternance",
    org: "T&T Foods",
    role: "Data & Analytics Engineer",
    bullets: [
      "Centralisation des SI hétérogènes (Sage, WMS, CRM) dans un data lake AWS",
      "Conception et déploiement de pipelines de données Python end-to-end",
      "Reporting Power BI et modélisation Nielsen PDM (parts de marché)"
    ]
  },
  {
    date: "2024 – 2026",
    type: "Formation",
    org: "NEOMA Business School",
    role: "MSc Marketing & Data Analytics",
    bullets: [
      "Spécialisation en data analytics, statistiques et marketing quantitatif",
      "Projets appliqués en Python, SQL et visualisation de données"
    ]
  }
];

/* ============================================================
   Render — Projects
   ============================================================ */

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card fade-in' + (project.highlight ? ' highlight' : '');

    const tagsHTML = project.tags
      .map(tag => `<span class="project-tag">${escapeHTML(tag)}</span>`)
      .join('');

    const linkHTML = project.link
      ? `<a href="${escapeHTML(project.link)}" class="project-link" target="_blank" rel="noopener noreferrer">
           Voir sur GitHub
           <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
             <path d="M2.5 10.5l8-8M5.5 2.5H10.5v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </a>`
      : '';

    card.innerHTML = `
      <div class="project-card-top">
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <span class="project-highlight-badge">Featured</span>
      </div>
      <p class="project-description">${escapeHTML(project.description)}</p>
      <div class="project-tags">${tagsHTML}</div>
      ${linkHTML}
    `;

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

/* ============================================================
   Render — Experience Timeline
   ============================================================ */

function renderExperiences() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  const fragment = document.createDocumentFragment();

  experiences.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'timeline-item fade-in';

    const bulletsHTML = exp.bullets
      .map(b => `<li class="timeline-bullet">${escapeHTML(b)}</li>`)
      .join('');

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-meta">
        <span class="timeline-date">${escapeHTML(exp.date)}</span>
        <span class="timeline-type">${escapeHTML(exp.type)}</span>
      </div>
      <p class="timeline-org">${escapeHTML(exp.org)}</p>
      <p class="timeline-role">${escapeHTML(exp.role)}</p>
      <ul class="timeline-bullets">${bulletsHTML}</ul>
    `;

    fragment.appendChild(item);
  });

  timeline.appendChild(fragment);
}

/* ============================================================
   Intersection Observer — Fade-in on scroll
   ============================================================ */

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children within the same parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)'));
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(delay, 320));
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ============================================================
   Mobile Navigation
   ============================================================ */

function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================================================
   Sticky nav border on scroll
   ============================================================ */

function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const handler = () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

/* ============================================================
   Utility
   ============================================================ */

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   Init
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderExperiences();
  initScrollAnimations();
  initMobileNav();
  initNavScroll();
});
