import { products } from "@/lib/content";

export default function Shop() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Shop</p>
        <h1>Selected pieces<br />with a past life.</h1>
      </section>
      <section className="section-narrow product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <div className="product-placeholder">IMAGE<br />COMING IN PHASE 3</div>
            <p className="card-category">{product.category}</p>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
