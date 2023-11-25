import Notification from "@/Models/Notification";
import { NextRequest, NextResponse } from "next/server";

const { json } = NextResponse;
export async function POST(request: NextRequest) {
  try {
    const Body = await request.json();
    console.log(Body);
    const { BoardId, MemberId, SenderId } = Body;
    const message = "Board Invitation";
    const NewNotification = new Notification({
      BoardId,
      message,
      invite: {
        invitedBy: SenderId,
        invitedTo: MemberId,
      },
    });
    const res = NewNotification.save();
    if (res) return json({ message: "Invite Sent" }, { status: 200 });
    return json({ message: "Failed" });
  } catch (error: any) {
    return json(
      { message: "Internal Server Error", ErrorMessage: error.message },
      { status: 500 }
    );
  }
}
