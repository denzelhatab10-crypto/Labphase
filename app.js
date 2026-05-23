/*
  app.js (extracted)
  Responsibilities:
  - Theme toggle (persisted in localStorage)
  - Mobile menu open/close
  - Render menu cards from a simple data array
  - Decorative sparks + parallax effect
  - Reveal animations using IntersectionObserver
*/

// THEME: toggle and persistence
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', stored);
if (themeBtn) {
  themeBtn.textContent = stored === 'dark' ? '☀️' : '🌙';
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// MOBILE MENU: open/close behaviour for small screens
const mt = document.getElementById('menuToggle');
const mm = document.getElementById('mobileMenu');
if (mt && mm) {
  mt.addEventListener('click', () => mm.classList.toggle('open'));
  mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));
}

// MENU CARDS: build DOM markup for each menu item
const items = [
  {img:'/img/menu-1.jpg',title:'Sandwich Sauce Burger',desc:'Steak grillé braise vive, bacon fumé, sauce maison signature.',price:'4 500',tag:'Best-seller'},
  {img:'/img/menu-2.jpg',title:'Jambon Fromage Toasté',desc:'Pain doré au feu, jambon fondant, fromage qui file.',price:'4 000',tag:'Classic'},
  {img:'/img/menu-3.jpg',title:'Double Steak Bacon',desc:'Deux steaks, double bacon, pour les grosses faims de minuit.',price:'5 000',tag:'Fire 🔥'},
  {img:'/img/menu-4.jpg',title:'Double Smash Bacon',desc:'Smash crispy, cheddar coulant, bacon caramélisé.',price:'5 500',tag:'New'},
];
const grid = document.getElementById('menuGrid');
if (grid) {
  grid.innerHTML = items.map(it => `
    <article class="card reveal">
      <div class="card-img">
        <img src="${it.img}" alt="${it.title}" loading="lazy" />
        <span class="tag">${it.tag}</span>
      </div>
      <div class="card-body">
        <h3>${it.title}</h3>
        <p>${it.desc}</p>
        <div class="price-row">
          <span class="price ember-text">${it.price} <small>FCFA</small></span>
          <button class="icon-btn primary" aria-label="Ajouter">+</button>
        </div>
      </div>
    </article>
  `).join('');
}

// SPARKS: decorative animated particles rising from the grill
const sp = document.getElementById('sparks');
if (sp) {
  for (let i=0;i<16;i++){
    const s=document.createElement('span');
    s.className='spark';
    s.style.left=(i*7+5)%100+'%';
    s.style.animationDuration=(5+i%5)+'s';
    s.style.animationDelay=(i*.5)+'s';
    sp.appendChild(s);
  }
}

// PARALLAX: subtle background translate on scroll
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) heroBg.style.transform = `translateY(${y*0.4}px)`;
  }, {passive:true});
}

// REVEAL ON SCROLL: fade/translate elements into view once
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
}, {threshold:.15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
