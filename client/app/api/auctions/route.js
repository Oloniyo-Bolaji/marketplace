import { db } from "@/lib/db/index.js";
import { auctionsTable } from "@/lib/db/schema.js";
import { NextResponse } from "next/server";
import { desc, eq } from 'drizzle-orm';


export async function GET() {
  try {
     const auctions = await db.query.auctionsTable.findMany({
     orderBy: (auctions) => desc(auctions.createdAt)
    });
    return NextResponse.json({ success: true, data: auctions });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}