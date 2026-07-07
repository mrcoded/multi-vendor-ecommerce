import { appendFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dir = path.join(process.cwd(), ".cursor");
    const file = path.join(dir, "debug-7c8a36.log");
    await mkdir(dir, { recursive: true });
    await appendFile(file, `${JSON.stringify(body)}\n`, "utf8");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
