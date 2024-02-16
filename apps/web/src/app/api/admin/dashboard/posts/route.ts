import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Getting all pending status item posts...",
  });
}
