import Board from "@/Models/Board";
import connect from "@/database/dbConnection";
import { NextRequest, NextResponse } from "next/server";
const Response = NextResponse;
export async function GET(request: NextRequest) {
  try {
    await connect();
    const url = new URL(request.url);
    const id = url.searchParams.get("UserId");
    const Boards = await Board.find({ UserId: id }, "BoardName id");
    if (!Boards)
      return Response.json(
        { message: "You didn't create any" },
        { status: 404 }
      );

    return Response.json(
      {
        BoardData: Boards,
      },
      { status: 200, statusText: "OK" }
    );
  } catch (error: any) {
    console.log(error);
    return Response.json(
      {
        message: "Internal Server Error",
        desc: error.message,
      },
      { status: 500 }
    );
  }
}
