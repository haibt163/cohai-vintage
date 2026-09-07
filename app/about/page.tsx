import Image from "next/image";

export default function About() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>The woman behind<br />Cô Hai Vintage.</h1>
      </section>
      <section className="about-grid section-narrow">
        <div className="portrait"><Image src="/assets/original/2025/03/CO-HAI-VINTAGE-1.jpg" alt="Cô Hai Vintage" fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
        <div className="prose">
          <p className="lead">Hello from Cô Hai Vintage — a story shaped between Vietnam, Europe and Australia, and a lifelong fascination with style.</p>
          <p>The original Cô Hai archive describes a journey that began in Vietnam and continued through study in Rotterdam, Holland, and later life in Tasmania and Sydney. A professional accounting career was followed by fashion-business study at Orana Fashion Business College.</p>
          <p>That combination of discipline and curiosity eventually returned to Saigon, where Cô Hai Vintage was founded as a more personal way to explore fashion, luxury and the stories attached to beautiful objects.</p>
          <p>The new site keeps that spirit while making the archive, collection and journal easier to discover.</p>
        </div>
      </section>
    </div>
  );
}
