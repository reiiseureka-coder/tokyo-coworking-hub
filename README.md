# Tokyo Coworking Hub

東京のコワーキングスペースを探す個人向け口コミサイトです。  
MVPでは `東京特化` で始め、`個人利用の探しやすさ` と `法人問い合わせ導線` の両立を目指しています。

今回の実装では、将来の保守性と拡張性を優先して `Next.js + Supabase + Vercel` 前提の構成へ切り替えています。

## 今回の方針

- フロントエンド: Next.js App Router + TypeScript
- データ/認証: Supabase
- ログイン: Google OAuth
- デプロイ: Vercel
- スタイリング: Tailwind CSS

## MVP第1版の範囲

- トップページ
- 施設一覧と絞り込み
- 施設詳細
- 口コミ閲覧
- 口コミ投稿フォーム
- Googleログイン導線
- 法人向けページ
- 法人問い合わせフォーム
- 管理画面の叩き台
- 利用規約 / プライバシーポリシー

## ディレクトリ構成

```text
app/
  page.tsx
  facilities/
    page.tsx
    [slug]/
      page.tsx
      review/page.tsx
  business/
    page.tsx
    contact/page.tsx
  login/page.tsx
  admin/page.tsx
  terms/page.tsx
  privacy/page.tsx
  auth/callback/route.ts

components/
src/
  data/mock-data.ts
  lib/data.ts
  lib/supabase/
  lib/constants.ts
  types/index.ts
supabase/schema.sql
legacy-ai-studio/              # 旧 AI Studio / Vite / Firebase 版の退避先
```

## ローカル起動

1. 依存関係をインストール

```bash
npm install
```

2. `.env.example` を参考に `.env.local` を作成

```bash
cp .env.example .env.local
```

3. 開発サーバーを起動

```bash
npm run dev
```

## Supabase の設定

最低限必要な環境変数は以下です。

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Googleログイン

Supabase Auth の Google Provider を有効にし、以下を設定してください。

- Redirect URL: `http://localhost:3000/auth/callback`
- Vercelデプロイ後は `https://your-domain.vercel.app/auth/callback` も追加

## デモモード

Supabase 未設定でも、画面確認と導線確認ができるように以下の挙動にしています。

- 施設一覧と詳細はモックデータで表示
- ログイン画面は設定案内を表示
- 問い合わせフォームは UI 確認用として動作

環境変数を設定すると、認証や保存処理を本番前提へ寄せられます。

## デプロイ想定

1. GitHub に push
2. Vercel でリポジトリを import
3. 環境変数を設定
4. Supabase に `supabase/schema.sql` を反映
5. Google OAuth の redirect URL を更新

## 今後すぐ着手しやすい項目

- 管理画面からの施設登録
- 口コミ投稿後の平均評価更新
- 施設画像アップロード
- 管理者権限の導入
- 法人問い合わせ一覧の可視化
