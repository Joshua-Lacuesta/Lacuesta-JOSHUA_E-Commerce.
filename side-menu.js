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

const profileData = {
  name: 'Jamie Dela Cruz',
  email: 'jamie.delacruz@tau.edu.ph',
  course: 'BS Agricultural Engineering',
  yearLevel: '3rd Year'
};

function getInitials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('');
}

const savedProfile = localStorage.getItem('tauMarketProfile');
if (savedProfile) {
  Object.assign(profileData, JSON.parse(savedProfile));
}

let selectedCategory = 'All';
const productCatalog = [
  { name: 'TAU Black Ballpen', category: 'School Essentials', description: 'Smooth black ballpen for classes and campus work.', price: 'PHP 49.00', image: '../EXAMPLES/CP56-Black-Regal-Ballpen-1024x1024.jpg' },
  { name: 'Permanent Black Marker', category: 'School Essentials', description: 'Reliable marker for labels, projects, and presentations.', price: 'PHP 89.00', image: '../EXAMPLES/61Ksyl+vVvL._AC_.jpg' },
  { name: 'TAU Gel Pen', category: 'School Essentials', description: 'Smooth everyday pen for notes and assignments.', price: 'PHP 59.00', image: '../EXAMPLES/CP56-Black-Regal-Ballpen-1024x1024.jpg' },
  { name: 'Organic Seed Starter Kit', category: 'Agri Supplies', description: 'Vegetable seeds, soil pellets, and planting guide.', price: 'PHP 349.00', image: '../EXAMPLES/espoma-organic-seed-starter-4818d59d88344c44a8d8ab2d320cf8de.jpg' },
  { name: 'Organic Pumpkin Seeds', category: 'Agri Supplies', description: 'Quality pumpkin seeds for nutritious crop production.', price: 'PHP 199.00', image: '../EXAMPLES/61DqAz3WONL._SL1200_.jpg' },
  { name: 'Recycled Garden Bricks', category: 'Agri Supplies', description: 'Sustainable recycled material for garden projects.', price: 'PHP 249.00', image: '../EXAMPLES/OIP (4).jpg' },
  { name: 'Premium White Rice', category: 'Fresh Harvest', description: 'Clean, quality rice from local agricultural growers.', price: 'PHP 299.00', image: '../EXAMPLES/types-of-rice-long-grain-white-600x400.jpg' },
  { name: 'Fresh Goat Milk', category: 'Fresh Harvest', description: 'Fresh dairy product from trusted local farm partners.', price: 'PHP 159.00', image: '../EXAMPLES/goat-milk-6763139-1.jpeg' },
  { name: 'Sunflower Seeds', category: 'Fresh Harvest', description: 'Nutritious seeds prepared from a local harvest selection.', price: 'PHP 179.00', image: '../EXAMPLES/Sunflower-Seeds.webp' }
];

function productCards(category = 'All') {
  const products = category === 'All' ? productCatalog : productCatalog.filter((product) => product.category === category);
  return products.map((product) => `<article class="product-card"><div class="product-art product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span>${product.category.toUpperCase()}</span></div><span class="product-category">${product.category}</span><h3>${product.name}</h3><p>${product.description}</p><strong>${product.price}</strong><button class="primary-button add-cart" type="button">Add to cart</button></article>`).join('');
}

