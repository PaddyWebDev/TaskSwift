import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST() {
  try {
    cookies().delete("token");
    return NextResponse.json({ message: "Logout Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
