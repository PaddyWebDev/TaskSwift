import Board from "@/Models/Board";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("BoardId");

    const reqBody = await request.json();
    const { TaskName } = reqBody.data;
    const CreatedTask = { TaskName: TaskName, SubTasks: [] };

    const getBoard = await Board.findOne({ _id: BoardId }, "Tasks");
    if (!getBoard)
      return response.json({ message: "Board Not Found" }, { status: 404 });

    getBoard.Tasks.push(CreatedTask);
    await getBoard.save();

    return response.json({ message: "Added Successfully" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return response.json(
      { message: "Internal Server Error", errorMessage: error.message },
      { status: 500 }
    );
  }
}
