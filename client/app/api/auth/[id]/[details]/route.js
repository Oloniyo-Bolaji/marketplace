import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function PUT(req, { params }) {
  const body = await req.json();
  const { data } = body;
  const { id, details } = params;

  try {
    if (details === "location") {
      await db
        .update(usersTable)
        .set({ location: data })
        .where(eq(usersTable.id, id));
    } else if (details === "phoneNumber") {
      await db
        .update(usersTable)
        .set({ phoneNumber: data })
        .where(eq(usersTable.id, id));
    } else if (details === "artisan") {
      await db
        .update(usersTable)
        .set({ artisan: data })
        .where(eq(usersTable.id, id));
    } else if (details === "address") {
      await db
        .update(usersTable)
        .set({ address: data })
        .where(eq(usersTable.id, id));
    } else if (details === "bankAccount") {
      await db
        .update(usersTable)
        .set({ bankAccount: data })
        .where(eq(usersTable.id, id));
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid field to update" },
        { status: 400 }
      );
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
