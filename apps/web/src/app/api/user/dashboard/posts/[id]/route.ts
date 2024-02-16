import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Getting item details..." });
}

export async function PUT() {
  return NextResponse.json({ message: "Updating item details..." });
}

export async function DELETE() {
  return NextResponse.json({ message: "Deleting item..." });
}
