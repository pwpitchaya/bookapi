"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  Alert,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import type { Book, BookResponse } from "@/types/book";

export default function Page() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // UI states
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState<"ALL" | string>("ALL");
  const [sortBy, setSortBy] = useState<"title" | "year" | "price">("title");

  const getData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/books", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: BookResponse = await res.json();
      setBooksData(data.books ?? []);
    } catch (err: any) {
      setErrorMsg(err?.message || "Fetch failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // unique genres for filter
  const genres = useMemo(() => {
    const s = new Set<string>();
    booksData.forEach((b) => b.genre && s.add(b.genre));
    return ["ALL", ...Array.from(s).sort()];
  }, [booksData]);

  // filtered + sorted list
  const shownBooks = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = booksData.filter((b) => {
      const matchText =
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term);
      const matchGenre = genre === "ALL" ? true : b.genre === genre;
      return matchText && matchGenre;
    });

    list = list.sort((a, b) => {
      if (sortBy === "title")
        return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
      if (sortBy === "year") return b.year - a.year; // ใหม่ก่อน
      const pa = Number((a as any).price ?? 0);
      const pb = Number((b as any).price ?? 0);
      return pa - pb; // ราคาต่ำก่อน
    });
    return list;
  }, [booksData, q, genre, sortBy]);

  return (
    <Container sx={{ py: 5 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight={700}>
          รายการหนังสือ
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <TextField
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหาจากชื่อหรือผู้แต่ง…"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="genre-label">หมวดหมู่</InputLabel>
            <Select
              labelId="genre-label"
              value={genre}
              label="หมวดหมู่"
              onChange={(e) => setGenre(e.target.value)}
            >
              {genres.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="sort-label">เรียงตาม</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              label="เรียงตาม"
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <MenuItem value="title">ชื่อ (A→Z)</MenuItem>
              <MenuItem value="year">ปีพิมพ์ (ใหม่→เก่า)</MenuItem>
              <MenuItem value="price">ราคา (ถูก→แพง)</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          เกิดข้อผิดพลาด: {errorMsg}
        </Alert>
      )}

      {/* Loading Skeletons */}
      {isLoading ? (
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Skeleton variant="text" height={28} />
                <Skeleton variant="text" width="60%" />
                <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
                  <Skeleton variant="rounded" width={60} height={24} />
                  <Skeleton variant="rounded" width={90} height={24} />
                </Stack>
                <Skeleton variant="text" width="40%" />
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Skeleton variant="rounded" width={120} height={36} />
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : shownBooks.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
          <Typography>ไม่พบรายการตามเงื่อนไขที่เลือก</Typography>
        </Box>
      ) : (
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
        >
          {shownBooks.map((book) => {
            const price =
              book?.price !== undefined
                ? Number((book as any).price).toFixed(2)
                : "-";
            return (
              <Card
                key={book._id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Typography variant="h6" fontWeight={700} sx={{ pr: 1 }}>
                      {book.title}
                    </Typography>
                    <Chip
                      label={book.available ? "พร้อมขาย" : "หมด"}
                      color={book.available ? "success" : "default"}
                      size="small"
                      sx={{ ml: 1, flexShrink: 0 }}
                    />
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    โดย {book.author || "Unknown"}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 1, mb: 1 }}
                    flexWrap="wrap"
                  >
                    <Chip label={book.genre} size="small" />
                    <Chip label={`ปี ${book.year}`} size="small" />
                    <Chip label={`฿${price}`} size="small" />
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    title={book.description}
                  >
                    {book.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ mt: "auto", px: 2, pb: 2 }}>
                  <Button
                    LinkComponent={Link}
                    href={`/book/${book._id}`}
                    endIcon={<ArrowOutwardIcon />}
                    variant="contained"
                    sx={{ borderRadius: 2 }}
                  >
                    ดูรายละเอียด
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      )}
    </Container>
  );
}
