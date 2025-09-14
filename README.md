import Link from "next/link";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import type { Book } from "@/types/book";

// ฟังก์ชันฟอร์แมตราคาเป็นบาท
const formatPrice = (price?: number) =>
  typeof price === "number"
    ? new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(price)
    : undefined;

// ฟังก์ชันรวมหมวดหมู่ (string | string[])
const renderGenre = (g: unknown) =>
  Array.isArray(g) ? g.join(", ") : (g as string | undefined);

async function getBook(id: string): Promise<Book | null> {
  try {
    // ใช้ relative path เพื่อรองรับ production
    const res = await fetch(`/api/books/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const book: Book = (data?.book ?? data) as Book;
    return book ?? null;
  } catch {
    return null;
  }
}

export default async function BookDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const book = await getBook(params.id);

  return (
    <Container sx={{ py: 4 }}>
      {/* ปุ่มกลับ */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBackRoundedIcon />}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          ← กลับหน้าหลัก
        </Button>
      </Stack>

      {/* ถ้าไม่พบหนังสือ */}
      {!book ? (
        <Typography variant="h5">ไม่พบหนังสือ</Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                {/* ชื่อและผู้แต่ง */}
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                  ผู้แต่ง: {book.author}
                </Typography>

                {/* Chip: หมวดหมู่ / ราคา / สถานะ */}
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 2 }}>
                  {renderGenre((book as any).genre) && (
                    <Chip label={renderGenre((book as any).genre)} size="small" />
                  )}
                  {typeof (book as any).available === "boolean" && (
                    <Chip
                      size="small"
                      label={(book as any).available ? "พร้อมขาย" : "หมด"}
                      color={(book as any).available ? "success" : "default"}
                      variant={(book as any).available ? "filled" : "outlined"}
                    />
                  )}
                  {typeof (book as any).price === "number" && (
                    <Chip size="small" label={formatPrice((book as any).price)} />
                  )}
                </Stack>

                {/* คำอธิบาย */}
                {book.description && (
                  <>
                    <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                      คำอธิบาย
                    </Typography>
                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {book.description}
                    </Typography>
                  </>
                )}

                <Divider sx={{ my: 2 }} />

                {/* รายละเอียดเพิ่มเติม */}
                <Grid container spacing={2}>
                  {/* ID */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      ID
                    </Typography>
                    <Typography>{(book as any)._id ?? (book as any).id ?? "-"}</Typography>
                  </Grid>

                  {/* ปีที่ตีพิมพ์ */}
                  {typeof book.year !== "undefined" && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        ปีที่ตีพิมพ์
                      </Typography>
                      <Typography>{book.year}</Typography>
                    </Grid>
                  )}

                  {/* ราคา */}
                  {typeof (book as any).price === "number" && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        ราคา
                      </Typography>
                      <Typography>{formatPrice((book as any).price)}</Typography>
                    </Grid>
                  )}

                  {/* สถานะ */}
                  {typeof (book as any).available === "boolean" && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        สถานะ
                      </Typography>
                      <Typography>{(book as any).available ? "พร้อมขาย" : "หมด"}</Typography>
                    </Grid>
                  )}

                  {/* ผู้เพิ่มข้อมูล */}
                  {(book as any).addedBy && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          เพิ่มโดย
                        </Typography>
                        <Typography>{(book as any).addedBy?.username}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          ติดต่อ
                        </Typography>
                        <Typography>
                          <a href={`mailto:${(book as any).addedBy?.email}`}>
                            {(book as any).addedBy?.email}
                          </a>
                        </Typography>
                      </Grid>
                    </>
                  )}

                  {/* เวลาสร้าง */}
                  {book.createdAt && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        สร้างเมื่อ
                      </Typography>
                      <Typography>{new Date(book.createdAt).toLocaleString()}</Typography>
                    </Grid>
                  )}

                  {/* เวลาแก้ไข */}
                  {book.updatedAt && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        อัปเดตล่าสุด
                      </Typography>
                      <Typography>{new Date(book.updatedAt).toLocaleString()}</Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
