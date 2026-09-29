"use client";

import { useState, type FormEvent } from "react";
import type { ContactLocale } from "@/lib/contact-copy";
import { contactCopy } from "@/lib/contact-copy";

type ContactFormProps = {
  locale: ContactLocale;
  email: string;
  /** Optional prefilled message, e.g. when arriving from a product page. */
  defaultMessage?: string;
};

export function ContactForm({ locale, email, defaultMessage = "" }: ContactFormProps) {
  const labels = contactCopy[locale];
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const from = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = `${labels.subject} ${name || labels.subjectFallback}`;
    const body = `${labels.name}: ${name}\n${labels.email}: ${from}\n\n${labels.message}:\n${message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // mailto: gives no delivery signal, so always show the fallback address.
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>{labels.name}<input name="name" autoComplete="name" required /></label>
      <label>{labels.email}<input name="email" type="email" autoComplete="email" required /></label>
      <label>{labels.message}<textarea name="message" rows={6} defaultValue={defaultMessage} required /></label>
      <button className="button button-dark" type="submit">{labels.send}</button>
      {sent && (
        <p className="contact-status" role="status">
          {labels.sentTitle} {labels.sentFallback} <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
    </form>
  );
}
