import { Error } from "~/components";

import { LayoutRenderer } from "./renderer";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Error> = {
  component: Error,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    form: { control: { disable: true } },
  },
  tags: ["autodocs"],
  render: () => (
    <LayoutRenderer>
      <Error />
    </LayoutRenderer>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
