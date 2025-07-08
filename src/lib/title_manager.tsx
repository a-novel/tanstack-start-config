import type { RouteContext } from "~/lib/router";
import { TitleContext, useTitleContext } from "~/lib/title_context";
import { type AgoraTolgeeProps, type tolgee, useTolgeeNamespaces } from "~/lib/tolgee";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { type RouteMatch, useMatches } from "@tanstack/react-router";
import { useTolgee } from "@tolgee/react";

const mergeTitleString = (...title: (string | undefined)[]): string => title.filter(Boolean).join(" | ");

const processMatch = async (
  matches: RouteMatch<any, any, any, any, any, any, any>[],
  t: typeof tolgee
): Promise<string> => {
  let newTitle = "";

  for (const match of matches) {
    const context = match.context as RouteContext;
    if (!context.getTitle) continue;
    newTitle = await context.getTitle(t, newTitle);
  }

  return newTitle;
};

export interface TitleManagerProps {
  tolgee: AgoraTolgeeProps;
  children: ReactNode;
}

export const TitleManager = ({ tolgee: tolgeeProps, children }: TitleManagerProps) => {
  const { title, setTitle } = useTitleContext();
  const [overrideTitle, setOverrideTitle] = useState<string>();
  const [localTitle, setLocalTitle] = useState<string>();

  const tolgee = useTolgee();
  const { getLanguage, getPendingLanguage, t } = tolgee;
  useTolgeeNamespaces(tolgeeProps.titleNS);

  const mainTitle = useMemo(() => t("metadata.main.title", { ns: tolgeeProps.titleNS }), [tolgeeProps.titleNS, t]);

  const matches = useMatches();
  // Put a little less strain on the React engine, by caching the reverse operation.
  const orderedMatches = useMemo(() => [...matches].reverse(), [matches]);
  const language = getLanguage() ?? getPendingLanguage();

  const localTitlePromise = useRef<Promise<string>>(Promise.resolve(""));

  // Update local title when matches change.
  useEffect(() => {
    const promised = processMatch(orderedMatches, tolgee);

    localTitlePromise.current = promised;
    promised.then((newTitle) => {
      // If the title has been updated again while the promise was pending, then
      // the local reference should have changed. In that case, we should not update the state.
      if (localTitlePromise.current !== promised) return;

      setLocalTitle(newTitle);
    });
  }, [language, orderedMatches, tolgee]);

  // Update the title when localTitle or overrideTitle changes.
  useEffect(() => {
    setTitle(mergeTitleString(overrideTitle ?? localTitle, mainTitle));
  }, [localTitle, mainTitle, overrideTitle, setTitle]);

  return <TitleContext.Provider value={{ title, setTitle: setOverrideTitle }}>{children}</TitleContext.Provider>;
};
