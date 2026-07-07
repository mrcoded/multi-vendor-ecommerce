import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { sanitizeCommunityPostInput } from "@/lib/sanitize-payloads";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      categoryId,
      imageUrl,
      description,
      isActive,
      content,
      id,
    } = body;

    const safeData = sanitizeCommunityPostInput({
      id: id ?? "",
      title,
      slug,
      categoryId,
      imageUrl,
      description,
      isActive,
      content,
    });

    //Check if community post already exists
    const existingStore = await db.communityPost.findUnique({
      where: {
        slug: safeData.slug,
      },
    });

    if (existingStore) {
      return NextResponse.json(
        {
          data: null,
          message: "Community post already exists",
        },
        { status: 409 },
      );
    }

    const newCommunityPost = await db.communityPost.create({
      data: {
        title: safeData.title,
        slug: safeData.slug,
        categoryId: safeData.categoryId,
        imageUrl: safeData.imageUrl,
        description: safeData.description,
        isActive: safeData.isActive,
        content: safeData.content,
      },
    });

    return NextResponse.json(newCommunityPost);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to create Community Post",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: Request) {
  try {
    const communityPost = await db.communityPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(communityPost);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to fetch Community Posts",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
