export const statVariants = {
  primary: "bg-primary/10 text-primary ring-1 ring-primary/20",
  accent: "bg-accent/10 text-accent ring-1 ring-accent/20",
  secondary: "bg-secondary text-secondary-foreground ring-1 ring-border",
  muted: "bg-muted text-muted-foreground ring-1 ring-border",
} as const;

export type StatVariant = keyof typeof statVariants;
