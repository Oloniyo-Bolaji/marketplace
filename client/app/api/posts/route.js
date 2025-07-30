import { db } from "@/lib/db/index.js";
import { postsTable, usersTable } from "@/lib/db/schema.js";
import { NextResponse } from "next/server";
import { desc, eq } from 'drizzle-orm';


export async function GET() {
  try {
     const posts = await db.query.postsTable.findMany({
     orderBy: (posts) => desc(posts.createdAt)
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