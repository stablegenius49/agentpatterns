import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const playbooks = await prisma.playbook.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 12,
    include: { tags: { include: { tag: true } } },
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <div>
            <div className="text-xl font-semibold tracking-tight">AgentPatterns</div>
            <div className="text-sm text-zinc-600">Copy. Run. Iterate.</div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link className="text-zinc-700 hover:text-zinc-950" href="/playbooks">
              Playbooks
            </Link>
            <Link className="text-zinc-700 hover:text-zinc-950" href="/admin">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Engineering-grade playbooks for AI agents
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-700">
          Not a prompt dump. Each playbook has inputs, steps, output contract, and
          failure modes.
        </p>

        <div className="mt-10 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Latest</h2>
          <Link className="text-sm text-zinc-700 hover:text-zinc-950" href="/playbooks">
            Browse all →
          </Link>
        </div>

        {playbooks.length === 0 ? (
          <div className="mt-6 rounded-xl border bg-white p-6 text-zinc-700">
            No published playbooks yet.
          </div>
        ) : (
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
        )}
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-zinc-600">
          AgentPatterns — built for real workflows.
        </div>
      </footer>
    </div>
  );
}
