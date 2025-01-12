import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const communityPost = await db.communityPost.findUnique({
      where: {
        id,
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

export async function DELETE(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
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
        }
      );
    }

    const deletedcommunityPost = await db.communityPost.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedcommunityPost);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Delete Community Post",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const {
      title,
      slug,
      categoryId,
      imageUrl,
      description,
      isActive,
      content,
    } = await request.json();

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
        { status: 404 }
      );
    }

    const updatedcommunityPost = await db.communityPost.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        categoryId,
        imageUrl,
        description,
        isActive,
        content,
      },
    });

    return NextResponse.json(updatedcommunityPost);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to update Community Post",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
