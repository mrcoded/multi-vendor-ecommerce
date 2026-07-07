import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { sanitizeCommunityPostInput } from "@/lib/sanitize-payloads";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    const communityPost = await db.communityPost.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(communityPost);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to fetch Community Post",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    const existingcommunityPost = await db.communityPost.findUnique({
      where: {
        id,
      },
    });

    if (!existingcommunityPost) {
      return NextResponse.json(
        {
          data: null,
          message: "Community Post Not Found",
        },
        {
          status: 404,
        },
      );
    }

    const deletedcommunityPost = await db.communityPost.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedcommunityPost);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to Delete Community Post",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    const body = await request.json();
    const safeData = sanitizeCommunityPostInput({
      id,
      ...body,
    });

    const existingcommunityPost = await db.communityPost.findUnique({
      where: {
        id,
      },
    });

    if (!existingcommunityPost) {
      return NextResponse.json(
        {
          data: null,
          message: "Community Post not found",
        },
        { status: 404 },
      );
    }

    const updatedcommunityPost = await db.communityPost.update({
      where: {
        id,
      },
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

    return NextResponse.json(updatedcommunityPost);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to update Community Post",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
