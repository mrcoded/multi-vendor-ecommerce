import { auth } from "@/auth";
import { sanitizeServerError } from "@/lib/api/api-errors";

// Match these to your Prisma Schema roles
type UserRole = "ADMIN" | "VENDOR" | "USER";

export async function publicQueryAction<T>(fn: () => Promise<T>) {
  try {
    const data = await fn();
    return { success: true as const, data };
  } catch (error: unknown) {
    console.error("[QUERY_ERROR]:", error);
    return { success: false as const, error: sanitizeServerError(error) };
  }
}

export async function authenticatedAction<T>(
  actionName: string,
  allowedRoles: UserRole[] | null, // null means any logged-in user can do it
  callback: (user: { id: string; email: string; role: UserRole }) => Promise<T>,
) {
  try {
    const session = await auth();
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
  } catch (error: unknown) {
    console.error(`[ACTION_ERROR] ${actionName}:`, error);
    return {
      success: false,
      error: sanitizeServerError(error),
      code: 500,
    };
  }
}
