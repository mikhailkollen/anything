import { NextResponse } from "next/server";
import prisma from "../_base";

export async function POST(req: Request, res: Response) {
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
