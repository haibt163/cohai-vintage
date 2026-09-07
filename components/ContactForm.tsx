"use client";

import { FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

export function ContactForm({ locale }: { locale: Locale }) {
  const labels = ui[locale];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = locale === "vi" ? `Yêu cầu từ ${name || "khách hàng"}` : `Enquiry from ${name || "customer"}`;
    const body = `${locale === "vi" ? "Tên" : "Name"}: ${name}\n${locale === "vi" ? "Email" : "Email"}: ${email}\n\n${locale === "vi" ? "Lời nhắn" : "Message"}:\n${message}`;
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
