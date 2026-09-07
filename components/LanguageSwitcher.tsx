"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const preferenceCookie = "cohai-locale-preference";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  useEffect(() => {
    const hasPreference = document.cookie.split("; ").some((item) => item.startsWith(`${preferenceCookie}=`));
    if (!hasPreference) {
      document.cookie = "cohai-locale=vi;path=/;max-age=31536000;samesite=lax";
      document.cookie = `${preferenceCookie}=1;path=/;max-age=31536000;samesite=lax`;
      if (locale !== "vi") router.refresh();
    }
  }, [locale, router]);

  function setLocale(nextLocale: Locale) {
    document.cookie = `cohai-locale=${nextLocale};path=/;max-age=31536000;samesite=lax`;
    document.cookie = `${preferenceCookie}=1;path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <div className="language-switcher" aria-label="Language selector">
      <button type="button" className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")} aria-pressed={locale === "en"}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={locale === "vi" ? "active" : ""} onClick={() => setLocale("vi")} aria-pressed={locale === "vi"}>VI</button>
    </div>
  );
}
