"use client";

import { FormEvent } from "react";
import type { ContactLocale } from "@/lib/contact-copy";
import { contactCopy } from "@/lib/contact-copy";

export function ContactForm({ locale }: { locale: ContactLocale }) {
  const labels = contactCopy[locale];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = locale === "vi" ? `Yêu cầu từ ${name || "khách hàng"}` : `Enquiry from ${name || "customer"}`;
    const body = `${labels.name}: ${name}\n${labels.email}: ${email}\n\n${labels.message}:\n${message}`;
    window.location.href = `mailto:cohaivintage@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>{labels.name}<input name="name" autoComplete="name" required /></label>
      <label>{labels.email}<input name="email" type="email" autoComplete="email" required /></label>
      <label>{labels.message}<textarea name="message" rows={6} required /></label>
      <button className="button button-dark" type="submit">{labels.send}</button>
    </form>
  );
}
