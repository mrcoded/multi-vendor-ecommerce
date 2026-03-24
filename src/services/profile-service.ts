import { db } from "@/lib/db";
import { UserProfileProps } from "@/types/user";

export async function updateUserProfile(
  userId: string,
  profileData: UserProfileProps["profile"],
) {
  // 🎯 Destructure to ensure only valid DB fields hit the update
  const { userId: _u, ...validData } = profileData;

  return await db.userProfile.update({
    where: { userId },
    data: {
      ...validData,
      // Ensure date conversion is handled safely
      dateOfBirth: validData.dateOfBirth
        ? new Date(validData.dateOfBirth)
        : null,
    },
  });
}

export async function getUserProfile(userId: string) {
  return await db.userProfile.findUnique({
    where: { userId },
  });
}
