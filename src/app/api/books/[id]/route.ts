import { NextResponse } from "next/server";
import { books } from "../../../../data/booksData"; // ลึกขึ้น 1 ระดับ

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const book = books.find((b) => b._id === params.id);
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
  return NextResponse.json(book);
}

