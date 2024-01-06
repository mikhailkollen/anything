import { type NextRequest, NextResponse } from "next/server";
import prisma from "../_base";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  const result = await prisma.user.create({
    data: {
      name,
      email,
      image: "no_image",
    },
  });

  return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
  const searchValue = req.nextUrl.searchParams.get("search");

  if (!searchValue) return NextResponse.json([]);

  const result = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchValue,
          },
        },
        {
          email: {
            contains: searchValue,
          },
        },
      ],
    },
  });

  return NextResponse.json(result);
}
