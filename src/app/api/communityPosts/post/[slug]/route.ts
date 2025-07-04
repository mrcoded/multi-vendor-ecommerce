import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params: { slug },
  }: {
    params: { slug: string };
  }
) {
  try {
    const communityPost = await db.communityPost.findUnique({
      where: {
        slug,
      },
    });

    return NextResponse.json(communityPost);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Community Post",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
