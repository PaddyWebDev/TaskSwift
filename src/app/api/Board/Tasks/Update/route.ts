import Board from "@/Models/Board";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("BoardId");
    const TaskId = url.searchParams.get("TaskId");

    const UserData = await request.json();

    //get the board
    const getBoard = await Board.findOne({ _id: BoardId }, "Tasks");
    if (!getBoard)
      // return 404 status if the board doesn't exist
      return response.json({ message: "Board Not Found" }, { status: 404 });

    // get the task
    const Task = getBoard.Tasks.id(TaskId);
    if (!Task)
      // return 404 status if the task doesn't exist
      return response.json({ message: "Task Not Found" }, { status: 404 });

    Task.TaskName = UserData.Name; //set the previous task name to new task name

    //save the changes
    await getBoard.save();

    // return the response of task updated with 200 status
    return response.json({ message: "Updated Task" }, { status: 200 });
  } catch (error: any) {
    return response.json(
      { message: "Internal Server Error", errorMessage: error.message },
      { status: 500 }
    );
  }
}
