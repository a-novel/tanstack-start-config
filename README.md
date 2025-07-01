# Tanstack Start Config

Shared client configuration for Agora clients using Tanstack Start.

[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/agorastoryverse)](https://twitter.com/agorastoryverse)
[![Discord](https://img.shields.io/discord/1315240114691248138?logo=discord)](https://discord.gg/rp4Qr8cA)

<hr />

![GitHub repo file or directory count](https://img.shields.io/github/directory-file-count/a-novel/tanstack-start-config)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/a-novel/tanstack-start-config)

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/a-novel/tanstack-start-config/main.yaml)

## Installation

> ⚠️ **Warning**: Even though the package is public, GitHub registry requires you to have a Personal Access Token
> with `repo` and `read:packages` scopes to pull it in your project. See
> [this issue](https://github.com/orgs/community/discussions/23386#discussioncomment-3240193) for more information.

Make sure you have a `.npmrc` with the following content (in your project or in your home directory):

```ini
@a-novel:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${YOUR_PERSONAL_ACCESS_TOKEN}
```

Then, install the package using pnpm:

```bash
pnpm add @a-novel/tanstack-start-config
```

## Usage

This package contains initializer to set up an Agora client using
[Tanstack Start](https://tanstack.com/start/latest/docs/framework/react/overview).

```tsx
// router.tsx
import { routeTree } from "./routeTree.gen";

import { createAgoraRouter } from "@a-novel/tanstack-start-config";

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function createRouter() {
  return createAgoraRouter({
    routeTree,
    queryClient,
    tolgee: {
      titleNS: "platform.authentication",
    },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
```

```tsx
// routes/__root.tsx
import { useAuthNavConnector } from "@a-novel/tanstack-start-config";
import { createAgoraRootRoute, AgoraDefaultLayout } from "@a-novel/tanstack-start-config";

import { FC, ReactNode } from "react";

import { Link } from "@tanstack/react-router";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const connector = useAuthNavConnector();
  return (
    <AgoraDefaultLayout
      authConnector={connector}
      banner="/path/to/banner.png"
      links={{
        account: {
          component: Link,
          to: "/account",
        },
      }}
    >
      {children}
    </AgoraDefaultLayout>
  );
};

export const Route = createAgoraRootRoute({
  body: { layout: Layout },
  head: {
    tolgee: {
      titleNS: "platform.authentication",
    },
  },
});
```
