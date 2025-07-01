import { useDocumentTitle } from "~/lib/title";
import { type AgoraTolgeeProps, useTolgeeNamespaces } from "~/lib/tolgee";

import { HeadContent } from "@tanstack/react-router";
import { useTolgee } from "@tolgee/react";

const mergeTitleString = (...title: (string | undefined)[]): string => title.filter(Boolean).join(" | ");

export interface HeadComponentProps {
  tolgee: AgoraTolgeeProps;
}

/**
 * Manages head component and SEO.
 */
export function HeadComponent(props: HeadComponentProps) {
  const tolgee = useTolgee();
  const { getLanguage, getPendingLanguage } = tolgee;
  useTolgeeNamespaces(props.tolgee.titleNS);

  const { title } = useDocumentTitle();

  return (
    <head lang={getLanguage() ?? getPendingLanguage()}>
      <HeadContent />
      <title>{mergeTitleString(title, tolgee.t("metadata.main.title", { ns: props.tolgee.titleNS }))}</title>
    </head>
  );
}
