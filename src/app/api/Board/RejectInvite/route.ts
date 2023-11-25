import Board from "@/Models/Board";
import Notification from "@/Models/Notification";
import { NextRequest, NextResponse } from "next/server";

const { json } = NextResponse;
export async function PATCH(request: NextRequest) {
  try {
    const Body = await request.json();
    const { BoardId, invitedTo, _id } = Body;

    const getBoard = await Board.findOne(
      { _id: BoardId },
      "AddedMember UserId"
    );
    if (!getBoard)
      return json({ message: "Board Doesn't Exist" }, { status: 404 });

    const FindNotification = await Notification.findOne({ _id: _id }, "invite");

    const isUserAlreadyAdded: boolean = getBoard.AddedMember.some(
      (member: any) => member.MemberId.toString() === invitedTo.toString()
    );
    if (isUserAlreadyAdded) {
      return json(
        { message: "User is Already Added to the Workspace" },
        { status: 409 }
      );
    }
    const isAdminTryingAddHimself: boolean =
      getBoard.UserId.toString() === invitedTo.toString();

    if (isAdminTryingAddHimself) {
      return json(
        {
          message: "Admin can't be in the same workspace",
        },
        { status: 409 }
      );
    }

    FindNotification.invite.status = "rejected";
    FindNotification.save();

    return json({ message: "Rejected" }, { status: 200 });
  } catch (error: any) {
    return json(
      { message: "Internal Server Error", ErrorMessage: error.message },
      { status: 500 }
    );
  }
}
