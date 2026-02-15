import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";

import { CopyButton } from "@/components/CopyButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const playbook = await prisma.playbook.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { tags: { include: { tag: true } } },
  });

  if (!playbook) return notFound();

  const html = marked.parse(playbook.bodyMd);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            AgentPatterns
          </Link>
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
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{playbook.title}</h1>
          <p className="max-w-3xl text-zinc-700">{playbook.problem}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {playbook.tags.map((t: { tagId: string; tag: { slug: string } }) => (
              <Link
                key={t.tagId}
                href={`/playbooks?tag=${encodeURIComponent(t.tag.slug)}`}
                className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 hover:bg-zinc-200"
              >
                {t.tag.slug}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <CopyButton text={playbook.bodyMd} label="Copy playbook" />
        </div>

        <article
          className="prose prose-zinc mt-8 max-w-none rounded-xl border bg-white p-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </div>
  );
}
