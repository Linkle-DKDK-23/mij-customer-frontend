import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/feateure/auth/AuthLayout';
import AccountHeader from '@/feateure/account/component/AccountHeader';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/components/common';

import { signInWithEmail, signInWithTwitter } from '@/api/endpoints/supabaseAuth';

interface LoginForm {
  email: string;
  password: string;
}

export default function SupabaseLogin() {
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // エラーをクリア
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);
    setError(null);

    try {
      const { error } = await signInWithEmail(formData.email, formData.password);
      
      if (error) {
        setError(error.message);
      } else {
        // ログイン成功時、トップページに遷移
        navigate('/top');
      }
    } catch (err: any) {
      setError('ログインに失敗しました。しばらく時間をおいて再試行してください。');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTwitterLogin = async () => {
    try {
      const { error } = await signInWithTwitter();
      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError('Twitterログインに失敗しました。');
    }
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgot-password');
  };

  return (
    <div className="bg-white">
      <AccountHeader title="ログイン" showBackButton />
      <AuthLayout>
        <div className="space-y-6">
          {error && (
            <ErrorMessage 
              message={error} 
              variant="error" 
              onClose={() => setError(null)}
            />
          )}

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
                disabled={submitting}
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
                  disabled={submitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                  disabled={submitting}
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
            disabled={submitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Xでログイン
          </Button>

          <div className="text-center space-y-2">
            <button 
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80"
            >
              パスワードを忘れた方はこちら
            </button>
          </div>

          <div className="text-center border-t border-gray-200 pt-4 space-y-2">
            <Button
              onClick={() => navigate('/auth/signup')}
              disabled={submitting}
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