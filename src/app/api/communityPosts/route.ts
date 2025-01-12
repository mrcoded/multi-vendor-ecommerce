import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

    //Check if community post already exists
    const existingStore = await db.communityPost.findUnique({
      where: {
        slug,
      },
    });

    if (existingStore) {
      return NextResponse.json(
        {
          data: null,
          message: "Community post already exists",
        },
        { status: 409 }
      );
    }

    const newCommunityPost = await db.communityPost.create({
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

    return NextResponse.json(newCommunityPost);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create Community Post",
        error,
      },
      {
        status: 500,
      }
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
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Community Posts",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
