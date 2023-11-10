// import { NextRequest, NextResponse } from "next/server";
// const User = require("@/Models/user");

// import { connect } from "@/dbconfig/dbConfig";

// connect();

// export async function GET(request: NextRequest) {
//   try {
//     const userId = await getDataFromToken(request);
//     const UserData = await user.findOne({ _id: userId }).select("-password");
//     return NextResponse.json({
//       data: UserData,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
