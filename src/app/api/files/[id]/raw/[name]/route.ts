import { type NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "~/lib/mongodb";
import SharedFile from "~/models/shared-file";

type Params = {
  params: Promise<{
    id: string;
    // Trailing segment carrying the file name so the browser tab title shows
    // the real filename instead of "raw". Ignored by the handler.
    name: string;
  }>;
};

/**
 * Public file proxy. Streams the underlying Cloudinary asset through our own
 * domain so shared links stay on chahatkesh.me and can be previewed inline.
 * The file is always looked up by `id`; `name` only affects the tab title.
 *
 * Note: PDFs/ZIPs require "Allow delivery of PDF and ZIP files" to be enabled
 * in the Cloudinary account (Settings → Security). That block is account-level
 * and applies to this server-side fetch too.
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 },
      );
    }

    await dbConnect();
    const file = await SharedFile.findById(id).lean<{
      fileName: string;
      fileUrl: string;
      format: string;
    }>();

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 },
      );
    }

    const upstream = await fetch(file.fileUrl, { cache: "no-store" });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The file could not be delivered. If this is a PDF or ZIP, enable PDF/ZIP delivery in Cloudinary Security settings.",
        },
        { status: 502 },
      );
    }

    const download = request.nextUrl.searchParams.get("dl") === "1";
    const contentType =
      upstream.headers.get("content-type") || "application/octet-stream";
    const safeName = file.fileName.replace(/["\\\r\n]/g, "_");

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `${download ? "attachment" : "inline"}; filename="${safeName}"`,
    );
    headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
    const length = upstream.headers.get("content-length");
    if (length) headers.set("Content-Length", length);

    return new NextResponse(upstream.body, { status: 200, headers });
  } catch (error) {
    console.error("Error proxying shared file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load file" },
      { status: 500 },
    );
  }
}
