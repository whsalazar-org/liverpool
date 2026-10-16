import React, { useEffect, useRef, useState } from 'react';
import Illustration from './Illustration.jsx';
import Icon from './Icon.jsx';
import { categories, products, money } from './products.js';

function ProductCard({ product, saved, onSave, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image" style={{ background: product.color }}>
        <span className="sample-tag">DEMO PRODUCT</span>
        <button className={`icon-button save-button ${saved ? 'saved' : ''}`} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name}${saved ? ' from' : ' to'} wishlist`} aria-pressed={saved} onClick={() => onSave(product.id)}>
          <Icon name="heart" />
        </button>
        <Illustration type={product.art} />
      </div>
      <div className="product-info">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-detail">{product.label}</p>
        <div className="product-bottom">
          <strong>{money(product.price)}</strong>
          <button className="add-button" onClick={() => onAdd(product.id)} aria-label={`Add ${product.name} to bag`}>Add to bag <span aria-hidden="true">+</span></button>
        </div>
      </div>
    </article>
  );
}

function ShopDialog({ panel, onClose, cart, wishlist, onQuantity, onSave, onAdd }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (panel) dialog.current.showModal();
    else dialog.current.close();
  }, [panel]);

  const items = panel === 'cart' ? products.filter((product) => cart[product.id]) : products.filter((product) => wishlist.includes(product.id));
  const total = products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0);
  return (
    <dialog ref={dialog} className="shop-dialog" aria-labelledby="panel-title" onCancel={onClose} onClick={(event) => { if (event.target === dialog.current) onClose(); }}>
      <div className="dialog-content">
        <div className="dialog-heading">
          <h2 id="panel-title">{panel === 'cart' ? 'Your shopping bag' : panel === 'wishlist' ? 'Your wishlist' : 'Welcome to the demo'}</h2>
          <button className="icon-button" aria-label="Close panel" onClick={onClose} autoFocus><Icon name="close" /></button>
        </div>
        <p className="demo-note">Fictional products. No purchases, payments, or personal data.</p>
        {panel === 'signin' ? <div className="signin-message"><Icon name="user" /><h3>Just browsing? You're in the right place.</h3><p>This is a shopping prototype, so there are no accounts or passwords. Your bag and wishlist work without signing in and reset when you reload.</p><button className="primary-button" onClick={onClose}>Explore the demo <Icon name="arrow" /></button></div> : <>
          {items.length === 0 && <div className="empty-state"><Icon name={panel === 'cart' ? 'bag' : 'heart'} /><h3>A little room for inspiration.</h3><p>{panel === 'cart' ? 'Add a fictional favorite to start your demo bag.' : 'Tap a heart on any product to save it here.'}</p><button className="primary-button" onClick={onClose}>Keep exploring <Icon name="arrow" /></button></div>}
          <ul className="panel-items">
            {items.map((product) => <li key={product.id} className="panel-item">
              <div className="mini-art" style={{ background: product.color }}><Illustration type={product.art} /></div>
              <div className="panel-item-info"><h3>{product.name}</h3><p>{money(product.price)}</p>
                {panel === 'cart' ? <div className="quantity-controls"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => onQuantity(product.id, -1)}>-</button><span aria-label={`${product.name} quantity`}>{cart[product.id]}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => onQuantity(product.id, 1)}>+</button><button className="text-button" onClick={() => onQuantity(product.id, -cart[product.id])}>Remove</button></div> : <div className="wishlist-actions"><button className="add-button" onClick={() => onAdd(product.id)}>Add to bag +</button><button className="text-button" onClick={() => onSave(product.id)}>Remove</button></div>}
              </div>
            </li>)}
          </ul>
          {panel === 'cart' && items.length > 0 && <div className="cart-total"><div><span>Demo subtotal</span><strong>{money(total)}</strong></div><p>Sample prices in USD. No checkout is available.</p><button className="primary-button" onClick={onClose}>Continue exploring <Icon name="arrow" /></button></div>}
        </>}
      </div>
    </dialog>
  );
}

export default function App() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [panel, setPanel] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const resultsHeading = useRef(null);
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const visibleProducts = products.filter((product) => (category === 'All' || product.category === category) && `${product.name} ${product.category} ${product.label}`.toLowerCase().includes(query.trim().toLowerCase()));

  function addToCart(id) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setAnnouncement(`${products.find((product) => product.id === id).name} added to your demo bag.`);
  }

  function toggleSaved(id) {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function changeQuantity(id, change) {
    setCart((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + change) };
      if (!next[id]) delete next[id];
      return next;
    });
  }

  function browseCategory(name) {
    setCategory(name);
    setQuery('');
    resultsHeading.current.focus();
    resultsHeading.current.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="announcement-bar">A little inspiration for your everyday <span>FICTIONAL SHOPPING DEMO</span></div>
      <header className="site-header">
        <div className="header-main page-width">
          <a href="#main" className="brand" aria-label="Liverpool demo home">liverpool<span className="brand-dot">.</span><small>THE EVERYDAY, REIMAGINED</small></a>
          <form className="search" role="search" onSubmit={(event) => { event.preventDefault(); resultsHeading.current.focus(); resultsHeading.current.scrollIntoView({ block: 'start' }); }}>
            <Icon name="search" /><input aria-label="Search demo products" type="search" placeholder="Find something you'll love" value={query} onChange={(event) => setQuery(event.target.value)} />
          </form>
          <div className="header-actions">
            <button className="icon-button counter-button" aria-label={`Open wishlist, ${wishlist.length} items`} onClick={() => setPanel('wishlist')}><Icon name="heart" />{wishlist.length > 0 && <span className="counter">{wishlist.length}</span>}</button>
            <button className="icon-button counter-button" aria-label={`Open shopping bag, ${cartCount} items`} onClick={() => setPanel('cart')}><Icon name="bag" /><span className="counter">{cartCount}</span></button>
            <button className="signin-button" onClick={() => setPanel('signin')}><Icon name="user" /><span>Sign in</span></button>
          </div>
        </div>
        <nav className="category-nav page-width" aria-label="Shop departments">
          <a href="#categories">Shop all departments</a>
          {categories.map((item) => <button key={item.name} onClick={() => browseCategory(item.name)}>{item.name}</button>)}
          <a className="nav-edit" href="#collection">The everyday edit</a>
        </nav>
      </header>
      <main id="main">
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy"><p className="eyebrow"><span className="short-line" /> THE NEW EVERYDAY COLLECTION</p><h1 id="hero-title">A little everyday<br /><em>extraordinary.</em></h1><p>For the way you dress. The spaces you love.<br className="desktop-break" /> And all the little moments in between.</p><a className="primary-button" href="#collection">Discover your next favorite <Icon name="arrow" /></a><div className="hero-footnote"><span className="tiny-star" aria-hidden="true">*</span> Thoughtfully picked. Ready to inspire.</div></div>
          <div className="hero-scene" aria-hidden="true"><div className="scene-arch" /><div className="scene-window" /><div className="scene-floor" /><div className="scene-circle" /><Illustration className="scene-chair" type="chair" /><div className="scene-table" /><Illustration className="scene-vase" type="vase" /><span className="scene-caption">SLOW DOWN. SETTLE IN.</span><span className="scene-sticker">Room for<br /><em>something lovely.</em></span><span className="scene-product">THE SOLSTICE CHAIR <span>Explore the demo collection</span></span></div>
        </section>
        <div className="benefits page-width"><span><b aria-hidden="true">+</b> A fresh take on everyday favorites</span><span><b aria-hidden="true">+</b> Something for every corner of your life</span><span><b aria-hidden="true">+</b> All inspiration. No real transactions.</span></div>
        <section id="categories" className="categories-section page-width" aria-labelledby="categories-title">
          <div className="section-heading"><div><p className="eyebrow">A WORLD OF POSSIBILITIES</p><h2 id="categories-title">What speaks to you?</h2></div><p>Find your kind of extraordinary.</p></div>
          <div className="category-grid">{categories.map((item) => <button key={item.name} className="category-card" onClick={() => browseCategory(item.name)}><div className="category-art" style={{ background: item.color }}><Illustration type={item.art} /><span className="category-arrow"><Icon name="arrow" /></span></div><h3>{item.name}</h3><p>{item.detail}</p></button>)}</div>
        </section>
        <section id="collection" className="collection-section page-width" aria-labelledby="collection-title">
          <div className="section-heading"><div><p className="eyebrow">THE EVERYDAY EDIT</p><h2 id="collection-title" ref={resultsHeading} tabIndex="-1">Small discoveries. Big delight.</h2></div><span className="collection-note">Imagined products, real inspiration.</span></div>
          <div className="filter-bar" role="group" aria-label="Filter products by category">{['All', ...categories.map((item) => item.name)].map((name) => <button key={name} aria-pressed={category === name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>{name === 'All' ? 'All favorites' : name}</button>)}</div>
          <p className="results-count" role="status">{visibleProducts.length} demo {visibleProducts.length === 1 ? 'product' : 'products'}{query.trim() && ` matching "${query.trim()}"`}</p>
          <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} saved={wishlist.includes(product.id)} onSave={toggleSaved} onAdd={addToCart} />)}</div>
          {visibleProducts.length === 0 && <div className="empty-state"><h3>No favorites found just yet.</h3><p>Try another search or explore all six departments.</p><button className="primary-button" onClick={() => { setQuery(''); setCategory('All'); }}>Show all demo products <Icon name="arrow" /></button></div>}
        </section>
        <section className="closing-banner page-width"><span className="closing-mark" aria-hidden="true">*</span><div><p className="eyebrow">A LITTLE MORE YOU</p><h2>Good things belong in your everyday.</h2><p>A new favorite. A cozy corner. A fresh perspective. Start here.</p></div><a href="#categories" className="outline-button">Explore departments <Icon name="arrow" /></a></section>
      </main>
      <footer className="page-width"><a className="brand" href="#main">liverpool<span className="brand-dot">.</span></a><p>Fictional retail demo. Not an official Liverpool store.<br />Mock products and USD prices. No accounts, payments, or orders.</p><span>Made for a little inspiration.</span></footer>
      <div className="toast" role="status" aria-live="polite" aria-atomic="true">{announcement && <><Icon name="bag" /><span>{announcement}</span><button className="icon-button" aria-label="Dismiss notification" onClick={() => setAnnouncement('')}><Icon name="close" /></button></>}</div>
      <ShopDialog panel={panel} onClose={() => setPanel(null)} cart={cart} wishlist={wishlist} onQuantity={changeQuantity} onSave={toggleSaved} onAdd={addToCart} />
    </>
  );
}
