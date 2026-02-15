import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

const PlaybookUpdateSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  problem: z.string().min(1).optional(),
  bodyMd: z.string().min(1).optional(),
  inputsJson: z.unknown().nullable().optional(),
  outputContractMd: z.string().nullable().optional(),
  failureModesMd: z.string().nullable().optional(),
  testedWithJson: z.unknown().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  tags: z.array(z.string().min(1)).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await assertAdmin();
    const { id } = await params;
    const body = await req.json();
    const data = PlaybookUpdateSchema.parse(body);

    const existing = await prisma.playbook.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const nextStatus = data.status ?? existing.status;
    const publishedAt =
      existing.publishedAt ?? (nextStatus === "PUBLISHED" ? new Date() : null);

    const updateData: any = {};
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.problem !== undefined) updateData.problem = data.problem;
    if (data.bodyMd !== undefined) updateData.bodyMd = data.bodyMd;
    if (Object.prototype.hasOwnProperty.call(data, "inputsJson")) {
      updateData.inputsJson = data.inputsJson ?? null;
    }
    if (Object.prototype.hasOwnProperty.call(data, "outputContractMd")) {
      updateData.outputContractMd = data.outputContractMd ?? null;
    }
    if (Object.prototype.hasOwnProperty.call(data, "failureModesMd")) {
      updateData.failureModesMd = data.failureModesMd ?? null;
    }
    if (Object.prototype.hasOwnProperty.call(data, "testedWithJson")) {
      updateData.testedWithJson = data.testedWithJson ?? null;
    }
    if (data.status !== undefined) {
      updateData.status = data.status;
      updateData.publishedAt = publishedAt;
    }

    if (data.tags !== undefined) {
      updateData.tags = {
        deleteMany: {},
        create: data.tags.map((tagSlug) => ({
          tag: {
            connectOrCreate: {
              where: { slug: tagSlug },
              create: { slug: tagSlug, name: tagSlug },
            },
          },
        })),
      };
    }

    const playbook = await prisma.playbook.update({
      where: { id },
      data: updateData,
      include: { tags: { include: { tag: true } } },
    });

    return NextResponse.json({ playbook });
  } catch (err: any) {
    const status = err?.status ?? 400;
    return NextResponse.json(
      { error: err?.message ?? "Bad Request" },
      { status }
    );
  }
}
