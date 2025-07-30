import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "primary-subtle",
        "accent",
        "accent-subtle",
        "critical",
        "critical-subtle",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
}

export const PrimarySubtle: Story = {
  args: {
    children: "Button",
    variant: "primary-subtle",
    size: "md",
  },
}

export const Accent: Story = {
  args: {
    children: "Button",
    variant: "accent",
    size: "md",
  },
}

export const AccentSubtle: Story = {
  args: {
    children: "Button",
    variant: "accent-subtle",
    size: "md",
  },
}

export const Critical: Story = {
  args: {
    children: "Button",
    variant: "critical",
    size: "md",
  },
}

export const CriticalSubtle: Story = {
  args: {
    children: "Button",
    variant: "critical-subtle",
    size: "md",
  },
}

export const Disabled: Story = {
  args: {
    children: "Button",
    variant: "primary",
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="primary-subtle">Primary Subtle</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="accent-subtle">Accent Subtle</Button>
      <Button variant="critical">Critical</Button>
      <Button variant="critical-subtle">Critical Subtle</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button>
        <span style={{ marginRight: "0.5rem" }}>📄</span>
        문서
      </Button>
      <Button variant="accent">
        <span style={{ marginRight: "0.5rem" }}>✓</span>
        확인
      </Button>
      <Button variant="critical">
        <span style={{ marginRight: "0.5rem" }}>✕</span>
        삭제
      </Button>
    </div>
  ),
}
