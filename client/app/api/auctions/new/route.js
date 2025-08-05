import { db } from "@/lib/db";
import { usersTable, postsTable, auctionsTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Received body:", body);
    const { data, sellerId } = body;

    await db.insert(auctionsTable).values({
      title: data.title,
      price: data.price,
      bidPrice: data.bidPrice,
      startTime: new Date(data.startTime),
      durationMinutes: data.durationMinutes,
      description: data.description,
      images: data.images,
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
