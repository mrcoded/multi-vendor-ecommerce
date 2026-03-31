import { PrismaClient, UserRole, OrderStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// --- 1. UTILITY FUNCTIONS ---
const generateSlug = (...args: string[]): string => {
  const value = args.join(" ");
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
};

function generateUserCode(prefix: string, fullName: string): string {
  const upperPrefix = prefix.toUpperCase();
  const initials = fullName
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0].toUpperCase())
    .join("");
  const timestamp = Math.floor(Date.now() / 1000);
  return `${upperPrefix}-${initials}-${timestamp}`;
}

interface generateCouponCodeProps {
  title: string;
  expiryDate: string;
}

export const generateCouponCode = ({
  title = "",
  expiryDate = "",
}: generateCouponCodeProps) => {
  const formattedTitle = title.toUpperCase().replace(/\s+/g, "");
  const dateOnly = expiryDate.split("T")[0];
  const formattedExpiryDate = dateOnly.split("-").reverse().join("");
  return `${formattedTitle}-${formattedExpiryDate}`;
};

const toFixedPrice = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

// --- 2. CATEGORY IMAGE MAPPING ---

const categoryImages: Record<string, string[]> = {
  "grains & nuts": [
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUoD4Oj86fw934jENrRtk2hmTUbGquiM1Hz85x",
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUYl0vRxXQSRVrFeMWqZItLpfJszuO64dHA9x2",
  ],
  "garden tools": [
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUNUBnEdAAwjKemYHc6OPD2qT4ztkgnWoXQV7R",
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUqxf7klWG5xXSlZiYDdVenCHgUfs6oNW3IwKu",
  ],
  kitchenware: [
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUatKu5zgi47QV2yBldUv5h0Ax9La1NjDT3tIs",
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUZYvNg4eVlSMYrqDOWsTPJ39BIGaRewpdkAzx",
  ],
  electronics: [
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUblX2CNonfYpZXA93qC10UaeS5owjcDbh68d7",
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUtnqCJVSg5kOUNGEf0JWso2lRZuLM9DA8jrim",
  ],
  "diary & eggs": [
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCU6JZjAuhd9nEQ2SH5FXPpjambDJLAfIC1yKeh",
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUjeJZ3EDquRFTJn3QlxZV0LmAz9IwsHSMXhvj",
  ],
  vegetables: [
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCU05AgRF8QdfblPGugxBvAzXmVjretq5L28FS9",
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCU1mSNp6qVyfpdxBGHukLv7sz6ijr0tJmnX5Qw",
  ],
  "fresh fruits": [
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCU0DTuwt8QdfblPGugxBvAzXmVjretq5L28FS9",
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUVIqRqMFESur7gnPZ6vC25bFmyDhfz93QLH1s",
  ],
  bakery: [
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUxLjzi2dYJNPM0lwVvZt6aBRHqg5cEWTbQFO8",
    "https://4qmwrvytmq.ufs.sh/f/5REAPyu7wBCUN89nwhAAwjKemYHc6OPD2qT4ztkgnWoXQV7R",
  ],
};

