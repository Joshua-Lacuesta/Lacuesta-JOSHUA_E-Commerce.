function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menuToggle');
  if (sidebar) {
    const collapsed = sidebar.classList.toggle('collapsed');
    if (toggle) toggle.setAttribute('aria-expanded', String(!collapsed));
    // also toggle a class on the app-shell so content can animate
    const shell = document.querySelector('.app-shell');
    if (shell) shell.classList.toggle('sidebar-collapsed', collapsed);
  }
}

function setActiveMenu(activeLink) {
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });
  activeLink.classList.add('active');
  activeLink.setAttribute('aria-current', 'page');
}

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const title = document.getElementById('page-title');
  const description = document.getElementById('page-description');

  // keyboard: toggle menu with Ctrl+M
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
      toggleMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      if (link.dataset.action === 'logout') {
        alert('Logout clicked. You are now signing out.');
        return;
      }

      setActiveMenu(link);
      if (title) title.textContent = link.dataset.title || 'Menu Item';
      if (description) description.textContent = link.dataset.description || 'Selected menu item.';
    });
    // allow keyboard activation
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
});
