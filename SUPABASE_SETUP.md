# Supabase Authentication Setup Guide

## 概要
このプロジェクトにSupabase Authenticationを統合しました。以下の手順でSupabaseプロジェクトをセットアップしてください。

## 1. Supabaseプロジェクトの作成

1. [Supabase Dashboard](https://app.supabase.com)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクト名、データベースパスワードを設定

## 2. 環境変数の設定

`.env`ファイルを更新してください：

```bash
# Supabase設定
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

これらの値は、Supabase Dashboard > Settings > API から取得できます。

## 3. 認証プロバイダーの設定

### Twitter/X OAuth設定
1. Supabase Dashboard > Authentication > Providers
2. Twitter/X を有効化
3. Twitter Developer Portalで作成したアプリのクライアントIDとシークレットを設定
4. Callback URL: `https://your-project-url.supabase.co/auth/v1/callback`

### Google OAuth設定
1. Google Cloud Consoleでプロジェクトを作成
2. OAuth 2.0認証情報を作成
3. Supabase Dashboard > Authentication > Providers で Google を有効化
4. クライアントIDとシークレットを設定

## 4. メール認証設定

1. Supabase Dashboard > Authentication > Settings
2. User signups を `Only email confirmations` に設定
3. メールテンプレートをカスタマイズ（オプション）

## 5. URL設定

### Site URL
本番環境のURL（例：`https://yourdomain.com`）を設定

### Redirect URLs
以下のURLを許可リストに追加：
- `http://localhost:5174/auth/callback` (開発環境)
- `https://yourdomain.com/auth/callback` (本番環境)
- `http://localhost:5174/auth/reset-password` (開発環境)
- `https://yourdomain.com/auth/reset-password` (本番環境)

## 6. 実装されている機能

### 認証機能
- ✅ メール/パスワード登録・ログイン
- ✅ パスワードリセット機能
- ✅ メール認証
- ✅ Twitter/X OAuth ログイン
- ✅ Google OAuth ログイン（設定後）

### ページ
- `/auth/login` - ログイン
- `/auth/signup` - 新規登録
- `/auth/forgot-password` - パスワードリセット
- `/auth/reset-password` - 新しいパスワード設定
- `/auth/callback` - OAuth コールバック

### 認証状態管理
`useAuth()` フックを使用して認証状態を取得：

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, session, loading, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;
  
  return <div>Hello, {user.email}!</div>;
}
```

### 保護されたルート
`withAuth` HOCまたは直接認証チェック：

```typescript
import { withAuth } from '@/contexts/AuthContext';

const ProtectedComponent = withAuth(MyComponent);
```

## 7. 移行手順

1. 現在の認証システムとSupabase認証を併用可能
2. 既存ユーザーのマイグレーション計画を実施
3. 段階的にSupabase認証に移行

## 8. セキュリティ設定

### Row Level Security (RLS)
データベーステーブルにRLSポリシーを設定：

```sql
-- 例：posts テーブル
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own posts" ON posts
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own posts" ON posts
FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 9. トラブルシューティング

### よくある問題
1. **環境変数が読み込まれない**
   - `.env`ファイルが正しい場所にあるか確認
   - サーバーを再起動

2. **OAuth認証に失敗する**
   - Redirect URLが正しく設定されているか確認
   - プロバイダーの設定を再確認

3. **メール認証が届かない**
   - スパムフォルダを確認
   - メール設定を確認

## 10. 既存システムとの統合

現在の`/login`と`/signup`ルートは維持されており、新しいSupabase認証は`/auth/*`で利用できます。段階的な移行が可能です。

## 次のステップ

1. Supabaseプロジェクトをセットアップ
2. 環境変数を設定
3. 認証プロバイダーを設定
4. テスト環境で動作確認
5. 既存システムからの段階的移行