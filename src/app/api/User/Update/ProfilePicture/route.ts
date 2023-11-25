import User from "@/Models/User";
import connect from "@/database/dbConnection";
import { NextRequest, NextResponse } from "next/server";

const { json } = NextResponse;
export async function PATCH(request: NextRequest) {
  try {
    await connect();
    const UserId = new URL(request.url).searchParams.get("UserId");
    const { ProfilePicture } = await request.json();

    const FindUser = await User.findOne({ _id: UserId }, "profilePicture");

    if (!FindUser) {
      return json({ message: "User Doesn't Exist" }, { status: 404 });
    }

    FindUser.profilePicture = ProfilePicture;
    await FindUser.save();

    return json({ message: "Image Uploaded" }, { status: 200 });
  } catch (error: any) {
    return json(
      { message: "Internal Server Error", ErrorMessage: error.message },
      { status: 500 }
    );
  }
}
