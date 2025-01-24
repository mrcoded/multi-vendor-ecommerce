export default function generateInitials(fullName: string) {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");
  if (names.length < 2) return "";

  const firstNameInitial = names[0].charAt(0).toUpperCase();
  const lastNameInitial = names[names.length - 1].charAt(0).toUpperCase();

  return `${firstNameInitial}${lastNameInitial}`;
}
