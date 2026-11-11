import React, { useEffect, useState } from 'react';
import ballpenImage from '../assets/ballpen.jpg';
import markerImage from '../assets/marker.jpg';
import seedStarterImage from '../assets/seed-starter.jpg';
import pumpkinSeedsImage from '../assets/pumpkin-seeds.jpg';
import gardenBricksImage from '../assets/garden-bricks.jpg';
import riceImage from '../assets/rice.jpg';
import goatMilkImage from '../assets/goat-milk.jpeg';
import sunflowerSeedsImage from '../assets/sunflower-seeds.webp';

const products = [
  { id: 'ballpen', name: 'TAU Black Ballpen', category: 'School Essentials', description: 'A dependable everyday pen for classes, notes, and campus work.', price: 49, image: ballpenImage },
  { id: 'marker', name: 'Permanent Black Marker', category: 'School Essentials', description: 'A bold, reliable marker for labels, projects, and presentations.', price: 89, image: markerImage },
  { id: 'gel-pen', name: 'TAU Gel Pen', category: 'School Essentials', description: 'Smooth ink for assignments, planners, and lecture notes.', price: 59, image: ballpenImage },
  { id: 'seed-starter', name: 'Organic Seed Starter Kit', category: 'Agri Supplies', description: 'A simple start with vegetable seeds, soil pellets, and a growing guide.', price: 349, image: seedStarterImage },
  { id: 'pumpkin-seeds', name: 'Organic Pumpkin Seeds', category: 'Agri Supplies', description: 'A useful seed selection for your next campus growing project.', price: 199, image: pumpkinSeedsImage },
  { id: 'garden-bricks', name: 'Recycled Garden Bricks', category: 'Agri Supplies', description: 'Recycled material for practical, lower-waste garden projects.', price: 249, image: gardenBricksImage },
  { id: 'rice', name: 'Premium White Rice', category: 'Fresh Harvest', description: 'Quality long-grain rice selected from local agricultural growers.', price: 299, image: riceImage },
  { id: 'goat-milk', name: 'Fresh Goat Milk', category: 'Fresh Harvest', description: 'Farm-fresh dairy from trusted local farm partners.', price: 159, image: goatMilkImage },
  { id: 'sunflower-seeds', name: 'Sunflower Seeds', category: 'Fresh Harvest', description: 'A nourishing snack from a carefully selected local harvest.', price: 179, image: sunflowerSeedsImage },
];

const navigation = [
  { section: 'Discover', items: [{ label: 'Home', icon: 'bi-house-door' }, { label: 'Products', icon: 'bi-grid' }, { label: 'Categories', icon: 'bi-collection' }] },
  { section: 'Your market', items: [{ label: 'Cart', icon: 'bi-bag' }, { label: 'My Orders', icon: 'bi-receipt' }, { label: 'Wishlist', icon: 'bi-heart' }] },
  { section: 'Account', items: [{ label: 'Profile', icon: 'bi-person' }, { label: 'Settings', icon: 'bi-sliders' }] },
];

const defaultProfile = {
  name: 'Jamie Dela Cruz',
  email: 'jamie.delacruz@tau.edu.ph',
  course: 'BS Agricultural Engineering',
  yearLevel: '3rd Year',
};

function readProfile() {
  try {
    return { ...defaultProfile, ...JSON.parse(localStorage.getItem('tauMarketProfile') || '{}') };
  } catch {
    return defaultProfile;
  }
}

function money(value) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
}

