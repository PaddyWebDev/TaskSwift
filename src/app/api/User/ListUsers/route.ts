import User from "@/Models/User";
import { NextRequest, NextResponse } from "next/server";

const response = NextResponse;
export async function GET(request: NextRequest) {
  try {
    const Name: any = new URL(request.url).searchParams.get("Name");
    const GetUser = await User.find(
      {
        name: { $regex: new RegExp(Name, "i") },
      },
      "name _id"
    );
    if (!GetUser) return response.json({ message: "Nothing found" });

    return response.json({ data: GetUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return response.json({ message: "Internal Server Error" });
  }
}
