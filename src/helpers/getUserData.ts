import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const cookieStore = cookies();
const token = cookieStore.get("token");
const decodedToken: any = jwt.verify(
  token?.value as string,
  process.env.TOKEN_SECRET!
);

export async function getAll() {
  return decodedToken;
}