function App() {
  const [activeView, setActiveView] = useState('Home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState({ 'seed-starter': 1 });
  const [wishlist, setWishlist] = useState(['ballpen', 'rice', 'pumpkin-seeds']);
  const [profile, setProfile] = useState(readProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [notice, setNotice] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [orders, setOrders] = useState([
    { number: 'TAU-2025-018', product: 'Organic Seed Starter Kit', status: 'Delivered', total: 349 },
    { number: 'TAU-2025-011', product: 'TAU Black Ballpen', status: 'Preparing', total: 49 },
    { number: 'TAU-2024-097', product: 'Local Harvest Basket', status: 'Delivered', total: 499 },
  ]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const cartItems = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  const cartCount = cartItems.reduce((sum, [, quantity]) => sum + quantity, 0);
  const cartTotal = cartItems.reduce((sum, [id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return sum + (product?.price || 0) * quantity;
  }, 0);
  const visibleProducts = products.filter((product) => (
    (activeCategory === 'All' || product.category === activeCategory)
    && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search.toLowerCase())
  ));

  function navigate(view) {
    setActiveView(view);
    setMenuOpen(false);
    setNotice('');
    if (view === 'Products') setActiveCategory('All');
    if (view !== 'Profile') setEditingProfile(false);
  }

  function addToCart(id) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setNotice('Added to your cart.');
  }

  function changeQuantity(id, amount) {
    setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) + amount) }));
  }

  function toggleWishlist(id) {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function saveProfile(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedProfile = Object.fromEntries(formData.entries());
    localStorage.setItem('tauMarketProfile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setEditingProfile(false);
    setNotice('Your profile has been saved.');
  }

  function checkout() {
    if (!cartCount) return;
    const order = {
      number: `TAU-${new Date().getFullYear()}-${String(orders.length + 19).padStart(3, '0')}`,
      product: `${cartCount} item${cartCount === 1 ? '' : 's'}`,
      status: 'Preparing',
      total: cartTotal,
    };
    setOrders((current) => [order, ...current]);
    setCart({});
    setActiveView('My Orders');
    setNotice('Order placed successfully.');
  }

  function ProductCard({ product }) {
    const saved = wishlist.includes(product.id);
    return (
      <article className="product-card h-100">
        <div className="product-image-wrap">
          <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
          <span className="product-tag">{product.category}</span>
          <button className={`save-product ${saved ? 'is-saved' : ''}`} type="button" onClick={() => toggleWishlist(product.id)} aria-label={`${saved ? 'Remove' : 'Add'} ${product.name} ${saved ? 'from' : 'to'} wishlist`} aria-pressed={saved}>
            <i className={`bi ${saved ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
          </button>
        </div>
        <div className="product-copy">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <h3>{product.name}</h3>
            <strong className="product-price">{money(product.price)}</strong>
          </div>
          <p>{product.description}</p>
          <button className="btn btn-dark add-button" type="button" onClick={() => addToCart(product.id)}>
            <i className="bi bi-plus-lg me-2" aria-hidden="true" />Add to cart
          </button>
        </div>
      </article>
    );
  }

  function ProductGrid({ items }) {
    if (!items.length) return <p className="empty-state">No products match your search.</p>;
    return <div className="row g-3 g-lg-4">{items.map((product) => <div className="col-12 col-sm-6 col-xl-4" key={product.id}><ProductCard product={product} /></div>)}</div>;
  }

  function renderContent() {
    if (activeView === 'Home') {
      return (
        <>
          <section className="market-hero">
            <div className="hero-copy">
              <span className="eyebrow">A local campus marketplace</span>
              <h2>Good things, grown <em>together.</em></h2>
              <p>Find practical campus essentials and fresh picks from the TAU community.</p>
              <button className="btn btn-light hero-button" type="button" onClick={() => navigate('Products')}>Explore the market <i className="bi bi-arrow-up-right ms-2" aria-hidden="true" /></button>
            </div>
            <div className="hero-stamp" aria-hidden="true"><span>TAU</span><small>MARKET<br />LOCAL FINDS</small></div>
          </section>
          <SectionHeading title="Picked for campus" subtitle="Useful finds from student and community sellers." action={<button className="link-button" type="button" onClick={() => navigate('Products')}>View all <i className="bi bi-arrow-right" aria-hidden="true" /></button>} />
          <ProductGrid items={products.slice(0, 3)} />
          <section className="community-strip mt-4"><span className="community-mark"><i className="bi bi-flower1" aria-hidden="true" /></span><div><h2>From the campus community</h2><p>Thoughtful supplies and local harvest, all in one place.</p></div><button className="btn btn-outline-dark ms-lg-auto" type="button" onClick={() => navigate('Categories')}>Browse categories</button></section>
        </>
      );
    }

    if (activeView === 'Products') {
      const categories = ['All', ...new Set(products.map((product) => product.category))];
      return (
        <>
          <SectionHeading title="The market" subtitle="Campus essentials, growing supplies, and local harvest." />
          <div className="catalog-tools">
            <div className="category-tabs" role="group" aria-label="Filter by product category">
              {categories.map((category) => <button key={category} className={`category-tab ${activeCategory === category ? 'active' : ''}`} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <label className="search-control"><i className="bi bi-search" aria-hidden="true" /><span className="visually-hidden">Search products</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the market" /></label>
          </div>
          <p className="results-count" aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}</p>
          <ProductGrid items={visibleProducts} />
        </>
      );
    }

    if (activeView === 'Categories') {
      return (
        <>
          <SectionHeading title="Shop by category" subtitle="Choose a collection and find what you need." />
          <div className="row g-3 g-lg-4">{['School Essentials', 'Agri Supplies', 'Fresh Harvest'].map((category, index) => {
            const categoryProducts = products.filter((product) => product.category === category);
            return <div className="col-12 col-lg-4" key={category}><article className={`category-card category-tone-${index + 1}`}><span className="category-index">0{index + 1} / COLLECTION</span><i className={`bi ${['bi-pencil', 'bi-flower1', 'bi-basket'][index]} category-icon`} aria-hidden="true" /><h2>{category}</h2><p>{['Everyday tools for classes and campus work.', 'Seeds and supplies for growing projects.', 'Quality goods from local agricultural partners.'][index]}</p><button className="category-link" type="button" onClick={() => { setActiveCategory(category); setSearch(''); setActiveView('Products'); }} aria-label={`View ${category} products`}>Explore collection <i className="bi bi-arrow-up-right" aria-hidden="true" /></button><span className="category-count">{categoryProducts.length} PRODUCTS</span></article></div>;
          })}</div>
        </>
      );
    }

    if (activeView === 'Cart') {
      return (
        <>
          <SectionHeading title="Your bag" subtitle={`${cartCount} ${cartCount === 1 ? 'item' : 'items'} ready when you are.`} />
          {cartItems.length ? <div className="row g-4 align-items-start"><div className="col-12 col-xl-8"><div className="surface-panel cart-list">{cartItems.map(([id, quantity]) => {
            const product = products.find((item) => item.id === id);
            if (!product) return null;
            return <article className="cart-row" key={id}><img src={product.image} alt="" /><div className="cart-product-copy"><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><strong>{money(product.price)}</strong></div><div className="quantity-control" aria-label={`${product.name} quantity`}><button type="button" onClick={() => changeQuantity(id, -1)} aria-label={`Decrease ${product.name} quantity`}>−</button><span aria-live="polite">{quantity}</span><button type="button" onClick={() => changeQuantity(id, 1)} aria-label={`Increase ${product.name} quantity`}>+</button></div><button className="remove-button" type="button" onClick={() => setCart((current) => ({ ...current, [id]: 0 }))} aria-label={`Remove ${product.name} from cart`}><i className="bi bi-trash3" aria-hidden="true" /></button></article>;
          })}</div></div><div className="col-12 col-xl-4"><aside className="surface-panel summary-panel"><span className="eyebrow">Order summary</span><div className="summary-line"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><div className="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div><div className="summary-total"><span>Total</span><strong>{money(cartTotal)}</strong></div><button className="btn btn-dark w-100" type="button" onClick={checkout}>Place order <i className="bi bi-arrow-right ms-2" aria-hidden="true" /></button></aside></div></div> : <EmptyState title="Your bag is empty" action="Browse products" onAction={() => navigate('Products')} />}
        </>
      );
    }

    if (activeView === 'My Orders') {
      return <><SectionHeading title="Order history" subtitle="A record of your recent market finds." />{orders.length ? <div className="surface-panel order-list">{orders.map((order) => <article className="order-row" key={order.number}><div><span className="eyebrow">{order.number}</span><h2>{order.product}</h2></div><span className={`order-status ${order.status === 'Delivered' ? 'delivered' : ''}`}>{order.status}</span><strong>{money(order.total)}</strong></article>)}</div> : <EmptyState title="No orders yet" action="Explore the market" onAction={() => navigate('Products')} />}</>;
    }

    if (activeView === 'Wishlist') {
      const savedProducts = products.filter((product) => wishlist.includes(product.id));
      return <><SectionHeading title="Saved for later" subtitle="Your shortlist from the TAU Market." />{savedProducts.length ? <ProductGrid items={savedProducts} /> : <EmptyState title="Your wishlist is clear" action="Find something to save" onAction={() => navigate('Products')} />}</>;
    }

    if (activeView === 'Profile') {
      return <><SectionHeading title="Your profile" subtitle="Your campus details, all in one place." /><div className="row g-4"><div className="col-12 col-lg-4"><section className="profile-identity"><div className="profile-avatar" aria-hidden="true">{profile.name.split(' ').map((word) => word[0]).slice(0, 2).join('').toUpperCase()}</div><h2>{profile.name}</h2><p>TAU Market member</p></section></div><div className="col-12 col-lg-8"><section className="surface-panel profile-details"><div className="panel-heading"><div><span className="eyebrow">Personal information</span><h2>{editingProfile ? 'Edit your details' : 'Account details'}</h2></div>{!editingProfile && <button className="btn btn-outline-dark" type="button" onClick={() => setEditingProfile(true)}>Edit profile</button>}</div>{editingProfile ? <form onSubmit={saveProfile} className="profile-form"><label className="form-label">Full name<input className="form-control" name="name" defaultValue={profile.name} autoComplete="name" required /></label><label className="form-label">Email address<input className="form-control" name="email" type="email" defaultValue={profile.email} autoComplete="email" required /></label><label className="form-label">Course<input className="form-control" name="course" defaultValue={profile.course} required /></label><label className="form-label">Year level<select className="form-select" name="yearLevel" defaultValue={profile.yearLevel}><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select></label><div className="d-flex flex-wrap gap-2"><button className="btn btn-dark" type="submit">Save changes</button><button className="btn btn-outline-dark" type="button" onClick={() => setEditingProfile(false)}>Cancel</button></div></form> : <dl className="detail-list"><div><dt>Email</dt><dd>{profile.email}</dd></div><div><dt>Course</dt><dd>{profile.course}</dd></div><div><dt>Year level</dt><dd>{profile.yearLevel}</dd></div></dl>}</section></div></div></>;
    }

    if (activeView === 'Settings') {
      return <><SectionHeading title="Settings" subtitle="Manage the details and updates you receive." /><div className="surface-panel settings-list"><div className="setting-row"><div><h2>Account details</h2><p>Review your name, course, and contact information.</p></div><button className="btn btn-outline-dark" type="button" onClick={() => { navigate('Profile'); setEditingProfile(true); }}>Manage</button></div><div className="setting-row"><div><h2>Order updates</h2><p>Receive updates about the status of your orders.</p></div><div className="form-check form-switch"><input className="form-check-input" type="checkbox" role="switch" id="notification-switch" checked={notificationsEnabled} onChange={(event) => setNotificationsEnabled(event.target.checked)} /><label className="form-check-label" htmlFor="notification-switch">{notificationsEnabled ? 'On' : 'Off'}</label></div></div><div className="setting-row"><div><h2>Privacy</h2><p>Your profile details are stored in this browser for this demo.</p></div><span className="privacy-note"><i className="bi bi-shield-check me-2" aria-hidden="true" />Browser storage</span></div></div></>;
    }

    return <section className="logout-panel"><span className="logout-icon"><i className="bi bi-door-open" aria-hidden="true" /></span><span className="eyebrow">See you soon</span><h2>Ready to leave the market?</h2><p>Your cart and saved products will stay available on this device when you return.</p><button className="btn btn-dark" type="button" onClick={() => navigate('Home')}>Back to home</button></section>;
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      {menuOpen && <button className="sidebar-backdrop" type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
      <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <a className="brand-lockup" href="#home" onClick={(event) => { event.preventDefault(); navigate('Home'); }}>
          <span className="brand-seal">TAU</span><span><strong>TAU Market</strong><small>Campus goods, grown together</small></span>
        </a>
        <div className="sidebar-rule" />
        <nav className="sidebar-nav">
          {navigation.map((group) => <div className="nav-group" key={group.section}><p className="nav-section-label">{group.section}</p>{group.items.map((item) => <button className={`nav-item ${activeView === item.label ? 'active' : ''}`} type="button" key={item.label} onClick={() => navigate(item.label)} aria-current={activeView === item.label ? 'page' : undefined}><i className={`bi ${item.icon}`} aria-hidden="true" /><span>{item.label}</span>{item.label === 'Cart' && cartCount > 0 && <span className="nav-count">{cartCount}</span>}</button>)}</div>)}
          <div className="nav-group"><p className="nav-section-label">Session</p><button className={`nav-item ${activeView === 'Logout' ? 'active' : ''}`} type="button" onClick={() => navigate('Logout')} aria-current={activeView === 'Logout' ? 'page' : undefined}><i className="bi bi-box-arrow-right" aria-hidden="true" /><span>Log out</span></button></div>
        </nav>
        <div className="sidebar-footer"><div className="footer-avatar">{profile.name.split(' ').map((word) => word[0]).slice(0, 2).join('').toUpperCase()}</div><div><strong>{profile.name}</strong><span>Student account</span></div><button type="button" onClick={() => navigate('Profile')} aria-label="Open profile"><i className="bi bi-three-dots" aria-hidden="true" /></button></div>
      </aside>

      <main className="main-area" id="main-content">
        <header className="topbar"><button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><i className="bi bi-list" aria-hidden="true" /></button><div className="breadcrumb-line"><span>TAU Market</span><i className="bi bi-chevron-right" aria-hidden="true" /><strong>{activeView}</strong></div><button className="cart-shortcut" type="button" onClick={() => navigate('Cart')} aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}><i className="bi bi-bag" aria-hidden="true" /><span>Bag</span><b>{cartCount}</b></button></header>
        <div className="page-container"><div className="page-heading"><div><span className="page-kicker">Tarlac Agricultural University</span><h1>{activeView === 'Home' ? 'A better kind of campus shop.' : activeView}</h1></div><span className="date-note"><i className="bi bi-geo-alt" aria-hidden="true" /> Camiling, Tarlac</span></div>
          {notice && <div className="alert market-alert alert-dismissible" role="status">{notice}<button type="button" className="btn-close" aria-label="Dismiss message" onClick={() => setNotice('')} /></div>}
          {renderContent()}
          <footer className="site-footer"><span>TAU Market</span><span>Republic of the Philippines · Tarlac Agricultural University</span><span>Camiling, Tarlac</span></footer>
        </div>
      </main>
    </div>
  );
}

function SectionHeading({ title, subtitle, action }) {
  return <div className="section-heading"><div><h2>{title}</h2><p>{subtitle}</p></div>{action}</div>;
}

function EmptyState({ title, action, onAction }) {
  return <section className="empty-state"><span className="empty-icon"><i className="bi bi-bag" aria-hidden="true" /></span><h2>{title}</h2><button className="btn btn-dark" type="button" onClick={onAction}>{action}</button></section>;
}

export default App;