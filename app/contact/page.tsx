export default function Contact() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Let’s talk<br />vintage.</h1>
      </section>
      <section className="contact-grid section-narrow">
        <div>
          <p className="lead">For product enquiries, sourcing questions, collaborations or general messages, please get in touch.</p>
          <p>Email: <a href="mailto:cohaivintage@gmail.com">cohaivintage@gmail.com</a></p>
          <p>Instagram: <span className="muted">@vintagebycohai</span></p>
        </div>
        <form className="contact-form">
          <label>Name<input name="name" autoComplete="name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" /></label>
          <label>Message<textarea name="message" rows={6} /></label>
          <button className="button button-dark" type="button">Send enquiry</button>
        </form>
      </section>
    </div>
  );
}
