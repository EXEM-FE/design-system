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
        "contained",
        "outlined",
        "text",
        "primary",
        "accent",
        "critical",
      ],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "accent", "critical"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "xlarge"],
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    size: "medium",
  },
}

export const PrimaryOutlined: Story = {
  args: {
    children: "Button",
    variant: "outlined",
    color: "primary",
    size: "medium",
  },
}

export const Accent: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "accent",
    size: "medium",
  },
}

export const AccentOutlined: Story = {
  args: {
    children: "Button",
    variant: "outlined",
    color: "accent",
    size: "medium",
  },
}

export const Critical: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "critical",
    size: "medium",
  },
}

export const CriticalOutlined: Story = {
  args: {
    children: "Button",
    variant: "outlined",
    color: "critical",
    size: "medium",
  },
}

export const Disabled: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary",
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">Extra Large</Button>
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
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="primary">
        Primary Outlined
      </Button>
      <Button variant="text" color="primary">
        Primary Text
      </Button>
      <Button variant="contained" color="accent">
        Accent
      </Button>
      <Button variant="outlined" color="accent">
        Accent Outlined
      </Button>
      <Button variant="contained" color="critical">
        Critical
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button variant="contained" color="primary">
        <span style={{ marginRight: "0.5rem" }}>📄</span>
        문서
      </Button>
      <Button variant="contained" color="accent">
        <span style={{ marginRight: "0.5rem" }}>✓</span>
        확인
      </Button>
      <Button variant="contained" color="critical">
        <span style={{ marginRight: "0.5rem" }}>✕</span>
        삭제
      </Button>
    </div>
  ),
}
