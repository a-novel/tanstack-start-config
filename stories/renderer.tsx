import logoBanner from "~/assets/images/banner.png";

import { Layout } from "~/components";
import { BodyStyle } from "~/lib";

import type { ComponentProps, FC, ReactNode } from "react";

const connector: ComponentProps<typeof Layout>["authConnector"] = {
  user: { loading: false, error: false },
  context: { selectedForm: undefined, selectForm: () => {} },
  sessionContext: { setSession: () => {}, synced: true },
};

export const LayoutRenderer: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={BodyStyle}>
    <Layout
      authConnector={connector}
      banner={logoBanner}
      links={{
        account: { component: "div" },
      }}
    >
      {children}
    </Layout>
  </div>
);
