import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "game.json");

const ensureFile = () => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({ players: [], gameState: "idle" }));
};

export const GET = () => {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
};

export const POST = async (req) => {
  ensureFile();
  const body = await req.json();
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
  return NextResponse.json({ ok: true });
};
