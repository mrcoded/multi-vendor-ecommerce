interface generateCouponCodeProps {
  title: string;
  expiryDate: string;
}

export const generateCouponCode = ({
  title = "",
  expiryDate = "",
}: generateCouponCodeProps) => {
  // Convert the title to uppercase and remove spaces
  const formattedTitle = title.toUpperCase().replace(/\s+/g, "");

  const formattedExpiryDate = expiryDate.split("-").reverse().join("");

  // Combine the title and formatted date
  const couponCode = `${formattedTitle}-${formattedExpiryDate}`;

  return couponCode;
};