const pageViews = {
  Home: {
    eyebrow: 'Good morning, Jamie',
    description: 'Discover useful products made for a smarter campus life.',
    content: `<section class="welcome-banner"><div><span class="kicker">Featured this week</span><h2>Grow better. Shop smarter.</h2><p>TAU Market brings practical school, garden, and campus essentials together in one friendly storefront.</p><button class="primary-button" data-view="Products">Shop products</button></div><div class="banner-mark">TAU<br><small>SMART<br>MARKET</small></div></section><section class="section-heading"><div><span class="kicker">Recommended for you</span><h2>Fresh picks</h2></div><span class="muted-text">New arrivals and campus favorites</span></section><div class="product-grid compact-grid"><article class="product-card"><div class="product-art art-seed">SEEDS</div><h3>Organic Seed Starter Kit</h3><p>Everything for your first campus garden.</p><strong>PHP 349.00</strong></article><article class="product-card"><div class="product-art art-bottle">WRITE</div><h3>TAU Black Ballpen</h3><p>Smooth black ballpen for classes and campus work.</p><strong>PHP 49.00</strong></article><article class="product-card"><div class="product-art art-basket">HARVEST</div><h3>Local Harvest Basket</h3><p>Fresh produce from partner growers.</p><strong>PHP 499.00</strong></article></div>`
  },
  Products: {
    eyebrow: 'Shop all',
    description: 'Practical finds from our student and community sellers.',
    content: `<section class="page-intro"><span class="kicker">Product catalogue</span><h2 id="products-heading">Everything you need, close at hand.</h2><p>Browse school essentials, sustainable goods, and fresh agricultural products.</p></section><div id="product-results" class="product-grid"></div>`
  },
  Categories: {
    eyebrow: 'Browse by interest',
    description: 'Find the right collection for your next campus project.',
    content: `<div class="category-grid"><article class="category-card"><span class="category-number">01</span><h2>School Essentials</h2><p>Notebooks, supplies, and everyday tools for classes and campus work.</p><button class="text-button" data-view="Products" data-category="School Essentials">View products <span aria-hidden="true">-></span></button></article><article class="category-card"><span class="category-number">02</span><h2>Agri Supplies</h2><p>Seeds, starter kits, and helpful equipment for growing projects.</p><button class="text-button" data-view="Products" data-category="Agri Supplies">View products <span aria-hidden="true">-></span></button></article><article class="category-card"><span class="category-number">03</span><h2>Fresh Harvest</h2><p>Local produce and thoughtfully prepared goods from partner growers.</p><button class="text-button" data-view="Products" data-category="Fresh Harvest">View products <span aria-hidden="true">-></span></button></article></div>`
  },
  Cart: {
    eyebrow: 'Shopping bag',
    description: 'Review your selected items before checkout.',
    content: `<section class="cart-layout"><div class="card cart-list"><div class="section-heading"><h2>Your cart</h2><span class="status-pill">1 item</span></div><article class="cart-item"><div class="product-art small-art art-seed">SEEDS</div><div><h3>Organic Seed Starter Kit</h3><p>School Essentials</p><div class="quantity-control"><button type="button" aria-label="Decrease quantity">-</button><span>1</span><button type="button" aria-label="Increase quantity">+</button></div></div><strong>PHP 349.00</strong></article></div><aside class="card order-summary"><span class="kicker">Order summary</span><h2>PHP 349.00</h2><p>Shipping calculated at checkout.</p><button class="primary-button checkout-button">Proceed to checkout</button></aside></section>`
  },
  'My Orders': {
    eyebrow: 'Your purchases',
    description: 'Track recent orders and review their status.',
    content: `<section class="card"><div class="section-heading"><h2>Order history</h2><span class="muted-text">3 total orders</span></div><div class="order-list"><article class="order-row"><div><strong>#TAU-2025-018</strong><span>Organic Seed Starter Kit</span></div><span class="status-pill delivered">Delivered</span><strong>PHP 349.00</strong></article><article class="order-row"><div><strong>#TAU-2025-011</strong><span>TAU Black Ballpen</span></div><span class="status-pill preparing">Preparing</span><strong>PHP 49.00</strong></article><article class="order-row"><div><strong>#TAU-2024-097</strong><span>Local Harvest Basket</span></div><span class="status-pill delivered">Delivered</span><strong>PHP 499.00</strong></article></div></section>`
  },
  Wishlist: {
    eyebrow: 'Saved for later',
    description: 'Keep the products you love within easy reach.',
    content: `<div class="wishlist-grid"><article class="card wishlist-item"><div class="product-art art-bottle">WRITE</div><h3>TAU Black Ballpen</h3><p>Smooth black ballpen for classes and campus work.</p><strong>PHP 49.00</strong><button class="primary-button add-cart">Move to cart</button></article><article class="card wishlist-item"><div class="product-art art-basket">HARVEST</div><h3>Local Harvest Basket</h3><p>Fresh produce selected from partner growers.</p><strong>PHP 499.00</strong><button class="primary-button add-cart">Move to cart</button></article><article class="card wishlist-item"><div class="product-art art-seed">SEEDS</div><h3>Organic Seed Starter Kit</h3><p>A simple beginning for your next growing project.</p><strong>PHP 349.00</strong><button class="primary-button add-cart">Move to cart</button></article></div>`
  },
  Profile: {
    eyebrow: 'Account',
    description: 'Your student information and campus identity.',
    content: `<section class="profile-layout"><div class="profile-card"><div class="profile-initials">${getInitials(profileData.name)}</div><h2>${profileData.name}</h2><p class="muted-text">Student member since 2024</p></div><div class="card details-card"><span class="kicker">Personal information</span><div class="detail-row"><span>Name</span><strong>${profileData.name}</strong></div><div class="detail-row"><span>Email</span><strong>${profileData.email}</strong></div><div class="detail-row"><span>Course</span><strong>${profileData.course}</strong></div><div class="detail-row"><span>Year level</span><strong>${profileData.yearLevel}</strong></div><button class="primary-button edit-profile" type="button">Edit profile</button></div></section>`
  },
  Settings: {
    eyebrow: 'Preferences',
    description: 'Control your account, privacy, and notifications.',
    content: `<section class="settings-list"><article class="card setting-row"><div><h2>Account settings</h2><p>Manage your contact details and password.</p></div><button class="outline-button">Manage</button></article><article class="card setting-row"><div><h2>Privacy settings</h2><p>Choose how your information is used and shared.</p></div><button class="outline-button">Manage</button></article><article class="card setting-row"><div><h2>Notification settings</h2><p>Receive updates about orders and promotions.</p></div><label class="switch"><input type="checkbox" checked><span></span><b>On</b></label></article></section>`
  },
  Logout: {
    eyebrow: 'System',
    description: 'This page represents the logout section of the portal.',
    content: `<section class="logout-card"><div class="logout-mark">↗</div><span class="kicker">See you soon</span><h2>Ready to leave TAU Market?</h2><p>Logging out will end your current marketplace session. Your cart and saved items will remain available when you return.</p><button class="primary-button logout-button">Log out</button></section>`
  }
};

