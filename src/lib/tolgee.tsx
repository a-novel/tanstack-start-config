import type { CountryType } from "@a-novel/neon-ui/ui";

import { useEffect } from "react";

import { FormatIcu } from "@tolgee/format-icu";
import { BackendFetch, LanguageDetector, LanguageStorage, type NsFallback, Tolgee, useTolgee } from "@tolgee/react";

const cdn = "https://cdn.tolg.ee/74c1bb8828074430ae95b462ab95374b";

export const tolgee = Tolgee()
  .use(BackendFetch({ prefix: cdn }))
  .use(FormatIcu())
  .use(LanguageDetector())
  .use(LanguageStorage())
  .init({
    defaultLanguage: "en",
    fallbackLanguage: "en",
    availableLanguages: ["en", "fr"],
    defaultNs: "generic",
  });

export const LANGS: Record<string, CountryType> = {
  en: {
    displayCode: "ENG",
    flag: "us",
    label: "English",
  },
  fr: {
    displayCode: "FRA",
    flag: "fr",
    label: "Français",
  },
};

export const useTolgeeNamespaces = (ns: NsFallback) => {
  const { addActiveNs, removeActiveNs } = useTolgee();

  // Load / unload translations.
  useEffect(() => {
    addActiveNs(ns).then();
    return () => removeActiveNs(ns);
  }, [addActiveNs, removeActiveNs, ns]);
};
