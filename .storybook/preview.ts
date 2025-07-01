import { MuiDecorator, RouterDecorator, TolgeeDecorator } from "./decorators";

import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

themes.dark.appContentBg = "#000000";
themes.dark.appPreviewBg = "#000000";

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "ipad",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English" },
        { value: "fr", title: "Francais" },
      ],
      showName: true,
    },
  },
};

export const decorators = [RouterDecorator, MuiDecorator, TolgeeDecorator];

export default preview;
