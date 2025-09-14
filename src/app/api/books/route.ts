import { NextResponse } from "next/server";
import { books } from "../../../data/booksData"; // ระยะทางจากไฟล์นี้ไป data

export async function GET() {
  return NextResponse.json({
    books,
    pagination: { page: 1, limit: books.length, total: books.length, pages: 1 },
  });
}
