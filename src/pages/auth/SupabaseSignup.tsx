import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail } from 'lucide-react';
import AuthLayout from '@/feateure/auth/AuthLayout';
import AccountHeader from '@/feateure/account/component/AccountHeader';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/components/common';

import { signUpWithEmail } from '@/api/endpoints/supabaseAuth';

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SupabaseSignup() {
  const [formData, setFormData] = useState<SignupForm>({ 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // エラーをクリア
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません');
      return false;
    }
    if (formData.password.length < 6) {
      setError('パスワードは6文字以上で入力してください');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    setError(null);

    try {
      const { error } = await signUpWithEmail(formData.email, formData.password);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError('アカウント作成に失敗しました。しばらく時間をおいて再試行してください。');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white">
        <AccountHeader title="新規登録" showBackButton />
        <AuthLayout>
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                確認メールを送信しました
              </h2>
              <p className="text-sm text-gray-600">
                {formData.email}に確認メールを送信しました。
                <br />
                メールに記載されたリンクをクリックして、アカウントを有効化してください。
              </p>
            </div>
            <Button
              onClick={() => navigate('/auth/login')}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              ログインページに戻る
            </Button>
          </div>
        </AuthLayout>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <AccountHeader title="新規登録" showBackButton />
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
                placeholder="例：example@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                パスワード（6文字以上）
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="パスワードを入力"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pr-10"
                  required
                  disabled={submitting}
                  minLength={6}
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

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                パスワード（確認）
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="パスワードを再入力"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pr-10"
                  required
                  disabled={submitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                  disabled={submitting}
                >
                  {showConfirmPassword ? (
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
              {submitting ? '送信中…' : 'アカウントを作成'}
            </Button>
          </form>

          <div className="text-center border-t border-gray-200 pt-4 space-y-2">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちですか？
            </p>
            <Button
              onClick={() => navigate('/auth/login')}
              disabled={submitting}
              variant="outline"
              className="w-full"
            >
              ログイン
            </Button>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}