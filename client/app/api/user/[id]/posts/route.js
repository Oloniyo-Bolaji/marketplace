import { db } from "@/lib/db";
import { postsTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET(req, { params }) {
  const id = params?.id;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "User ID is required" },
      { status: 400 } 
    );
  }

  try {
    const posts = await db.query.postsTable.findMany({
      where: (posts, { eq }) => eq(posts.sellerId, id),
      with: {
        user: true,
      },
      orderBy: (posts) => desc(posts.createdAt),
    });

    return NextResponse.json({ success: true, data: posts });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
