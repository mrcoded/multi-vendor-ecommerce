"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  createNewUser,
  getAllUsers,
  getUserById,
} from "@/services/user-service";

export async function registerUserAction(formData: any) {
  try {
    const newUser = await createNewUser(formData);

    //Purge the specific data cache (More efficient)
    revalidateTag("users-list");

    // Refresh the layout and page (Ensures UI updates)
    // revalidatePath("/dashboard/users");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "User created successfully",
      userId: newUser.id,
    };
  } catch (error: any) {
    console.error("[ACTION_ERROR] registerUserAction:", error);
    return {
      success: false,
      error: error.message || "Unable to create account",
    };
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
