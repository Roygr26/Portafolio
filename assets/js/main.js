/**
 * Portfolio - Data Analyst
 * Main JavaScript Module
 * 
 * Handles: Theme toggling, project filtering, scroll animations,
 * navbar behavior, mobile menu, and dynamic project rendering.
 */

// ============================================
// Theme Management
// ============================================
const ThemeManager = (() => {
  const STORAGE_KEY = 'portfolio-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  /**
   * Initializes the theme based on saved preference or system preference.
   * Defaults to dark mode.
   */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? DARK : DARK); // Default: dark
    applyTheme(theme);
  }

  /** Applies the given theme to the document. */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update ARIA label on toggle button
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === DARK ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
      );
    }
  }

  /** Toggles between light and dark themes. */
  function toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === DARK ? LIGHT : DARK);
  }

  return { init, toggle };
})();


// ============================================
// Project Renderer
// ============================================
const ProjectRenderer = (() => {
  let projects = [];
  let currentFilter = 'all';

  /**
   * Loads projects from the global PROJECTS_DATA variable.
   * Data is loaded via <script src="./data/projects.js"> in index.html.
   * This avoids CORS issues when opening the file directly from the filesystem.
   * @returns {Promise<Array>} Array of project objects.
   */
  async function loadProjects() {
    if (typeof PROJECTS_DATA !== 'undefined' && Array.isArray(PROJECTS_DATA)) {
      projects = PROJECTS_DATA;
    } else {
      console.error('PROJECTS_DATA not found. Make sure data/projects.js is loaded.');
      projects = [];
    }
    return projects;
  }

  /**
   * Generates the HTML for a single project card.
   * @param {Object} project - Project data object.
   * @returns {string} HTML string.
   */
  function renderCard(project) {
    const tagsHTML = project.tags
      .map(tag => `<span class="badge">${tag}</span>`)
      .join('');

    const metricsHTML = project.metrics
      .map(m => `
        <div class="metric-pill">
          <div class="metric-value">${m.value}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `)
      .join('');

    const linksHTML = [];
    if (project.links.github) {
      linksHTML.push(`
        <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="action-link" aria-label="Ver código en GitHub para ${project.title}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          GitHub
        </a>
      `);
    }
    if (project.links.dashboard) {
      linksHTML.push(`
        <a href="${project.links.dashboard}" target="_blank" rel="noopener noreferrer" class="action-link" aria-label="Ver dashboard interactivo de ${project.title}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          Dashboard
        </a>
      `);
    }
    if (project.links.report) {
      linksHTML.push(`
        <a href="${project.links.report}" target="_blank" rel="noopener noreferrer" class="action-link" aria-label="Ver informe de ${project.title}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Informe
        </a>
      `);
    }

    return `
      <article class="project-card fade-up" data-categories='${JSON.stringify(project.category)}' aria-label="Proyecto: ${project.title}">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          ${tagsHTML}
        </div>

        <!-- Title & Summary -->
        <h3 class="text-xl font-bold mb-2" style="color: var(--color-text);">${project.title}</h3>
        <p class="text-sm mb-5" style="color: var(--color-text-secondary); line-height: 1.7;">${project.summary}</p>

        <!-- Metrics -->
        <div class="grid grid-cols-3 gap-3 mb-5">
          ${metricsHTML}
        </div>

        <!-- Methodology Steps -->
        <div class="mb-5">
          <div class="method-step">
            <div class="method-step-icon problem">P</div>
            <p class="text-sm" style="color: var(--color-text-secondary);">${project.problem}</p>
          </div>
          <div class="method-step">
            <div class="method-step-icon analysis">A</div>
            <p class="text-sm" style="color: var(--color-text-secondary);">${project.analysis}</p>
          </div>
          <div class="method-step">
            <div class="method-step-icon impact">I</div>
            <p class="text-sm" style="color: var(--color-text-secondary);">${project.impact}</p>
          </div>
        </div>

        <!-- Action Links -->
        <div class="flex flex-wrap gap-2">
          ${linksHTML.join('')}
        </div>
      </article>
    `;
  }

  /**
   * Renders filtered projects into the container.
   * @param {string} filter - Category filter ('all' or specific category).
   */
  function render(filter = 'all') {
    currentFilter = filter;
    const container = document.getElementById('projects-grid');
    if (!container) return;

    const filtered = filter === 'all'
      ? projects
      : projects.filter(p => p.category.includes(filter));

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16" style="color: var(--color-text-muted);">
          <p class="text-lg">No hay proyectos con ese filtro.</p>
          <p class="text-sm mt-2">Prueba con otra categoría.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(renderCard).join('');

    // Re-trigger scroll animations
    requestAnimationFrame(() => {
      ScrollAnimator.observe();
    });
  }

  return { loadProjects, render };
})();


// ============================================
// Filter Manager
// ============================================
const FilterManager = (() => {
  /**
   * Initializes filter button click handlers.
   */
  function init() {
    const filterContainer = document.getElementById('filter-buttons');
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      // Update active state
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Apply filter
      const filter = btn.getAttribute('data-filter');
      ProjectRenderer.render(filter);
    });
  }

  return { init };
})();


// ============================================
// Scroll Animator (Intersection Observer)
// ============================================
const ScrollAnimator = (() => {
  let observer;

  /** Creates the IntersectionObserver and observes `.fade-up` elements. */
  function init() {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observe();
  }

  /** Observes all `.fade-up` elements not yet visible. */
  function observe() {
    document.querySelectorAll('.fade-up:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  }

  return { init, observe };
})();


// ============================================
// Navbar Scroll Behavior
// ============================================
const NavbarManager = (() => {
  function init() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  return { init };
})();


// ============================================
// Mobile Menu
// ============================================
const MobileMenu = (() => {
  let isOpen = false;

  function init() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      menu.classList.toggle('open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        menu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        menu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
        toggleBtn.focus();
      }
    });
  }

  return { init };
})();


// ============================================
// Smooth scroll for anchor links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


// ============================================
// App Initialization
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Theme
  ThemeManager.init();
  document.getElementById('theme-toggle')?.addEventListener('click', ThemeManager.toggle);

  // 2. Load & render projects
  await ProjectRenderer.loadProjects();
  ProjectRenderer.render('all');

  // 3. Initialize modules
  FilterManager.init();
  ScrollAnimator.init();
  NavbarManager.init();
  MobileMenu.init();
  initSmoothScroll();
});
