import type { RouteContext } from "~/lib/router";
import { type AgoraTolgeeProps, type tolgee, useTolgeeNamespaces } from "~/lib/tolgee";

import { createContext, useEffect, type FC, type ReactNode, useMemo, useState, useContext } from "react";

import { type RouteMatch, useMatches } from "@tanstack/react-router";
import { useTolgee } from "@tolgee/react";

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

export interface TitleContext {
  title?: string;
  setTitle: (title?: string) => void;
}

export const TitleContext = createContext<TitleContext>({
  setTitle: () => {},
  title: undefined,
});

export interface TitleProviderProps {
  children: ReactNode;
  tolgee: AgoraTolgeeProps;
}

export const TitleProvider: FC<TitleProviderProps> = ({ children, tolgee: tolgeeProps }) => {
  const tolgee = useTolgee();
  const { getLanguage, getPendingLanguage } = tolgee;
  useTolgeeNamespaces(tolgeeProps.titleNS);

  const matches = useMatches();
  // Put a little less strain on the React engine, by caching the reverse operation.
  const orderedMatches = useMemo(() => matches.reverse(), [matches]);
  const language = getLanguage() ?? getPendingLanguage();

  const [title, setTitle] = useState<string>();
  const [overrideTitle, setOverrideTitle] = useState<string>();

  useEffect(() => {
    processMatch(orderedMatches, tolgee).then(setTitle);
  }, [language, orderedMatches, tolgee]);

  return (
    <TitleContext.Provider value={{ title: overrideTitle ?? title, setTitle: setOverrideTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useDocumentTitle = () => useContext(TitleContext);
