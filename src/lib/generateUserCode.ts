export default function generateUserCode(
  prefix: string,
  fullName: string
): string {
  // Ensure the prefix is in uppercase
  const upperPrefix = prefix.toUpperCase();

  // Extract initials from the full name
  const initials = fullName
    .split(" ") // Split the name into parts
    .filter((part) => part.length > 0) // Remove any empty parts
    .map((part) => part[0].toUpperCase()) // Take the first letter and make it uppercase
    .join(""); // Join the initials

  // Generate a timestamp
  const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp in seconds

  // Combine the components
  return `${upperPrefix}-${initials}-${timestamp}`;
}
