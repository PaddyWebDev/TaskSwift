import User from "@/Models/User";
import { NextRequest, NextResponse } from "next/server";

const { json } = NextResponse;
export async function GET(request: NextRequest) {
  try {
    const UserId = new URL(request.url).searchParams.get("UserId");
    const FindUser = await User.findOne({ _id: UserId }, "name email phoneNumber gender profilePicture");
    if (!FindUser)
      return json({ message: "User Doesn't Exist" }, { status: 404 });

    return json({ UserData: FindUser }, { status: 200 });
  } catch (error) {
    return json({ message: "Internal Server Error" }, { status: 500 });
  }
}
