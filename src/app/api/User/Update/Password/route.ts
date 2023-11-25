import User from "@/Models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

const { json } = NextResponse;

interface UserData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export async function PATCH(request: NextRequest) {
  try {
    const UserId = new URL(request.url).searchParams.get("UserId");
    const GetUser = await User.findOne({ _id: UserId }, "password");
    if (!GetUser)
      return json({ message: "User Doesn't Exist" }, { status: 404 });

    const { oldPassword, newPassword, confirmPassword }: UserData =
      await request.json();

    const verifyPassword: boolean = await bcryptjs.compare(
      oldPassword,
      GetUser.password
    );
    if (!verifyPassword) {
      return json({ message: "Password Doesn't Match" }, { status: 400 });
    }

    if (newPassword.match(confirmPassword)) {
      const salt: string = await bcryptjs.genSalt(10);
      const HashedPassword: string = await bcryptjs.hash(newPassword, salt);

      GetUser.password = HashedPassword;

      await GetUser.save();
      return json({ message: "Updated Successfully" }, { status: 200 });
    }
    return json({ message: "Invalid Password Confirmation" }, { status: 422 });
  } catch (error: any) {
    return json(
      { message: "Internal Server Error", ErrorMessage: error.message },
      { status: 500 }
    );
  }
}
