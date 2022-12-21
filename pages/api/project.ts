import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieName = process.env.COOKIE_NAME || "";
  const jwt = req.cookies[cookieName] || "";
  const user = await validateJWT(jwt);

  if (!user) {
    res.status(401).json({ data: { message: "unauthorized" } });
  }

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });

  res.json({ data: { message: "ok" } });
}
