import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const body = await req.json();
  const { id, firstName, lastName, username, email } = body;
  
  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!existingUser) {
      await db.insert(usersTable).values({
        id,
        firstName,
        lastName,
        username,
        email,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
