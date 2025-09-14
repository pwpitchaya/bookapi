// app/book/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from "@mui/material";
import Link from "next/link";
import type { Book } from "@/types/book";

// ฟังก์ชันฟอร์แมตราคาเป็นบาท
const formatPriceTHB = (price?: number | string) => {
  const n = typeof price === "string" ? Number(price) : price;
  if (typeof n !== "number" || Number.isNaN(n)) return "-";
  return new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(n);
};

// ให้ genre รองรับได้ทั้ง string | string[]
const renderGenre = (genre?: string | string[]) => {
  if (!genre) return "-";
  return Array.isArray(genre) ? genre.join(", ") : genre;
};

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>(); // ระบุชนิดชัดเจน
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchBook = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // ใช้ relative path จะปลอดภัยเวลา deploy
      const res = await fetch(`/api/books/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Book = await res.json();
      setBook(data ?? null);
    } catch (err: any) {
      setErrorMsg(err?.message || "ไม่สามารถโหลดข้อมูลหนังสือได้");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading)
    return (
      <Container sx={{ py: 6 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography>กำลังโหลด...</Typography>
        </Stack>
      </Container>
    );

  if (errorMsg)
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{errorMsg}</Alert>
        <Button component={Link} href="/" sx={{ mt: 2 }} variant="outlined">
          ← กลับหน้าหลัก
        </Button>
      </Container>
    );

  if (!book)
    return (
      <Container sx={{ py: 4 }}>
        <Typography>ไม่พบหนังสือ</Typography>
        <Button component={Link} href="/" sx={{ mt: 2 }} variant="outlined">
          ← กลับหน้าหลัก
        </Button>
      </Container>
    );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        {book.title}
      </Typography>
      <Typography variant="h6" gutterBottom color="text.secondary">
        ผู้แต่ง: {book.author}
      </Typography>

      {book.description && (
        <Typography variant="body1" sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
          {book.description}
        </Typography>
      )}

      <Box sx={{ mb: 2 }}>
        <Typography>หมวดหมู่: {renderGenre((book as any).genre)}</Typography>
        <Typography>ปีที่ตีพิมพ์: {book.year ?? "-"}</Typography>
        <Typography>ราคา: {formatPriceTHB((book as any).price)}</Typography>
        <Typography>
          สถานะ: {typeof (book as any).available === "boolean"
            ? ((book as any).available ? "มีในสต็อก" : "หมด")
            : "-"}
        </Typography>
      </Box>

      <Typography variant="caption" display="block" sx={{ mb: 2 }}>
        เพิ่มโดย: {book.addedBy?.username ?? "-"}{book.addedBy?.email ? ` (${book.addedBy.email})` : ""}
      </Typography>

      <Button component={Link} href="/" variant="outlined">
        ← กลับหน้าหลัก
      </Button>
    </Container>
  );
}
