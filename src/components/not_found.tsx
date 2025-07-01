import { useTolgeeNamespaces } from "~/lib";

import { MaterialSymbol, StatusPage } from "@a-novel/neon-ui/ui";

import { Typography } from "@mui/material";
import { T } from "@tolgee/react";

export function NotFound() {
  useTolgeeNamespaces("generic");

  return (
    <StatusPage color="warning" icon={<MaterialSymbol icon="broken_image" />}>
      <Typography variant="h4" component="h1" color="warning" textAlign="center">
        <T keyName="nav.notFound.title" ns="generic" />
      </Typography>
      <Typography textAlign="center">
        <T keyName="nav.notFound.content" ns="generic" />
      </Typography>
    </StatusPage>
  );
}
