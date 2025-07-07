import { Error as ErrorComponent, NotFound as NotFoundComponent } from "~/components";
import {
  tolgee,
  TitleProvider,
  type RouteContext,
  DocumentProvider,
  type DocumentProps,
  useDocumentTitle,
  type AgoraTolgeeProps,
} from "~/lib";

import { type FC, type ReactNode, useEffect } from "react";

import arimo from "@fontsource-variable/arimo?url";
import bungee from "@fontsource/bungee?url";
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
import { TolgeeProvider, useTranslate } from "@tolgee/react";

export interface DefaultWrapperProps {
  tolgee: AgoraTolgeeProps;
  children: ReactNode;
}

export const DefaultWrapper: FC<DefaultWrapperProps> = (params) => (
  <TolgeeProvider tolgee={tolgee}>
    <TitleProvider tolgee={params.tolgee}>{params.children}</TitleProvider>
  </TolgeeProvider>
);

export interface AgoraRouterProps<
  TRouteTree extends AnyRoute,
  TTrailingSlashOption extends TrailingSlashOption,
  TDefaultStructuralSharingOption extends boolean,
  TRouterHistory extends RouterHistory,
  TDehydrated extends Record<string, any>,
> {
  routeTree: TRouteTree;
  queryClient: QueryClient;
  tolgee: AgoraTolgeeProps;
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
        { href: bungee, rel: "stylesheet" },
      ],
    }),
    errorComponent: function ErrorComponentWrapped() {
      const { t } = useTranslate("generic");
      const { setTitle } = useDocumentTitle();

      useEffect(() => {
        setTitle(t("nav.error.metadata.title", { ns: "generic" }));
        return () => setTitle(undefined);
      }, [setTitle, t]);

      return (
        <Document>
          <ErrorComponent />
        </Document>
      );
    },
    notFoundComponent: function NotFoundComponentWrapped() {
      const { t } = useTranslate("generic");
      const { setTitle } = useDocumentTitle();

      useEffect(() => {
        setTitle(t("nav.notFound.metadata.title", { ns: "generic" }));
        return () => setTitle(undefined);
      }, [setTitle, t]);

      return (
        <Document>
          <NotFoundComponent />
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
export { BodyStyle, type RouteContext, useTolgeeNamespaces, LANGS, tolgee, TitleProvider } from "~/lib";
