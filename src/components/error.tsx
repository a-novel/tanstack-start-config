import { useTolgeeNamespaces } from "~/lib";

import { MaterialSymbol, StatusPage } from "@a-novel/neon-ui/ui";

import { Typography } from "@mui/material";
import { T } from "@tolgee/react";

export function Error() {
  useTolgeeNamespaces("generic");

  return (
    <StatusPage color="error" icon={<MaterialSymbol icon="dns" />}>
      <Typography variant="h4" component="h1" color="error" textAlign="center">
        <T keyName="nav.error.title" ns="generic" />
      </Typography>
      <Typography textAlign="center">
        <T keyName="nav.error.content" ns="generic" />
      </Typography>
    </StatusPage>
  );
}
