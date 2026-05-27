import { useMemo, useState } from 'react';
import products from './data/products.js';
import ProductList from './components/ProductList.jsx';
import CartDrawer from './components/CartDrawer.jsx';

const categories = ['All', 'Electronics', 'Home', 'Fashion', 'Sports', 'Toys', 'Beauty'];

function App() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === 'low') return a.price - b.price;
        if (sortOrder === 'high') return b.price - a.price;
        return a.id - b.id;
      });
  }, [search, selectedCategory, sortOrder]);

  const cartItems = useMemo(() => Object.values(cart), [cart]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current[product.id];
      return {
        ...current,
        [product.id]: {
          ...product,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      };
    });
    setDrawerOpen(true);
  };

  const updateQuantity = (productId, quantity) => {
    setCart((current) => {
      if (quantity <= 0) {
        const next = { ...current };
        delete next[productId];
        return next;
      }
      return {
        ...current,
        [productId]: {
          ...current[productId],
          quantity,
        },
      };
    });
  };

  const clearCart = () => setCart({});

  return (
    <div className="app-shell">
      <header className="hero-bar">
        <div>
          <h1>React Ecommerce Store</h1>
          <p>Browse 100 curated products, add favorites, and manage your cart.</p>
        </div>
        <button className="cart-button" onClick={() => setDrawerOpen(true)}>
          Cart ({cartItems.length})
        </button>
      </header>

      <section className="toolbar">
        <div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
        </div>
        <div className="filters">
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="default">Sort by default</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </section>

      <main>
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      </main>

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cartItems}
        total={cartTotal}
        onUpdateQuantity={updateQuantity}
        onClear={clearCart}
      />
    </div>
  );
}

export default App;
