"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { addPrompt } from "@/app/actions";

export default function AddPromptForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addPrompt(formData);
        formRef.current?.reset();
        router.refresh(); // サーバーから最新データを再取得してページを更新
      }}
      className="mb-8 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-neutral-900"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="title"
          required
          placeholder="タイトル（例：週次レポート骨子）"
          className="rounded-md border border-black/15 px-3 py-2 text-sm dark:border-white/15 dark:bg-neutral-800"
        />
        <input
          name="tag"
          placeholder="タグ（例：レポート）任意"
          className="rounded-md border border-black/15 px-3 py-2 text-sm dark:border-white/15 dark:bg-neutral-800"
        />
      </div>
      <textarea
        name="body"
        required
        rows={3}
        placeholder="プロンプト/定型文の本文…"
        className="mt-3 w-full rounded-md border border-black/15 px-3 py-2 text-sm dark:border-white/15 dark:bg-neutral-800"
      />
      <button
        type="submit"
        className="mt-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        追加する
      </button>
    </form>
  );
}
