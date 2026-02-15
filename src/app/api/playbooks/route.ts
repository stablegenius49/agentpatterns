import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

const PlaybookCreateSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  problem: z.string().min(1),
  bodyMd: z.string().min(1),
  inputsJson: z.unknown().optional(),
  outputContractMd: z.string().optional(),
  failureModesMd: z.string().optional(),
  testedWithJson: z.unknown().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  tags: z.array(z.string().min(1)).optional(), // tag slugs
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  const tag = (searchParams.get("tag") ?? "").trim();

  const playbooks = await prisma.playbook.findMany({
    where: {
      status: "PUBLISHED",
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { problem: { contains: q, mode: "insensitive" } },
              { bodyMd: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(tag
        ? {
            tags: {
              some: {
                tag: { slug: tag },
              },
            },
          }
        : {}),
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 50,
    include: {
      tags: { include: { tag: true } },
    },
  });

  return NextResponse.json({ playbooks });
}

export async function POST(req: Request) {
  try {
    await assertAdmin();
    const body = await req.json();
    const data = PlaybookCreateSchema.parse(body);

    const publishedAt = data.status === "PUBLISHED" ? new Date() : null;

    const createData: any = {
      slug: data.slug,
      title: data.title,
      problem: data.problem,
      bodyMd: data.bodyMd,
      status: data.status ?? "DRAFT",
      publishedAt,
      tags: {
        create: (data.tags ?? []).map((tagSlug) => ({
          tag: {
            connectOrCreate: {
              where: { slug: tagSlug },
              create: { slug: tagSlug, name: tagSlug },
            },
          },
        })),
      },
    };
    if (data.inputsJson !== undefined) createData.inputsJson = data.inputsJson;
    if (data.outputContractMd !== undefined) createData.outputContractMd = data.outputContractMd;
    if (data.failureModesMd !== undefined) createData.failureModesMd = data.failureModesMd;
    if (data.testedWithJson !== undefined) createData.testedWithJson = data.testedWithJson;

    const playbook = await prisma.playbook.create({
      data: createData,
      include: { tags: { include: { tag: true } } },
    });

    return NextResponse.json({ playbook }, { status: 201 });
  } catch (err: any) {
    const status = err?.status ?? 400;
    return NextResponse.json(
      { error: err?.message ?? "Bad Request" },
      { status }
    );
  }
}
