import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const { json, redirect } = NextResponse;
export async function GET() {
  const cookie = cookies();
  const token = cookie.get("token");

  if (!token) return redirect(new URL("/Login"));

  const decodedToken = await jwt.verify(
    token?.value as string,
    process.env.TOKEN_SECRET!
  );

  return json(
    {
      UserData: decodedToken,
    },
    { status: 200 }
  );
}
