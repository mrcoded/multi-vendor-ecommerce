import {
  Boxes,
  Building2,
  DollarSign,
  ExternalLink,
  LayoutGrid,
  LayoutList,
  MonitorPlay,
  ScanSearch,
  Truck,
  User,
  Users2,
  UserSquare2,
  Warehouse,
  Slack,
} from "lucide-react";

export const SHARED_LINKS = {
  dashboard: { title: "Dashboard", href: "/dashboard", icon: LayoutGrid },
};

export const ROLE_LINKS = {
  ADMIN: {
    catalogue: [
      { title: "Products", href: "/dashboard/products", icon: Boxes },
      { title: "Categories", href: "/dashboard/categories", icon: LayoutList },
      { title: "Coupons", href: "/dashboard/coupons", icon: ScanSearch },
      { title: "Banners", href: "/dashboard/banners", icon: MonitorPlay },
    ],
    main: [
      { title: "Customers", href: "/dashboard/customers", icon: Users2 },
      { title: "Stores", href: "/dashboard/stores", icon: Warehouse },
      { title: "Vendors", href: "/dashboard/vendors", icon: UserSquare2 },
      { title: "Orders", href: "/dashboard/orders", icon: Truck },
      { title: "Sales", href: "/dashboard/sales", icon: DollarSign },
      { title: "Community", href: "/dashboard/community", icon: Building2 },
      { title: "Settings", href: "/dashboard/settings", icon: LayoutGrid },
    ],
  },
  VENDOR: {
    catalogue: [
      { title: "Products", href: "/dashboard/products", icon: Boxes },
      { title: "Coupons", href: "/dashboard/coupons", icon: ScanSearch },
    ],
    main: [
      { title: "Sales", href: "/dashboard/sales", icon: DollarSign },
      { title: "Orders", href: "/dashboard/orders", icon: Truck },
      { title: "Store", href: "/dashboard/stores", icon: ExternalLink },
      { title: "Settings", href: "/profile-settings", icon: LayoutGrid },
    ],
  },
  USER: {
    catalogue: [],
    main: [
      { title: "My Orders", href: "/dashboard/orders", icon: Truck },
      { title: "Edit Profile", href: "/profile-settings", icon: User },
      { title: "Online Store", href: "/", icon: ExternalLink },
    ],
  },
};
