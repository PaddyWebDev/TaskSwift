import User from "@/Models/User";
import { NextRequest, NextResponse } from "next/server";

const { json } = NextResponse;

export async function PATCH(request: NextRequest) {
  try {
    const UserId = new URL(request.url).searchParams.get("UserId");

    //check if user exist
    const getUser = await User.findOne(
      { _id: UserId },
      "name email phoneNumber gender"
    );
    if (!getUser)
      return json({ message: "User Doesn't Exist" }, { status: 404 });

    const { UserData } = await request.json();

    Object.assign(getUser, UserData);
    await getUser.save();

    return json({ message: "Updated Successfully" }, { status: 200 });
  } catch (error: any) {
    return json({ message: "Internal Server Error" }, { status: 500 });
  }
}
