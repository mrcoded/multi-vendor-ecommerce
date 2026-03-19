export const plans = [
  {
    title: "Free",
    isRecommended: false,
    description: "+5% transaction fee, no hidden setup fee",
    price: "$0",
    features: ["All features", "Unlimited products", "Unlimited revenue"],
    planType: "free",
  },
  {
    title: "Silver",
    isRecommended: true,
    description: "+2% transaction fee, good for revenue above $500",
    price: "$20",
    features: ["All features", "Unlimited products", "Unlimited revenue"],
    planType: "silver",
  },
  {
    title: "Gold",
    isRecommended: false,
    description: "No transaction fee, great for revenue above $5000",
    price: "$99",
    features: ["All features", "Unlimited products", "Unlimited revenue"],
    planType: "gold",
  },
];
