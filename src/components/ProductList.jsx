function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
          <div className="product-details">
            <div className="product-tag">{product.category}</div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
          <div className="product-footer">
            <span className="price">${product.price.toFixed(2)}</span>
            <button onClick={() => onAddToCart(product)}>Add to cart</button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProductList;