function renderView(viewName) {
  const view = pageViews[viewName] || pageViews.Home;
  document.getElementById('page-title').textContent = viewName;
  document.querySelector('.eyebrow').textContent = view.eyebrow;
  document.getElementById('page-content').innerHTML = view.content;
  if (viewName === 'Products') {
    document.getElementById('product-results').innerHTML = productCards(selectedCategory);
    document.getElementById('products-heading').textContent = selectedCategory === 'All' ? 'Everything you need, close at hand.' : `${selectedCategory} products`;
  }
  document.querySelector('.content-header').querySelector('h1').focus?.();
}

function renderProfileForm() {
  const detailsCard = document.querySelector('.details-card');
  if (!detailsCard) return;
  detailsCard.innerHTML = `<span class="kicker">Edit personal information</span><label class="profile-field">Name<input name="name" type="text" value="${profileData.name}" required></label><label class="profile-field">Email<input name="email" type="email" value="${profileData.email}" required></label><label class="profile-field">Course<input name="course" type="text" value="${profileData.course}" required></label><label class="profile-field">Year level<select name="yearLevel"><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select></label><div class="profile-actions"><button class="primary-button save-profile" type="button">Save changes</button><button class="outline-button cancel-profile" type="button">Cancel</button></div>`;
  detailsCard.querySelector('[name="yearLevel"]').value = profileData.yearLevel;
  detailsCard.querySelector('[name="name"]').focus();
}

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const title = document.getElementById('page-title');
  renderView('Home');

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
        setActiveMenu(link);
        renderView('Logout');
      } else {
        setActiveMenu(link);
        if (link.dataset.title === 'Products') selectedCategory = 'All';
        renderView(link.dataset.title);
      }
    });
    // allow keyboard activation
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.edit-profile')) {
      renderProfileForm();
    }
    if (event.target.closest('.cancel-profile')) {
      renderView('Profile');
    }
    if (event.target.closest('.save-profile')) {
      const form = event.target.closest('.details-card');
      const fields = Object.fromEntries([...form.querySelectorAll('input, select')].map((field) => [field.name, field.value]));
      if (!form.querySelector('[name="name"]').value.trim() || !form.querySelector('[name="email"]').value.trim() || !form.querySelector('[name="course"]').value.trim()) {
        alert('Please complete all profile fields.');
        return;
      }
      Object.assign(profileData, fields);
      localStorage.setItem('tauMarketProfile', JSON.stringify(profileData));
      renderView('Profile');
    }
    const viewTrigger = event.target.closest('[data-view]');
    if (viewTrigger) {
      if (viewTrigger.dataset.category) selectedCategory = viewTrigger.dataset.category;
      const targetLink = [...links].find((link) => link.dataset.title === viewTrigger.dataset.view);
      if (targetLink) targetLink.click();
    }
    if (event.target.closest('.add-cart')) {
      const cartCount = document.getElementById('cart-count');
      cartCount.textContent = Number(cartCount.textContent) + 1;
      event.target.closest('.add-cart').textContent = 'Added to cart';
    }
    if (event.target.closest('.logout-button')) {
      alert('You have been logged out of TAU Market.');
    }
  });
});
