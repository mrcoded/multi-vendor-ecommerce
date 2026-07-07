"use server";

import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import { revalidatePath } from "next/cache";
import {
  createNewUser,
  getAllUsers,
  getUserForRequester,
} from "@/services/user-service";
import { CreateUserProps } from "@/types/user";
import { authenticatedAction } from "../auth-wrapper";

export async function getAllUsersAction() {
  return authenticatedAction("Fetch Users", ["ADMIN"], async () =>
    getAllUsers(),
  );
}

export async function getUserByIdAction(id: string) {
  return authenticatedAction("Fetch User", null, async (user) =>
    getUserForRequester(id, user),
  );
}

export async function registerUserAction(formData: CreateUserProps) {
  try {
    const newUser = await createNewUser(formData);

    invalidateCacheTag(CACHE_TAGS.usersList);

    revalidatePath("/dashboard/users");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "User created successfully",
      userId: newUser.id,
    };
  } catch (error: any) {
    console.error("[ACTION_ERROR] registerUserAction:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Email already exists" };
    }
    return { success: false, error: "Internal Server Error" };
  }
}
