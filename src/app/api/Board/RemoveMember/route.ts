import Board from "@/Models/Board";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("BoardId");
    const MemberId = url.searchParams.get("MemberId");
    
    const getBoard = await Board.findOneAndUpdate(
      { _id: BoardId },
      { $pull: { AddedMember: { MemberId } } },
      { new: true }
    );
    if (!getBoard) {
      return response.json({ message: "Board Not Found" }, { status: 404 });
    }

    return response.json({ message: "Member Removed" }, { status: 200 });
  } catch (error) {
    return response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
