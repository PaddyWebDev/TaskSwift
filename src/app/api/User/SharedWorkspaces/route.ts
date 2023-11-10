import Board from "@/Models/Board";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const MemberId = url.searchParams.get("UserId");
    const collaborativeBoards = await Board.find(
      {
        "AddedMember.MemberId": MemberId,
      },
      "BoardName"
    );
    if (!collaborativeBoards)
      return response.json(
        { message: "You Haven't been added into any group" },
        { status: 404 }
      );
    return response.json({ message: collaborativeBoards }, { status: 200 });
  } catch (error) {
    return response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
