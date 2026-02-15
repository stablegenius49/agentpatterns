import { headers } from "next/headers";

export async function assertAdmin() {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) throw new Error("Missing ADMIN_KEY env var");

  const h = await headers();
  const provided = h.get("x-admin-key");
  if (provided !== adminKey) {
    const err = new Error("Unauthorized");
    // @ts-expect-error annotate
    err.status = 401;
    throw err;
  }
}
