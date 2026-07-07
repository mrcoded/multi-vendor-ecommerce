import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { apiError, publicUserSelect, requireAuth } from "@/lib/api/api-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAuth(["ADMIN", "VENDOR", "USER"]);
  if (!authResult.ok) return authResult.response;

  try {
    const { id } = await params;

    if (authResult.user.role !== "ADMIN" && authResult.user.id !== id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const user = await db.user.findUnique({
      where: { id },
      select: {
        ...publicUserSelect,
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return apiError("Unable to fetch user");
  }
}
