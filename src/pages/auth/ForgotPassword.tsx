import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import AccountHeader from '@/features/account/component/AccountHeader';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/components/common';

import { resetPassword } from '@/api/endpoints/supabaseAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);
    setError(null);

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError('パスワードリセットメールの送信に失敗しました。しばらく時間をおいて再試行してください。');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white">
        <AccountHeader title="パスワードリセット" showBackButton />
        <AuthLayout>
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                リセットメールを送信しました
              </h2>
              <p className="text-sm text-gray-600">
                {email}にパスワードリセット用のメールを送信しました。
                <br />
                メールに記載されたリンクをクリックして、新しいパスワードを設定してください。
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => setSuccess(false)}
                variant="outline"
                className="w-full"
              >
                別のメールアドレスで再送信
              </Button>
              <Button
                onClick={() => navigate('/auth/login')}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                ログインページに戻る
              </Button>
            </div>
          </div>
        </AuthLayout>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <AccountHeader title="パスワードリセット" showBackButton />
      <AuthLayout>
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              パスワードを忘れた方
            </h2>
            <p className="text-sm text-gray-600">
              登録したメールアドレスを入力してください。
              <br />
              パスワードリセット用のリンクをお送りします。
            </p>
          </div>

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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="mt-1"
                required
                disabled={submitting}
              />
            </div>

            <Button
              type="submit"
              disabled={submitting || !email}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              {submitting ? '送信中…' : 'リセットメールを送信'}
            </Button>
          </form>

          <div className="text-center border-t border-gray-200 pt-4">
            <Button
              onClick={() => navigate('/auth/login')}
              disabled={submitting}
              variant="ghost"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              ログインページに戻る
            </Button>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
}