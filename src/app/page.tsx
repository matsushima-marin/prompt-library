// このページはサーバー側で動く（Server Component）。
// ページ表示時にSupabaseからデータを取得して、HTMLにして返す。
import { getSupabase, isSupabaseConfigured, type Prompt } from "@/lib/supabase";
import AddPromptForm from "@/components/AddPromptForm";
import PromptCard from "@/components/PromptCard";

// 常に最新データを取りに行く（リクエストごとに描画）
export const dynamic = "force-dynamic";

async function getPrompts(): Promise<Prompt[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = getSupabase();
  const { data } = await supabase
    .from("prompts")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export default async function Home() {
  const prompts = await getPrompts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-semibold">My Prompt Library</h1>
      <p className="mb-8 text-sm text-neutral-500">
        よく使うプロンプト・定型文を保存してワンクリックでコピー
      </p>

      {!isSupabaseConfigured ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
          <p className="font-medium">まだSupabaseに接続していません</p>
          <p className="mt-1">
            このあと <code>.env.local</code> に Supabase の URL とキーを設定すると、
            ここにフォームと一覧が表示されます。
          </p>
        </div>
      ) : (
        <>
          <AddPromptForm />
          {prompts.length === 0 ? (
            <p className="text-sm text-neutral-500">
              まだ登録がありません。上のフォームから最初の1件を追加してみましょう。
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {prompts.map((p) => (
                <PromptCard key={p.id} prompt={p} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
