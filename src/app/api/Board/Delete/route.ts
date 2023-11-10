import Board from "@/Models/Board";
import connect from "@/database/dbConnection";

import { NextRequest, NextResponse } from "next/server";

const Response = NextResponse;
export async function DELETE(request: NextRequest) {
  try {
    await connect();
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("Id");
    if (!Board.find({ id: BoardId })) {
      return Response.json({ message: "Board Doesn't Exist" }, { status: 404 });
    }
    const result = await Board.findByIdAndDelete(BoardId);
    if (!result)
      return Response.json({ message: "Failed to Delete" }, { status: 409 });

    return Response.json(
      {
        message: "Done",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        message: "Internal Server Error",
        Error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
