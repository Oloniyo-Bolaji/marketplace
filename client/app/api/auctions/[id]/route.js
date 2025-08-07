import { db } from "@/lib/db/index.js";
import { NextResponse } from "next/server";
import { auctionsTable, usersTable } from "@/lib/db/schema.js";
import { eq } from "drizzle-orm";

export async function GET(req, context) {
  const { params } = await context;
  try {
    if (!params?.id) {
      return NextResponse.json(
        { success: false, error: "Missing product ID" },
        { status: 400 }
      );
    }

    const product = await db.query.auctionsTable.findFirst({
      where: (product, { eq }) => eq(product.id, params.id),
      with: {
        user: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

{/*export async function PUT(req) {
  const body = await req.json();
  const { data, sellerId } = body;

  try {
    await db
      .update(postsTable)
      .set({
        title: data.title,
        price: data.price,
        description: data.description,
        images: data.images,
        category: data.category,
        status: data.status,
        sellerId: sellerId,
      })
      .where(eq(postsTable.id, data.id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

{/**export async function DELETE(req, { params }) {
  const jobId = params?.id;

  if (!jobId) {
    console.log("No Job ID provided");
    return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
  }

  try {
    const result = await db.delete(jobsTable).where(eq(jobsTable.id, jobId));
    console.log("✅ Job deleted. Result:", result);

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("❌ Delete failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}*/}
