export const STATUS_OPTIONS = [
  {
    id: "PENDING",
    title: "Pending",
  },
  {
    id: "PROCESSING",
    title: "Processing",
  },
  {
    id: "SHIPPED",
    title: "Shipped",
  },
  {
    id: "DELIVERED",
    title: "Delivered",
  },
  {
    id: "CANCELLED",
    title: "Cancelled",
  },
];

// Optional: Type helper if you're using TypeScript
export type OrderStatus = (typeof STATUS_OPTIONS)[number]["id"];
