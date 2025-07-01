import { useDocumentTitle } from "~/lib/title";

import { HeadContent } from "@tanstack/react-router";
import { useTolgee } from "@tolgee/react";

const mergeTitleString = (...title: (string | undefined)[]): string => title.filter(Boolean).join(" | ");

/**
 * Manages head component and SEO.
 */
export function HeadComponent() {
  const tolgee = useTolgee();
  const { getLanguage, getPendingLanguage } = tolgee;

  const { title } = useDocumentTitle();

  return (
    <head lang={getLanguage() ?? getPendingLanguage()}>
      <HeadContent />
      <title>{mergeTitleString(title, tolgee.t("metadata.main.title", { ns: "platform.authentication" }))}</title>
    </head>
  );
}
