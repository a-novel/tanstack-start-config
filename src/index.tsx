import { Error as ErrorComponent, NotFound as NotFoundComponent } from "~/components";
import { type RouteContext, DocumentProvider, type DocumentProps, WithDocumentTitle } from "~/lib";

import arimo from "@fontsource-variable/arimo?url";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRouter as createTanStackRouter,
  type AnyRoute,
  type AnyRouter,
  createRootRouteWithContext,
  Outlet,
  type RouterConstructorOptions,
  type TrailingSlashOption,
  type RouterHistory,
} from "@tanstack/react-router";
import { routerWithQueryClient, type ValidateRouter } from "@tanstack/react-router-with-query";

export interface AgoraRouterProps<
  TRouteTree extends AnyRoute,
  TTrailingSlashOption extends TrailingSlashOption,
  TDefaultStructuralSharingOption extends boolean,
  TRouterHistory extends RouterHistory,
  TDehydrated extends Record<string, any>,
> {
  routeTree: TRouteTree;
  queryClient: QueryClient;
  router?: Partial<
    RouterConstructorOptions<
      TRouteTree,
      TTrailingSlashOption,
      TDefaultStructuralSharingOption,
      TRouterHistory,
      TDehydrated
    >
  >;
}

export const createAgoraRouter = <
  TRouter extends AnyRouter,
  TRouteTree extends AnyRoute,
  TTrailingSlashOption extends TrailingSlashOption,
  TDefaultStructuralSharingOption extends boolean,
  TRouterHistory extends RouterHistory,
  TDehydrated extends Record<string, any>,
>(
  params: AgoraRouterProps<
    TRouteTree,
    TTrailingSlashOption,
    TDefaultStructuralSharingOption,
    TRouterHistory,
    TDehydrated
  >
) => {
  const routerOptions: RouterConstructorOptions<
    TRouteTree,
    TTrailingSlashOption,
    TDefaultStructuralSharingOption,
    TRouterHistory,
    TDehydrated
  > = {
    routeTree: params.routeTree,
    context: { queryClient: params.queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFoundComponent,
    ...params.router,
  };

  return routerWithQueryClient(createTanStackRouter(routerOptions) as ValidateRouter<TRouter>, params.queryClient);
};

export const createAgoraRootRoute = <Context extends RouteContext = RouteContext>(props: DocumentProps) => {
  const Document = DocumentProvider(props);

  return createRootRouteWithContext<Context>()({
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      links: [
        { rel: "icon", href: "/icon.png" },
        {
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
          rel: "stylesheet",
        },
        { href: arimo, rel: "stylesheet" },
      ],
    }),
    errorComponent: function ErrorComponentWrapped() {
      return (
        <Document>
          <ErrorComponent />
          <WithDocumentTitle tKey="nav.error.metadata.title" ns="generic" />
        </Document>
      );
    },
    notFoundComponent: function NotFoundComponentWrapped() {
      return (
        <Document>
          <NotFoundComponent />
          <WithDocumentTitle tKey="nav.notFound.metadata.title" ns="generic" />
        </Document>
      );
    },
    component: function RootComponentWrapped() {
      return (
        <Document>
          <Outlet />
        </Document>
      );
    },
  });
};

export { Layout as AgoraDefaultLayout } from "~/components";
export { BodyStyle, type RouteContext, useTolgeeNamespaces, LANGS, tolgee } from "~/lib";
