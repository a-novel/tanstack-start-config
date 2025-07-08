import { DocumentTitle, TitleContext } from "~/lib/title_context";
import { TitleManager } from "~/lib/title_manager";
import { type AgoraTolgeeProps, tolgee } from "~/lib/tolgee";

import { theme } from "@a-novel/neon-ui";
import { WithSession } from "@a-novel/package-authenticator";

import { type ComponentType, type CSSProperties, type ReactNode, useState } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { HeadContent, Scripts } from "@tanstack/react-router";
import { TolgeeProvider } from "@tolgee/react";

export const BodyStyle: CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  backgroundColor: theme.palette.background.default,
};

export interface DocumentProps {
  tolgee: AgoraTolgeeProps;
  layout: ComponentType<{ children: ReactNode }>;
}

export function DocumentProvider(props: DocumentProps) {
  return function Document({ children }: Readonly<{ children: ReactNode }>) {
    const [title, setTitle] = useState<string>();

    return (
      <html lang={tolgee.getLanguage() ?? tolgee.getPendingLanguage()}>
        <TitleContext.Provider value={{ title, setTitle }}>
          <head>
            <HeadContent />
            <DocumentTitle />
          </head>
          <body style={BodyStyle}>
            <TolgeeProvider tolgee={tolgee} options={{ useSuspense: true }}>
              <TitleManager tolgee={props.tolgee}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <TitleContext.Consumer>
                    {({ setTitle }) => (
                      <WithSession layout={props.layout} setTitle={setTitle}>
                        {children}
                      </WithSession>
                    )}
                  </TitleContext.Consumer>
                </ThemeProvider>
              </TitleManager>
            </TolgeeProvider>
            <Scripts />
          </body>
        </TitleContext.Provider>
      </html>
    );
  };
}
