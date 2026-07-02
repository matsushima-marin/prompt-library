-- ============================================================
-- Supabase の SQL Editor にこの内容を貼り付けて実行してください
-- （ダッシュボード左メニュー → SQL Editor → New query → 貼り付け → Run）
-- ============================================================

-- 1) プロンプト/テンプレートを保存するテーブル
create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  tag text,
  created_at timestamptz not null default now()
);

-- 2) RLS（Row Level Security / 行レベルの安全装置）を有効化
--    Supabaseでは公開テーブルにRLSをかけるのが基本。
--    これを有効にすると、ポリシーで許可した操作だけが通る。
alter table public.prompts enable row level security;

-- 3) 今回は「ログインなし」の学習アプリなので、
--    匿名ユーザー(anon)に読み書きを許可するポリシーを作る。
--    ※本番で個人データを扱うなら、ここを「自分の行だけ」に絞る。
create policy "anon can read"   on public.prompts for select using (true);
create policy "anon can insert" on public.prompts for insert with check (true);
create policy "anon can delete" on public.prompts for delete using (true);

-- 動作確認用のサンプルデータ（任意。不要なら消してOK）
insert into public.prompts (title, body, tag) values
  ('週次レポート骨子', '以下の活動を「成果・課題・次アクション」の3部構成で整理してください。\n\n[ここに箇条書きを貼る]', 'レポート'),
  ('議事録を3行要約', '次の会議録を、決定事項・宿題・期日に分けて3行で要約してください。\n\n[ここに会議録を貼る]', '要約');
