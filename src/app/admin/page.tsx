"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Playbook = {
  id: string;
  slug: string;
  title: string;
  problem: string;
  bodyMd: string;
  status: "DRAFT" | "PUBLISHED";
  tags: { tag: { slug: string } }[];
};

const TEMPLATE = `## When to use\n\n## Inputs required\n\n## Steps\n\n## Output contract\n\n## Failure modes + fixes\n\n## Tested with\n\n## Minimal example\n`;

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => playbooks.find((p) => p.id === selectedId) ?? null,
    [playbooks, selectedId]
  );

  useEffect(() => {
    const k = localStorage.getItem("agentpatterns_admin_key") ?? "";
    setAdminKey(k);
    setLoaded(true);
  }, []);

  async function fetchPlaybooks(key = adminKey) {
    const res = await fetch("/api/admin/playbooks", {
      headers: { "x-admin-key": key },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed");
    setPlaybooks(json.playbooks);
  }

  function persistKey(k: string) {
    setAdminKey(k);
    localStorage.setItem("agentpatterns_admin_key", k);
  }

  async function createNew() {
    const baseSlug = `playbook-${Date.now()}`;
    const res = await fetch("/api/playbooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({
        slug: baseSlug,
        title: "New playbook",
        problem: "What problem does this solve?",
        bodyMd: TEMPLATE,
        status: "DRAFT",
        tags: [],
      }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to create");
    await fetchPlaybooks();
    setSelectedId(json.playbook.id);
  }

  async function save(playbook: Playbook, patch: Partial<Playbook> & { tags?: string[] }) {
    const res = await fetch(`/api/playbooks/${playbook.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify(patch),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to save");
    await fetchPlaybooks();
    setSelectedId(json.playbook.id);
  }

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            AgentPatterns
          </Link>
          <Link className="text-sm text-zinc-700 hover:text-zinc-950" href="/playbooks">
            Public site
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-[320px_1fr]">
        <section className="rounded-xl border bg-white p-4">
          <div className="text-sm font-semibold">Admin key</div>
          <input
            value={adminKey}
            onChange={(e) => persistKey(e.target.value)}
            placeholder="ADMIN_KEY"
            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => fetchPlaybooks()}
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white"
            >
              Load
            </button>
            <button
              onClick={createNew}
              className="rounded-lg border bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-50"
            >
              New
            </button>
          </div>

          <div className="mt-6 text-sm font-semibold">Playbooks</div>
          <div className="mt-2 flex flex-col gap-2">
            {playbooks.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`rounded-lg border px-3 py-2 text-left text-sm hover:bg-zinc-50 ${
                  selectedId === p.id ? "border-zinc-900" : "border-zinc-200"
                }`}
              >
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-zinc-600">{p.status} · /p/{p.slug}</div>
              </button>
            ))}
            {playbooks.length === 0 ? (
              <div className="text-sm text-zinc-600">(none loaded)</div>
            ) : null}
          </div>
        </section>

        <section className="rounded-xl border bg-white p-4">
          {!selected ? (
            <div className="text-sm text-zinc-600">Select a playbook.</div>
          ) : (
            <Editor playbook={selected} onSave={save} />
          )}
        </section>
      </main>
    </div>
  );
}

function Editor({
  playbook,
  onSave,
}: {
  playbook: Playbook;
  onSave: (playbook: Playbook, patch: any) => Promise<void>;
}) {
  const [title, setTitle] = useState(playbook.title);
  const [slug, setSlug] = useState(playbook.slug);
  const [problem, setProblem] = useState(playbook.problem);
  const [bodyMd, setBodyMd] = useState(playbook.bodyMd);
  const [status, setStatus] = useState<Playbook["status"]>(playbook.status);
  const [tags, setTags] = useState(playbook.tags.map((t) => t.tag.slug).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(playbook.title);
    setSlug(playbook.slug);
    setProblem(playbook.problem);
    setBodyMd(playbook.bodyMd);
    setStatus(playbook.status);
    setTags(playbook.tags.map((t) => t.tag.slug).join(", "));
  }, [playbook.id]);

  async function doSave(next?: Partial<Playbook>) {
    setSaving(true);
    setError(null);
    try {
      const tagSlugs = tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      await onSave(playbook, {
        title,
        slug,
        problem,
        bodyMd,
        status,
        tags: tagSlugs,
        ...next,
      });
    } catch (e: any) {
      setError(e.message ?? "Failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Edit playbook</div>
          <div className="text-xs text-zinc-600">ID: {playbook.id}</div>
        </div>
        <div className="flex gap-2">
          <button
            disabled={saving}
            onClick={() => doSave()}
            className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            Save
          </button>
          <button
            disabled={saving}
            onClick={() => {
              setStatus("PUBLISHED");
              setTimeout(() => doSave({ status: "PUBLISHED" }), 0);
            }}
            className="rounded-lg border bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-50 disabled:opacity-60"
          >
            Publish
          </button>
        </div>
      </div>

      {error ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm">{error}</div> : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="text-sm">
          <div className="mb-1 font-medium">Title</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="text-sm">
          <div className="mb-1 font-medium">Slug</div>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </label>
      </div>

      <label className="text-sm">
        <div className="mb-1 font-medium">Problem</div>
        <input
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="text-sm">
        <div className="mb-1 font-medium">Tags (comma-separated slugs)</div>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="text-sm">
        <div className="mb-1 font-medium">Body (Markdown)</div>
        <textarea
          value={bodyMd}
          onChange={(e) => setBodyMd(e.target.value)}
          className="h-[520px] w-full rounded-lg border px-3 py-2 font-mono text-xs"
        />
      </label>

      <label className="text-sm">
        <div className="mb-1 font-medium">Status</div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
        </select>
      </label>

      <div className="text-xs text-zinc-600">
        Tip: keep playbooks structured — inputs, steps, output contract, failure modes.
      </div>
    </div>
  );
}
