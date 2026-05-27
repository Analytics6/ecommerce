function CartDrawer({ open, onClose, items, total, onUpdateQuantity, onClear }) {
  return (
    <div className={`drawer-backdrop ${open ? 'open' : ''}`}>
      <div className="drawer-panel">
        <header className="drawer-header">
          <div>
            <h2>Shopping Cart</h2>
            <p>{items.length} item(s) in cart</p>
          </div>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </header>

        <section className="drawer-content">
          {items.length === 0 ? (
            <p className="empty-state">Your cart is empty. Add products to continue.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </section>

        <footer className="drawer-footer">
          <div>
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="drawer-actions">
            <button className="secondary" onClick={onClear} disabled={items.length === 0}>
              Clear cart
            </button>
            <button disabled={items.length === 0}>Checkout</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default CartDrawer;
