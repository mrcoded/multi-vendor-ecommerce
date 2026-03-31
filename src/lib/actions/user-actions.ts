"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  createNewUser,
  getAllUsers,
  getUserById,
} from "@/services/user-service";
import { CreateUserProps } from "@/types/user";

export async function registerUserAction(formData: CreateUserProps) {
  try {
    const newUser = await createNewUser(formData);

    //Purge the specific data cache (More efficient)
    revalidateTag("users-list");

    // Refresh the layout and page (Ensures UI updates)
    revalidatePath("/dashboard/users");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "User created successfully",
      userId: newUser.id,
    };
  } catch (error: any) {
    console.error("[ACTION_ERROR] registerUserAction:", error);
    // P2002 is the Prisma code for "Unique constraint failed"
    if (error.code === "P2002") {
      return { success: false, error: "Email already exists" };
    }
    return { success: false, error: "Internal Server Error" };
  }
}

export async function fetchAllUsersAction() {
  try {
    const data = await getAllUsers();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: "Failed to fetch users" };
  }
}

export async function fetchUserByIdAction(id: string) {
  try {
    const data = await getUserById(id);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: "User not found" };
  }
}
