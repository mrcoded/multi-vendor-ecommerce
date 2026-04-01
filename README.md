# BelStore: High-Performance Multi-Vendor E-Commerce Marketplace

This is a Next.js 15 and TypeScript-based multi-vendor platform built to solve the "Marketplace Synchronization Bottleneck." It focuses on Atomic Inventory Transactions using Prisma and MongoDB, Server Action-driven Service Layers, and complex relational UI layouts to handle the interaction between Admins, Vendors, and Customers.

## Getting Started

To get started with BelStore, follow these steps:

1. Clone the repository: git clone https://github.com/mrcoded/multi-vendor-ecommerce.git

2. Install dependencies: bun install

3. Create a .env file in the root directory and add the following environment variables:

## Database (MongoDB + Prisma)

DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/belstore"

## Authentication (Next-Auth)

NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

## Image Hosting (Uploadthing)

UPLOADTHING*SECRET="sk_live*..."
UPLOADTHING_APP_ID="your-app-id"

4. Sync your database schema:
   Run: npx prisma generate
   Then seed the initial data: npx prisma db seed

5. Run the development server: In your terminal, run bun dev

6. Open http://localhost:3000 to view your marketplace.

## Features

- **Multi-Role RBAC Middleware:** A custom-built security layer that segregates access between Admins (Master Key), Vendors (Store Management), and Customers (Checkout/Profile) using Next-Auth edge compatibility.

- **Atomic Inventory Transactions:** Advanced Prisma $transaction logic that prevents overselling by performing "Find-Check-Update" cycles on product stock before order finalization.

- **Service-Oriented Architecture:** A clean separation of concerns where UI components call Server Actions, which in turn utilize an authenticatedAction wrapper to validate permissions at the service level.

- **Vendor Onboarding Pipeline:** A dedicated flow for new vendors to initialize their stores, ensuring email verification and profile completion before product listing is enabled.

- **Real-Time Step Checkout:** A persistent, multi-step checkout interface powered by Redux Toolkit, ensuring user progress is saved across page reloads via LocalStorage synchronization.

- **Dynamic Sales & Revenue Tracking:** Automated creation of "Sale" records upon successful checkout, allowing vendors to track individual product performance and total earnings.

- **Optimized Image Delivery:** Integration with Uploadthing for high-speed uploads, paired with Next.js Image optimization (and unoptimized fallbacks for animated assets) to ensure 100 PageSpeed scores.


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
