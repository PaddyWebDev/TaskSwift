import Board from "@/Models/Board";
import connect from "@/database/dbConnection";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function DELETE(request: NextRequest) {
  try {
    await connect();
    const url = new URL(request.url);
    const Id: any = url.searchParams.get("Id");
    const TaskId: any = url.searchParams.get("TaskId");
    const BoardId = url.searchParams.get("BoardId");
    
    const findBoard = await Board.findOne({ _id: BoardId }, "Tasks");
    if (!findBoard)
      return response.json({ message: "Board Doesn't Exist" }, { status: 404 });

    // Find the task within the board's Tasks array
    const task = findBoard.Tasks.id(TaskId);

    if (!task) {
      return response.json({ message: "Task not found" }, { status: 404 });
    }

    // Find the subtask within the task's SubTasks array
    const subtaskIndex = task.SubTasks.findIndex(
      (subtask: any) => subtask._id.toString() === Id
    );

    if (subtaskIndex === -1)
      return response.json({ message: "SubTask not found" }, { status: 404 });

    // Remove the subtask from the SubTasks array

    task.SubTasks.splice(subtaskIndex, 1);
    // Save the board to update the subtask deletion
    await findBoard.save();

    // console.log("Subtask deleted successfully");

    return response.json(
      {
        message: "Done",
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
