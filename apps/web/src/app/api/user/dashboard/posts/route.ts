import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Getting all item posts..." });
}

export async function POST() {
  return NextResponse.json({ message: "Creating item post..." });
}
