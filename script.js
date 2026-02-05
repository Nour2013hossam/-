const pages = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const actionButtons = document.querySelectorAll('[data-page]');
const searchInput = document.getElementById('siteSearch');
const searchResults = document.getElementById('searchResults');
const modeToggle = document.getElementById('modeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

const topics = Array.from(pages).map((section) => ({
  id: section.id,
  title: section.dataset.title,
  keywords: section.dataset.keywords || '',
}));

const showPage = (pageId) => {
  pages.forEach((page) => page.classList.toggle('active', page.id === pageId));
  navLinks.forEach((link) => link.classList.toggle('active', link.dataset.page === pageId));
  navLinksContainer.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleSearch = (query) => {
  searchResults.innerHTML = '';
  if (!query.trim()) {
    searchResults.style.display = 'none';
    return;
  }

  const results = topics.filter((topic) =>
    `${topic.title} ${topic.keywords}`.toLowerCase().includes(query.toLowerCase())
  );

  if (!results.length) {
    searchResults.innerHTML = '<li>لا توجد نتائج مطابقة.</li>';
    searchResults.style.display = 'block';
    return;
  }

  results.forEach((result) => {
    const li = document.createElement('li');
    li.textContent = result.title;
    li.addEventListener('click', () => {
      showPage(result.id);
      searchResults.style.display = 'none';
      searchInput.value = '';
    });
    searchResults.appendChild(li);
  });

  searchResults.style.display = 'block';
};

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showPage(link.dataset.page);
  });
});

actionButtons.forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.page));
});

searchInput.addEventListener('input', (event) => handleSearch(event.target.value));

modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  modeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('darkMode', isDark ? 'on' : 'off');
});

menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

const animatedItems = document.querySelectorAll('.animate, .info-card, .mini-card, .tip');
animatedItems.forEach((item) => {
  item.classList.add('animate');
  observer.observe(item);
});

const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'on') {
  document.body.classList.add('dark-mode');
  modeToggle.textContent = '☀️';
}
