const products = Array.from({ length: 100 }, (_, index) => {
  const categories = ['Electronics', 'Home', 'Fashion', 'Sports', 'Toys', 'Beauty'];
  const category = categories[index % categories.length];
  return {
    id: index + 1,
    name: `${category} Product ${index + 1}`,
    category,
    price: Number((Math.random() * 120 + 10).toFixed(2)),
    description: `A premium ${category.toLowerCase()} item for everyday use.`,
    image: `https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80&sat=-100&blend=111827&exp=15&blend-mode=multiply&h=400`,
  };
});

export default products;
