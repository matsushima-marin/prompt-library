"use server";

// "use server" を付けると、この関数たちはサーバー側で実行される。
// フォームから直接呼べる「Server Actions」という仕組み（Next.jsの機能）。
import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";

// 新しいプロンプトを追加する
export async function addPrompt(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim() || null;

  if (!title || !body) return;

  const supabase = getSupabase();
  await supabase.from("prompts").insert({ title, body, tag });

  // 一覧ページのキャッシュを破棄して最新データを再取得させる
  revalidatePath("/");
}

// プロンプトを削除する
export async function deletePrompt(id: string) {
  const supabase = getSupabase();
  await supabase.from("prompts").delete().eq("id", id);
  revalidatePath("/");
}
