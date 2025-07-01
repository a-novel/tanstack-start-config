import { Error as ErrorComponent, NotFound as NotFoundComponent } from "~/components";
import {
  FallbackDocument,
  tolgee,
  TitleProvider,
  type RouteContext,
  DocumentProvider,
  type DocumentProps,
  useDocumentTitle,
} from "~/lib";

import { type ReactNode, useEffect } from "react";

import arimo from "@fontsource-variable/arimo?url";
import bungee from "@fontsource/bungee?url";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRouter as createTanStackRouter,
  type AnyRoute,
  type AnyRouter,
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { routerWithQueryClient, type ValidateRouter } from "@tanstack/react-router-with-query";
import { TolgeeProvider, useTranslate } from "@tolgee/react";

export interface AgoraRouterProps<TRouteTree extends AnyRoute> {
  routeTree: TRouteTree;
  queryClient: QueryClient;
}

export const createAgoraRouter = <TRouter extends AnyRouter, TRouteTree extends AnyRoute>(
  props: AgoraRouterProps<TRouteTree>
) =>
  routerWithQueryClient(
    createTanStackRouter({
      routeTree: props.routeTree,
      context: { queryClient: props.queryClient },
      scrollRestoration: true,
      defaultPreload: "intent",
      defaultErrorComponent: ErrorComponent,
      defaultNotFoundComponent: NotFoundComponent,
      InnerWrap: ({ children }: { children: ReactNode }) => (
        // Using the children as fallback is required, otherwise it blocks
        // tanstack router scripts from properly loading.
        <TolgeeProvider tolgee={tolgee} fallback={<FallbackDocument />}>
          <TitleProvider>{children}</TitleProvider>
        </TolgeeProvider>
      ),
    }) as ValidateRouter<TRouter>,
    props.queryClient
  );

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
export { BodyStyle, type RouteContext } from "~/lib";
