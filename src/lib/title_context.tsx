import { useTolgeeNamespaces } from "~/lib/tolgee";

import { createContext, useContext, useEffect } from "react";

import { useTolgee } from "@tolgee/react";

export interface TitleContextType {
  title: string | undefined;
  setTitle: (title: string | undefined) => void;
}

export const TitleContext = createContext<TitleContextType>({
  title: undefined,
  setTitle: () => {},
});

export const useTitleContext = () => useContext(TitleContext);

export const DocumentTitle = () => {
  const { title } = useTitleContext();
  return <title>{title}</title>;
};

export interface WithDocumentTitleProps {
  ns?: string | undefined;
  tKey: string;
}

export const WithDocumentTitle = ({ ns, tKey }: WithDocumentTitleProps) => {
  const { setTitle } = useTitleContext();
  const { t } = useTolgee();
  useTolgeeNamespaces(ns);

  useEffect(() => {
    setTitle(t(tKey, { ns }));
    return () => {
      // Reset the title when the component unmounts
      setTitle(undefined);
    };
  }, [ns, setTitle, t, tKey]);

  return null;
};
