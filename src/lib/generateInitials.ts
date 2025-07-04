export default function generateInitials(fullName: string) {
  if (!fullName) return "";

  if (fullName.length < 2) return "";

  const firstNameInitial = fullName[0].charAt(0).toUpperCase();
  const lastNameInitial = fullName[fullName.length - 1].charAt(0).toUpperCase();

  return `${firstNameInitial}${lastNameInitial}`;
}
