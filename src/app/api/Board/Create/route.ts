import Board from "@/Models/Board";
import User from "@/Models/User";
import connect from "@/database/dbConnection";
import { DummyData } from "@/helpers/DummyData";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
const Reponse = NextResponse;
export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { id } = reqBody.User;
    const { BoardName, Tasks } = DummyData;
    const BoardData = new Board({
      BoardName,
      Tasks,
      UserId: new ObjectId(id),
    });
    const NewBoard = await BoardData.save();
    console.log(NewBoard);
    return Reponse.json({ message: "Board Created" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return Reponse.json(
      { message: "Internal Server Error", desc: error.message },
      { status: 500 }
    );
  }
}
