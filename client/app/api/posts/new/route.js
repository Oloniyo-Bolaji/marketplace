import { db } from "@/lib/db";
import { usersTable, postsTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Received body:", body); 
    const { data, sellerId } = body;

    await db.insert(postsTable).values({
      title: data.title,
      price:data.price,
      description:data.description,
      images: data.images,
      category: data.category,
      status: data.status,
      sellerId,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
