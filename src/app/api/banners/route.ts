import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { title, link, imageUrl, isActive } = await request.json();

    const newBanner = await db.banner.create({
      data: {
        title,
        link,
        imageUrl,
        isActive,
      },
    });
    console.log(newBanner);

    return NextResponse.json(newBanner);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create Banner",
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
    const banners = await db.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Banners",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
