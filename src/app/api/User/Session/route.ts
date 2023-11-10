import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const { json } = NextResponse;
export async function GET() {
  try {
    const cookie = cookies();
    const token = cookie.get("token");

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
  } catch (error: any) {
    return json(
      { message: "Internal Server Error", ErrorMessage: error.message },
      { status: 500 }
    );
  }
}
