import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await assertAdmin();
    const playbooks = await prisma.playbook.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 200,
      include: { tags: { include: { tag: true } } },
    });
    return NextResponse.json({ playbooks });
  } catch (err: any) {
    const status = err?.status ?? 400;
    return NextResponse.json(
      { error: err?.message ?? "Bad Request" },
      { status }
    );
  }
}
