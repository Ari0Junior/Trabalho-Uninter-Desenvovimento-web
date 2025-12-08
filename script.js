// script.js
// JS puro: controla menu mobile, validação do formulário, tema e modal de confirmação.

// DOM elements
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const feedbackEl = document.getElementById('form-feedback');
const resetBtn = document.getElementById('reset-btn');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const yearEl = document.getElementById('year');

// Atualiza ano do rodapé
yearEl.textContent = new Date().getFullYear();

// --- Nav mobile toggle ---
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Fecha menu ao clicar em link (boa usabilidade)
mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// --- Tema claro/escuro ---
// Persistência simples via localStorage
const THEME_KEY = 'portfolio-theme';
function setTheme(t) {
  if (t === 'dark') document.body.classList.add('theme-dark'), document.body.classList.remove('theme-light');
  else document.body.classList.add('theme-light'), document.body.classList.remove('theme-dark');
  localStorage.setItem(THEME_KEY, t);
}
const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
  setTheme(next);
});

// --- Form validation e simulação de envio ---
// Valida: todos preenchidos e email com regex simples
function validateEmail(email) {
  // Regex simples para validar formato básico (não 100% completa, mas suficiente para exercício)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // evita envio real
  feedbackEl.textContent = ''; // limpa mensagens anteriores

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  // Valida campos obrigatórios
  if (!name || !email || !message) {
    feedbackEl.textContent = 'Por favor, preencha todos os campos.';
    feedbackEl.style.color = 'var(--muted)';
    return;
  }

  // Valida formato de email
  if (!validateEmail(email)) {
    feedbackEl.textContent = 'Por favor, informe um e-mail em formato válido (ex: usuario@dominio.com).';
    feedbackEl.style.color = 'crimson';
    return;
  }

  // Se chegou até aqui, "simulamos" o envio:
  // 1) limpa campos
  contactForm.reset();

  // 2) mostra modal de confirmação (conforme sugestão do enunciado)
  modal.setAttribute('aria-hidden', 'false');

  // 3) atualiza feedback
  feedbackEl.textContent = 'Mensagem enviada (simulação).';
  feedbackEl.style.color = 'var(--muted)';
});

// Reset do formulário pelo botão
resetBtn.addEventListener('click', () => {
  contactForm.reset();
  feedbackEl.textContent = '';
});

// Modal: fechar ao clicar no botão
modalClose.addEventListener('click', () => {
  modal.setAttribute('aria-hidden', 'true');
});

// Fechar modal com Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    modal.setAttribute('aria-hidden', 'true');
  }
});
