import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req, { params }) {
  const id = params?.id;
  if (!id) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, params.id));

    return NextResponse.json({ success: true, data: user[0] });
    console.log(data);
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
