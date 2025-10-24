// Proxies remote images through your domain so <Image> can optimize them
import { NextRequest } from "next/server";

export const runtime = "edge"; // fast & cacheable

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new Response("Missing url", { status: 400 });

  try {
    // allow https only, block data: / javascript:
    const u = new URL(url);
    if (u.protocol !== "https:") {
      return new Response("Only https is allowed", { status: 400 });
    }

    // fetch the remote image
    const r = await fetch(u.toString(), {
      // revalidate in the CDN/edge
      cache: "force-cache",
      // optional: tighten timeouts
      // @ts-ignore
      next: { revalidate: 60 * 60 }, // 1h
    });

    if (!r.ok || !r.body) {
      return new Response("Upstream error", { status: 502 });
    }

    // pass through content type & basic caching
    const contentType = r.headers.get("content-type") ?? "image/jpeg";
    return new Response(r.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new Response("Bad url", { status: 400 });
  }
}
