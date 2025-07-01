import { LANGS } from "~/lib";

import { AuthNav, useAuthNavConnector } from "@a-novel/package-authenticator";

import type { ElementType, ReactNode } from "react";

import type { ButtonProps, ButtonTypeMap } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useTolgee } from "@tolgee/react";

export interface LayoutProps<ManageAccountButtonProps extends ElementType = ButtonTypeMap["defaultComponent"]> {
  children: ReactNode;
  authConnector: ReturnType<typeof useAuthNavConnector>;
  banner: string;
  links: {
    account: Omit<ButtonProps<ManageAccountButtonProps>, "children" | "color" | "sx" | "variant">;
  };
}

export const Layout = <ManageAccountButtonProps extends ElementType = ButtonTypeMap["defaultComponent"]>({
  children,
  authConnector,
  banner,
  links,
}: LayoutProps<ManageAccountButtonProps>) => {
  const tolgee = useTolgee();
  return (
    <>
      <AuthNav<typeof LANGS, typeof Link, typeof Link, typeof Link, typeof Link, ManageAccountButtonProps>
        account={links.account}
        connector={authConnector}
        homeButton={{
          component: Link,
          to: "/",
          icon: banner,
        }}
        lang={{
          langs: LANGS,
          selectedLang: tolgee.getLanguage() ?? tolgee.getPendingLanguage(),
          onChange: tolgee.changeLanguage,
        }}
      />
      {children}
    </>
  );
};
