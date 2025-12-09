// script.js — menu mobile, tema, validação do formulário, modal e reveal scroll

// DOM elements
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const resetBtn = document.getElementById('reset-btn');
const feedbackEl = document.getElementById('form-feedback');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const yearEl = document.getElementById('year');
const openCvBtn = document.getElementById('open-cv');

// ano rodapé
if (yearEl) yearEl.textContent = new Date().getFullYear();

// NAV MOBILE
navToggle && navToggle.addEventListener('click', () => {
  if (!mainNav) return;
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// THEME: persist via localStorage and detect system preference
const THEME_KEY = 'portfolio-theme';
function applyTheme(theme) {
  document.body.classList.remove('theme-light','theme-dark');
  document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  localStorage.setItem(THEME_KEY, theme);
}
const saved = localStorage.getItem(THEME_KEY);
if (saved) applyTheme(saved);
else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}
themeToggle && themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('theme-dark');
  applyTheme(isDark ? 'light' : 'dark');
});

// FORM VALIDATION & SIMULATION
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm && contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!contactForm) return;

  feedbackEl.textContent = '';
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    feedbackEl.textContent = 'Por favor, preencha todos os campos.';
    feedbackEl.style.color = 'var(--muted)';
    return;
  }
  if (!validateEmail(email)) {
    feedbackEl.textContent = 'Por favor, informe um e-mail válido.';
    feedbackEl.style.color = 'crimson';
    return;
  }

  // simula envio: limpa e mostra modal
  contactForm.reset();
  if (modal) {
    modal.setAttribute('aria-hidden','false');
  }
  feedbackEl.textContent = 'Mensagem enviada (simulação).';
  feedbackEl.style.color = 'var(--muted)';
});

// reset
resetBtn && resetBtn.addEventListener('click', () => {
  if (!contactForm) return;
  contactForm.reset();
  feedbackEl.textContent = '';
});

// modal close
modalClose && modalClose.addEventListener('click', () => {
  if (!modal) return;
  modal.setAttribute('aria-hidden','true');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
    modal.setAttribute('aria-hidden','true');
  }
});

// simple reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // optionally unobserve to run once
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => obs.observe(r));

// make mini-chart bars animate (decorative)
document.querySelectorAll('.mini-chart span').forEach(s => {
  const h = s.style.getPropertyValue('--h') || '60%';
  s.style.height = '6px';
  setTimeout(()=> s.style.height = h, 150);
});

// If "Abrir currículo" should open modal instead of new tab (optional)
openCvBtn && openCvBtn.addEventListener('click', (e) => {
  // default: opens in new tab; if you want a modal viewer, implement here.
});
