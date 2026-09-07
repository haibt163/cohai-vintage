import Image from "next/image";

export default function About() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>The woman behind<br />Cô Hai Vintage.</h1>
      </section>
      <section className="about-grid section-narrow">
        <div className="portrait">
          <Image src="/assets/original/photo-about-me.jpg" alt="Portrait placeholder from the original site archive" fill sizes="(max-width: 800px) 100vw, 45vw" />
        </div>
        <div className="prose">
          <p className="lead">Hello from Cô Hai Vintage — a story shaped between Vietnam, Europe and Australia, and a lifelong fascination with style.</p>
          <p>Cô Hai Vintage was founded from a desire to bring a more personal, thoughtful approach to vintage fashion and luxury. The original archive describes a journey through study and work overseas before returning to Saigon and turning that experience into a fashion-focused venture.</p>
          <p>The new site will preserve the spirit of that story while making the collection, editorial and shopping experience much easier to explore.</p>
        </div>
      </section>
    </div>
  );
}
