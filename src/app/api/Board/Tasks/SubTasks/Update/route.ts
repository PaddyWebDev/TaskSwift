import Board from "@/Models/Board";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const BoardId = url.searchParams.get("BoardId");
    const TaskId = url.searchParams.get("TaskId");
    const Id = url.searchParams.get("Id");
    const UserData = await request.json();
    const { Name } = UserData;
    console.log(Name);

    const getBoard = await Board.findOne({ _id: BoardId }, "Tasks");
    if (!getBoard)
      return response.json({ message: "Board Not Found" }, { status: 404 });

    //get the task by id
    const task = getBoard.Tasks.id(TaskId);
    if (!task) {
      return response.json({ message: "Task not found" }, { status: 404 });
    }

    const subTask = task.SubTasks.id(Id);
    subTask.SubTaskName = Name;

    await getBoard.save();

    return response.json({ message: "Updated" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