async function main() {
  console.clear();
  console.log("🚀 Starting Refined Global Seed...");

  // 3. CLEANUP

  console.log("🧹 Starting atomic cleanup...");
  await prisma.$transaction([
    prisma.sale.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.product.deleteMany(),
    prisma.communityPost.deleteMany(),
    prisma.coupon.deleteMany(),
    prisma.banner.deleteMany(),
    prisma.category.deleteMany(),
    prisma.store.deleteMany(),
    prisma.vendorProfile.deleteMany(),
    prisma.userProfile.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  console.log("✅ Database wiped clean.");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 5. CUSTOMERS
  const customerNames = ["Liam", "Noah", "Emma", "Olivia", "James"];
  const createdCustomers = [];

  console.log("👥 Creating customers...");

  for (const [i, name] of customerNames.entries()) {
    const customer = await prisma.user.create({
      data: {
        name,
        email: `customer${i + 1}@example.com`,
        password: hashedPassword,
        role: UserRole.USER,
        status: true,
        profile: {
          create: {
            firstName: name,
            lastName: "User",
            email: `customer${i + 1}@example.com`,
            phone: `+2347000000${i}`,
            city: "Lagos",
            country: "Nigeria",
          },
        },
      },
    });
    createdCustomers.push(customer);
    console.log(`   ✅ Created Customer: ${name} (${customer.email})`);
  }

  // 6. CATEGORIES
  const createdCategories = [];
  const categoryNames = Object.keys(categoryImages);
  for (const name of categoryNames) {
    const cat = await prisma.category.create({
      data: {
        title: name.charAt(0).toUpperCase() + name.slice(1),
        slug: generateSlug(name),
        imageUrl: categoryImages[name][0],
        description: `High quality ${name} products.`,
        isActive: true,
      },
    });
    createdCategories.push(cat);
  }
  console.log(`📂 Created ${createdCategories.length} Categories`);

  // 7. VENDORS
  const createdVendors = [];
  const vendorNames = ["Alice", "Bob", "Charlie", "David"];
  for (const [i, name] of vendorNames.entries()) {
    const v = await prisma.user.create({
      data: {
        name: `${name} Marketplace`,
        email: `vendor${i + 1}@example.com`,
        password: hashedPassword,
        role: UserRole.VENDOR,
        status: true,
        vendorProfile: {
          create: {
            code: generateUserCode("VND", name),
            firstName: name,
            lastName: "Provider",
            email: `vendor${i + 1}@example.com`,
            phone: `+23480111111${i}`,
          },
        },
      },
    });
    createdVendors.push(v);
  }
  console.log(`🏪 Created ${createdVendors.length} Vendors`);

  // 8. STORES (Multi-store support for vendors)
  // const storeNames = [
  //   "Green Valley Main",
  //   "Green Valley Express",
  //   "Urban Tech Hub",
  //   "Urban Tech Lite",
  //   "Home Hearth",
  //   "Lagos Mart",
  //   "Ikeja Elec",
  //   "Island Veggies",
  //   "Lekki Luxury",
  //   "Ajah Appliances",
  // ];

  // 8. STORES
  const createdStores = [];
  const storeNames = [
    "Green Valley Main",
    "Green Valley Express",
    "Urban Tech Hub",
    "Urban Tech Lite",
    "Home Hearth",
    "Lagos Mart",
    "Ikeja Elec",
    "Island Veggies",
    "Lekki Luxury",
    "Ajah Appliances",
  ];

  for (const [i, name] of storeNames.entries()) {
    const vendorIndex = Math.floor(i / 2) % createdVendors.length;
    const vendor = createdVendors[vendorIndex];
    const randomCategoryIds = createdCategories
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((c) => c.id);

    const s = await prisma.store.create({
      data: {
        title: name,
        slug: generateSlug(name, i.toString()),
        isActive: true,
        storeEmail: `contact@${generateSlug(name)}.com`,
        storePhone: `+2349000000${i}`,
        city: "Lagos",
        country: "Nigeria",
        streetAddress: `${10 + i} Market Way`,
        vendorId: vendor.id,
        categoryIds: randomCategoryIds,
      },
    });
    createdStores.push(s);
  }
  console.log(`🏬 Created ${createdStores.length} Stores`);

  // 9. PRODUCTS (Creating individual product records per store)
  console.log("📦 Creating products across respective stores...");
  const allProducts = [];
  let productCounter = 1;

  for (const category of createdCategories) {
    // 1. Find all stores that explicitly carry this category
    const eligibleStores = createdStores.filter((store) =>
      store.categoryIds.includes(category.id),
    );

    // Fallback in case randomness leaves a category with no stores
    const fallbackStores =
      eligibleStores.length > 0 ? eligibleStores : createdStores.slice(0, 3);

    // 2. Generate 5 distinct base products for this category
    for (let i = 1; i <= 5; i++) {
      const baseTitle = `${category.title} Premium Item ${i}`;

      // 3. Select 2 to 3 random stores to carry this specific product
      const shuffledStores = fallbackStores.sort(() => 0.5 - Math.random());
      const assignedStores = shuffledStores.slice(
        0,
        Math.floor(Math.random() * 2) + 2,
      );

      // 4. Create a distinct Product record for EACH store assigned
      for (const store of assignedStores) {
        const product = await prisma.product.create({
          data: {
            title: baseTitle,
            // Append a chunk of the store ID & counter to ensure uniqueness across stores
            slug: generateSlug(baseTitle),
            imageUrl: category.imageUrl,
            productImages: categoryImages[category.title.toLowerCase()] || [],
            description: `High quality ${baseTitle} available at ${store.title}.`,

            productPrice: toFixedPrice(Math.random() * 100 + 30),
            salePrice: toFixedPrice(Math.random() * 50 + 10),
            qty: Math.floor(Math.random() * 100) + 10,

            isActive: true,
            isWholesale: i % 3 === 0,
            sku: generateUserCode("SKU", `${baseTitle}-${store.id.slice(-4)}`),

            categoryId: category.id,
            userId: store.vendorId, // Directly link the product to the store's rightful vendor
            storeId: store.id, // Direct 1-to-many relationship mapping
            tags: [category.title, "Premium", store.title],
          },
        });

        allProducts.push(product);
        productCounter++;
      }
    }
  }

  // 10. ORDERS & SALES
  console.log("🛒 Generating 15 Orders...");
  const orderStatuses = Object.values(OrderStatus);

  for (let i = 1; i <= 15; i++) {
    const customer = createdCustomers[i % createdCustomers.length];
    const product = allProducts[Math.floor(Math.random() * allProducts.length)];

    const qty = 1;
    const total = toFixedPrice(product.salePrice * qty);

    const order = await prisma.order.create({
      data: {
        userId: customer.id,
        orderNumber: `${Date.now().toString().slice(-6) + i}`,
        firstName: customer.name || "Customer",
        lastName: "User",
        emailAddress: customer.email || "",
        phone: "+2347012345678",
        streetAddress: `${i * 5} Seed Road`,
        city: "Lagos",
        country: "Nigeria",
        district: "Lagos Mainland",
        shippingCost: 5.0,
        paymentMethod: "Stripe",
        orderStatus: orderStatuses[i % orderStatuses.length],
        orderItems: {
          create: {
            productId: product.id,
            vendorId: product.userId,
            storeId: product.storeId, // Take the direct store ID from the individual product record
            quantity: qty,
            price: product.salePrice,
            totalPrice: total,
            title: product.title,
            imageUrl: product.imageUrl ?? "",
          },
        },
      },
    });

    await prisma.sale.create({
      data: {
        orderId: order.id,
        productId: product.id,
        vendorId: product.userId,
        storeId: product.storeId, // Take the direct store ID from the individual product record
        productTitle: product.title,
        productPrice: product.salePrice,
        productQty: qty,
        total: total,
        productImageUrl: product.imageUrl,
      },
    });
  }

  // 11. COMMUNITY POSTS
  for (const cat of createdCategories) {
    await prisma.communityPost.create({
      data: {
        title: `How to choose the best ${cat.title}`,
        slug: generateSlug("blog", cat.title),
        imageUrl: cat.imageUrl,
        description: `Insights on ${cat.title}.`,
        content: "Detailed content regarding sourcing and quality.",
        isActive: true,
        categoryId: cat.id,
      },
    });
  }

  // 12. COUPONS
  for (let i = 1; i <= 4; i++) {
    await prisma.coupon.create({
      data: {
        title: `Promo ${i}`,
        couponCode: generateCouponCode({
          title: `OFFER${i}`,
          expiryDate: "2025-12-31",
        }),
        expiryDate: new Date("2025-12-31"),
        isActive: true,
        vendorId: createdVendors[i % createdVendors.length].id,
      },
    });
  }

  console.log(
    "✅ Seed Successful: Simplified 1-to-many store relationship setup applied.",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
