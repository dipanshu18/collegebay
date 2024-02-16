import prisma from "../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  return NextResponse.json({ message: "Deleting item request..." });
}
