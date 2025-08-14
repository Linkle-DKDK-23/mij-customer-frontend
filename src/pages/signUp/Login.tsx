// src/pages/Login.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AccountHeader from '@/components/account/AccountHeader';
import { useNavigate } from 'react-router-dom';

// ★ 追加：API呼び出しとCSRFセット関数をインポート
import { login as loginApi, me as meApi } from '@/api/endpoints/auth';
import { setCsrfToken } from '@/api/axios'; // ← 先ほど修正した axios クライアントから

import type { LoginForm } from '@/api/types/auth';

export default function Login() {
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      // 1) /auth/login（Cookieにaccess/refresh、bodyでcsrf_token）
      const res = await loginApi(formData);

      console.log('res:', res);

      const csrf = (res.data as any)?.csrf_token ?? null;

      console.log('csrf:', csrf);

      setCsrfToken(csrf); // 2) メモリに保持（非GET時にX-CSRF-Tokenヘッダ自動付与）

      // 3) /auth/me でユーザー情報を取得（Cookieベース）
      await meApi();

      // 4) 成功 → 遷移
      navigate('/top');
    } catch (err: any) {
      alert(err?.response?.data?.detail ?? 'ログイン失敗');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTwitterLogin = () => {
    console.log('Twitter login clicked');
  };

  return (
    <div className="bg-white">
      <AccountHeader title="ログイン" showBackButton />
      <AuthLayout>
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                メールアドレス
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="入力する"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                パスワード
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="入力する"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              {submitting ? '送信中…' : 'ログイン'}
            </Button>
          </form>

          <Button
            onClick={handleTwitterLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Xでログイン
          </Button>

          <div className="text-center space-y-2">
            <a href="#" className="text-sm text-primary hover:text-primary/80">
              パスワードを忘れた方はこちら
            </a>
          </div>

          <div className="text-center border-t border-gray-200 pt-4 space-y-2">
            <Button
              onClick={() => navigate('/signup')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              新規登録
            </Button>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}
