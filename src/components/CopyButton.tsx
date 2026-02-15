"use client";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(text)}
      className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50"
    >
      {label}
    </button>
  );
}
