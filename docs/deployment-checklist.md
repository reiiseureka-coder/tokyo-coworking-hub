# Deployment Checklist

このプロジェクトを `GitHub -> Supabase -> Vercel` の順に接続するための手順です。

## 1. GitHub にリポジトリを作る

おすすめのリポジトリ名:

- `tokyo-coworking-hub`

ローカルでは初回コミットまで完了しています。  
GitHub 側で空のリポジトリを作ったら、以下を実行します。

```bash
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## 2. Supabase プロジェクトを作る

1. Supabase で新規プロジェクトを作成
2. SQL Editor を開く
3. [supabase/schema.sql](/Users/reiki/Desktop/アプリ/tokyo-coworking-hub/supabase/schema.sql) を貼り付けて実行

### 取得する値

- `Project URL`
- `anon public key`

これを `.env.local` と Vercel の環境変数に使います。

## 3. Google ログインを有効化する

Supabase Dashboard -> Authentication -> Providers -> Google で設定します。

最低限必要な redirect URL:

- `http://localhost:3000/auth/callback`
- `https://YOUR_VERCEL_DOMAIN/auth/callback`

## 4. ローカル環境変数を設定する

[.env.example](/Users/reiki/Desktop/アプリ/tokyo-coworking-hub/.env.example) をもとに `.env.local` を作ります。

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

起動確認:

```bash
npm run dev
```

## 5. Vercel へデプロイする

1. GitHub リポジトリを Vercel に import
2. Framework Preset は Next.js のままで OK
3. 以下の環境変数を登録

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

`NEXT_PUBLIC_SITE_URL` には Vercel の公開 URL を入れます。

## 6. デプロイ後に確認すること

- トップページが表示される
- 施設一覧と詳細が開ける
- ログインページから Google ログインへ進める
- 法人問い合わせフォームが送信できる
- 口コミ投稿ページが表示される

## 7. 打ち合わせ前に見ると良いポイント

- トップで「何のサービスか」が一瞬で伝わるか
- 一覧で比較軸が見やすいか
- 詳細ページで知りたい情報が足りているか
- 右上の法人導線が自然か
- 口コミ投稿の入力負荷が高すぎないか
