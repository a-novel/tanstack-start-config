import { NotFound } from "~/components";

import { LayoutRenderer } from "./renderer";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof NotFound> = {
  component: NotFound,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    form: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: () => (
    <LayoutRenderer>
      <NotFound />
    </LayoutRenderer>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
