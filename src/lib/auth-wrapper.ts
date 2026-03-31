import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Match these to your Prisma Schema roles
type UserRole = "ADMIN" | "VENDOR" | "USER";

export async function authenticatedAction<T>(
  actionName: string,
  allowedRoles: UserRole[] | null, // null means any logged-in user can do it
  callback: (user: { id: string; email: string; role: UserRole }) => Promise<T>,
) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as any;

    //Check if user is logged in
    if (!session || !user?.id) {
      return {
        success: false,
        error: "Authentication required. Please log in.",
        code: 401,
      };
    }

    //Check if user has the required role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      console.error(
        `[AUTH_ERROR] ${actionName}: Role "${user.role}" is unauthorized.`,
      );
      return {
        success: false,
        error: `Forbidden: You need ${allowedRoles.join(" or ")} privileges.`,
        code: 403,
      };
    }

    // Run the actual database/service logic
    const data = await callback({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      data,
      message: `${actionName} completed successfully.`,
    };
  } catch (error: any) {
    console.error(`[ACTION_ERROR] ${actionName}:`, error);
    return {
      success: false,
      error: error.message || "A server error occurred.",
      code: 500,
    };
  }
}
