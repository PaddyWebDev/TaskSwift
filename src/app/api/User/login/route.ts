import { NextRequest, NextResponse } from "next/server";
import connect from "@/database/dbConnection";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/Models/User";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const UserData = await request.json();
    const { email, password } = UserData;
    const CheckIfUserExist = await User.findOne({ email: email });
    if (!CheckIfUserExist)
      return NextResponse.json({ message: "User Doesn't Exist" }, { status: 404 });

    const CheckPass = await bcryptjs.compare(
      password,
      CheckIfUserExist.password
    );
    if (!CheckPass)
      return NextResponse.json(
        { message: "Passwords Don't Match, Try Again" },
        { status: 401 }
      );

    const tokenData = {
      id: CheckIfUserExist._id,
      name: CheckIfUserExist.name,
      email: CheckIfUserExist.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
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
