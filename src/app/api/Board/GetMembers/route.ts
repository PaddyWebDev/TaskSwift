import Board from "@/Models/Board";
import User from "@/Models/User";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("BoardId");

    const getBoard = await Board.findOne(
      { _id: BoardId },
      "AddedMember UserId"
    );
    if (!getBoard)
      return response.json({ message: "Board Not Found" }, { status: 404 });

    //get User
    const user = await User.findOne({ _id: getBoard.UserId }, "name");
    if (!user)
      return response.json({ message: "Admin Not Found" }, { status: 404 });

    const Data = {
      Members: getBoard.AddedMember,
      Admin: user,
    };

    return response.json({ data: Data }, { status: 200 });
  } catch (error) {
    return response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
