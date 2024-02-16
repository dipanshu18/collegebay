import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Logging in admin..." });
}
