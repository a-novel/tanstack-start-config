import { BodyComponent, type BodyComponentProps, BodyStyle } from "~/lib/document.body";
import { HeadComponent } from "~/lib/document.head";

import { HeadContent, Scripts } from "@tanstack/react-router";
import { useTolgee } from "@tolgee/react";

export interface DocumentProps {
  body: Omit<BodyComponentProps, "children">;
}

export function DocumentProvider(props: DocumentProps) {
  return function Document({ children }: Readonly<{ children: React.ReactNode }>) {
    const tolgee = useTolgee();
    const { body } = props;
    const { getLanguage, getPendingLanguage } = tolgee;

    return (
      <html lang={getLanguage() ?? getPendingLanguage()}>
        <HeadComponent />
        <BodyComponent {...body}>{children}</BodyComponent>
      </html>
    );
  };
}

export function FallbackDocument() {
  return (
    <html>
      <head>
        <title>... | Agora Social</title>
        <HeadContent />
      </head>
      <body style={BodyStyle}>
        <div>...</div>
        <Scripts />
      </body>
    </html>
  );
}
