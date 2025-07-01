import { useDocumentTitle } from "~/lib/title";

import { theme } from "@a-novel/neon-ui";
import { WithSession } from "@a-novel/package-authenticator";

import type { ComponentType, CSSProperties, ReactNode } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { Scripts } from "@tanstack/react-router";

export interface BodyComponentProps {
  children: ReactNode;
  layout: ComponentType<{ children: ReactNode }>;
}

export const BodyStyle: CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  backgroundColor: theme.palette.background.default,
};

/**
 * Wraps the application body with the document contexts providers.
 */
export function BodyComponent({ children, layout }: Readonly<BodyComponentProps>) {
  const { setTitle } = useDocumentTitle();

  return (
    <body style={BodyStyle}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WithSession layout={layout} setTitle={setTitle}>
          {children}
        </WithSession>
      </ThemeProvider>
      <Scripts />
    </body>
  );
}
