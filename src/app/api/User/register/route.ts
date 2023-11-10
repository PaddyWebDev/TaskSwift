import connect from "@/database/dbConnection";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
const User = require("@/Models/User.ts");
export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    const IfUserExist = await User.findOne({ email: email });
    if (IfUserExist) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      return NextResponse.json(
        {
          message: "Registration Success",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Failed to create a User",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        Error: error.message,
      },
      { status: 500 }
    );
  }
}
