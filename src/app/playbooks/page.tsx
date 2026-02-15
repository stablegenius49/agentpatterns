import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PlaybooksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const tag = (sp.tag ?? "").trim();

  const [playbooks, tags] = await Promise.all([
    prisma.playbook.findMany({
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
      take: 100,
      include: { tags: { include: { tag: true } } },
    }),
    prisma.tag.findMany({ orderBy: { name: "asc" }, take: 200 }),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            AgentPatterns
          </Link>
          <Link className="text-sm text-zinc-700 hover:text-zinc-950" href="/admin">
            Admin
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Playbooks</h1>

        <form className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search titles, problems, steps…"
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
          />
          <select
            name="tag"
            defaultValue={tag}
            className="w-full rounded-lg border bg-white px-3 py-2 text-sm sm:w-64"
          >
            <option value="">All tags</option>
            {tags.map((t: any) => (
              <option key={t.id} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
          <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
            Filter
          </button>
        </form>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {playbooks.map((p: any) => (
            <Link
              key={p.id}
              href={`/p/${p.slug}`}
              className="rounded-xl border bg-white p-5 hover:border-zinc-300"
            >
              <div className="text-base font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-zinc-700 line-clamp-2">
                {p.problem}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((t: any) => (
                  <span
                    key={t.tagId}
                    className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700"
                  >
                    {t.tag.slug}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {playbooks.length === 0 ? (
          <div className="mt-6 rounded-xl border bg-white p-6 text-zinc-700">
            No matches.
          </div>
        ) : null}
      </main>
    </div>
  );
}
