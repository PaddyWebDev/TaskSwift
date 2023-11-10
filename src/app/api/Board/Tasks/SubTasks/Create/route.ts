import Board from "@/Models/Board";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("BoardId");
    const TaskId = url.searchParams.get("TaskId");

    const getBoard = await Board.findOne({ _id: BoardId }, "Tasks");
    if (!getBoard)
      return response.json({ message: "Board Not Found" }, { status: 404 });

    const reqBody = await request.json();
    const { SubTaskName } = reqBody.data;

    const task = getBoard.Tasks.id(TaskId);
    if (!task)
      return response.json({ message: "Task Not Found" }, { status: 404 });

    const CreatedSubTask = { SubTaskName: SubTaskName };
    task.SubTasks.push(CreatedSubTask);
    await getBoard.save();

    return response.json(
      { message: "SubTask Created Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return response.json(
      { message: "Internal Server Error", errorMessage: error.message },
      { status: 500 }
    );
  }
}
