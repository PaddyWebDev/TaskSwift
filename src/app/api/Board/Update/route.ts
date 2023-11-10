import Board from "@/Models/Board";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("BoardId");
    const UserData = await request.json();
    const { Name } = UserData;
    const getBoard = await Board.findOne({ _id: BoardId }, "BoardName");
    if (!getBoard)
      return response.json({ message: "Board Not found" }, { status: 404 });

    //set the previous name to new name
    getBoard.BoardName = Name;

    //save the board
    await getBoard.save();

    return response.json({ message: "Updated Successfully" }, { status: 200 });
  } catch (error: any) {
    return response.json(
      {
        message: "Internal Server Error",
        errorMessage: error.message,
      },
      { status: 500 }
    );
  }
}
