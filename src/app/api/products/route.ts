import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data";
import { z } from "zod";

const querySchema = z.object({
  cat: z.string().max(30).optional(),
  q: z.string().max(50).optional(),
  sort: z.enum(["price_asc", "price_desc", "best", "new"]).optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = querySchema.safeParse({
    cat: searchParams.get("cat") || undefined,
    q: searchParams.get("q") || undefined,
    sort: searchParams.get("sort") || undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid query" }, { status: 400 });
  }
  const { cat, q, sort } = parsed.data;
  let list = [...products];
  if (cat) {
    const safeCat = cat.replace(/[^a-z0-9_-]/gi, "");
    list = list.filter((p) => p.category === safeCat);
  }
  if (q) {
    const safeQ = q.slice(0, 50);
    list = list.filter((p) => p.name.includes(safeQ) || p.brand.includes(safeQ));
  }
  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
  return NextResponse.json({ data: list, meta: { total: list.length } }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}
