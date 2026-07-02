import { createClient } from "@supabase/supabase-js";

// Supabaseの「URL」と「公開APIキー(anon key)」は環境変数から読み込む。
// 値は .env.local（ローカル）と Vercel の環境変数（本番）に入れる。
// NEXT_PUBLIC_ を付けるとブラウザ側にも渡せる公開用キーになる。
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// まだ設定していない段階でもアプリが落ちないようにしておく。
export const isSupabaseConfigured = Boolean(url && anonKey);

export function getSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabaseの環境変数が未設定です（.env.local を確認）");
  }
  return createClient(url!, anonKey!);
}

// 1件のプロンプト/テンプレートの型
export type Prompt = {
  id: string;
  title: string;
  body: string;
  tag: string | null;
  created_at: string;
};
