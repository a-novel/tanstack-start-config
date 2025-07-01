import { useDocumentTitle } from "~/lib/title";

import { HeadContent } from "@tanstack/react-router";
import { useTolgee } from "@tolgee/react";

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
      <title>{title}</title>
    </head>
  );
}
