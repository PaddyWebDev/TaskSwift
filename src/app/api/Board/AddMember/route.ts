import Board from "@/Models/Board";
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
      "AddedMember UserId"
    );
    //if board doesn't exist return a response with 404 error
    if (!getBoard) {
      return response.json({ message: "Board doesn't exist" }, { status: 404 });
    }

    const UserData = await request.json();
    const user = await User.findOne({ name: UserData.Name }, "name");
    if (!user) {
      return response.json({ message: "User Not Found" }, { status: 404 });
    }

    //check if the user already exist in the added members

    const isUserAlreadyAdded = getBoard.AddedMember.some(
      (member: any) => member.MemberId.toString() === user._id.toString()
    );

    const isAdminTryingAddHimself =
      getBoard.UserId.toString() === user._id.toString();

    if (isUserAlreadyAdded) {
      return response.json(
        { message: "User is Already Added to the Workspace" },
        { status: 409 }
      );
    } else if (isAdminTryingAddHimself) {
      return response.json(
        {
          message: "Admin can't in the same workspace",
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
    return response.json({ message: "Added Successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
