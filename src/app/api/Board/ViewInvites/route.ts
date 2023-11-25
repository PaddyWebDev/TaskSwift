import Notification from "@/Models/Notification";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const { json } = NextResponse;
export async function GET(request: NextRequest) {
  try {
    const UserId = new URL(request.url).searchParams.get("UserId");
    console.log(UserId);
    const Invite = await Notification.find({
      "invite.invitedTo": new mongoose.Types.ObjectId(UserId as string),
    }, "message invite BoardId ");
    if (!Invite)
      return json({ message: "Invite Doesn't exist" }, { status: 404 });

    return json({ InviteData: Invite }, { status: 200 });
  } catch (error: any) {
    return json(
      { message: "Internal Server Error", ErrorMessage: error.message },
      { status: 500 }
    );
  }
}
