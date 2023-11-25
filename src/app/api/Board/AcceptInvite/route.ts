import Board from "@/Models/Board";
import Notification from "@/Models/Notification";
import User from "@/Models/User";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("BoardId");
    //check if the board exist
    const getBoard = await Board.findOne(
      { _id: BoardId },
      "AddedMember UserId "
    );
    //if board doesn't exist return a response with 404 error
    if (!getBoard) {
      return response.json({ message: "Board doesn't exist" }, { status: 404 });
    }

    const Body = await request.json();
    const { invitedTo, _id } = Body;
    const CheckForInvite = await Notification.findOne({ _id: _id }, "invite");

    const user = await User.findOne({ _id: invitedTo }, "name");
    if (!user) {
      return response.json({ message: "User Not Found" }, { status: 404 });
    }

    //check if the user already exist in the added members

    const isUserAlreadyAdded: boolean = getBoard.AddedMember.some(
      (member: any) => member.MemberId.toString() === user._id.toString()
    );
    if (isUserAlreadyAdded) {
      return response.json(
        { message: " Already Added to the Workspace" },
        { status: 409 }
      );
    }

    const isAdminTryingAddHimself =
      getBoard.UserId.toString() === user._id.toString();

    console.log(isAdminTryingAddHimself);
    if (isAdminTryingAddHimself) {
      return response.json(
        {
          message: "Admin can't be in the same workspace",
        },
        { status: 409 }
      );
    }

    const Member = {
      MemberId: new ObjectId(user?.id),
      MemberName: user?.name,
    };
    getBoard.AddedMember.push(Member);
    await getBoard.save();
    CheckForInvite.invite.status = "accepted";
    CheckForInvite.save();
    return response.json({ message: "Added Successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
