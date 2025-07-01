import { tolgee } from "./tolgee";

import { QueryClient } from "@tanstack/react-query";

export interface RouteContext {
  queryClient: QueryClient;
  getTitle?: (t: typeof tolgee, title?: string) => string | Promise<string>;
}
