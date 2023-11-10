import connect from "@/database/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Board from "@/Models/Board";
import { ObjectId } from "mongodb";

const response = NextResponse;
export async function DELETE(request: NextRequest) {
  try {
    await connect();
    const url = new URL(request.url);
    const _id: any = url.searchParams.get("TaskId");
    const Id = url.searchParams.get("BoardId");
    const getBoards = await Board.findOneAndUpdate(
      { _id: Id },
      { $pull: { Tasks: { _id } } }
    );

    if (!getBoards)
      return response.json({ message: "Board doesn't exist" }, { status: 404 });

    return response.json(
      {
        message: "Task Deleted",
      },
      { status: 200 }
    );
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
