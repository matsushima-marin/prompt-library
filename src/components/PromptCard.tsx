"use client";

// "use client" はブラウザ側で動くコンポーネント。
// クリックでクリップボードにコピー、などの操作はここで行う。
import { useState } from "react";
import type { Prompt } from "@/lib/supabase";
import { deletePrompt } from "@/app/actions";

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(prompt.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-neutral-900">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-medium">{prompt.title}</h3>
        <button
          onClick={() => deletePrompt(prompt.id)}
          className="text-xs text-neutral-400 hover:text-red-500"
          aria-label="削除"
        >
          削除
        </button>
      </div>
      <p className="mb-3 whitespace-pre-wrap text-sm text-neutral-600 dark:text-neutral-300">
        {prompt.body}
      </p>
      <div className="flex items-center justify-between">
        {prompt.tag ? (
          <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {prompt.tag}
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={copy}
          className="rounded-md border border-black/10 px-3 py-1 text-xs hover:bg-neutral-50 dark:border-white/15 dark:hover:bg-neutral-800"
        >
          {copied ? "コピーしました" : "コピー"}
        </button>
      </div>
    </div>
  );
}
