import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';

interface SignUpForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  accountType: 'fan' | 'creator';
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

export default function SingUp() {
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    accountType: 'fan',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAccountTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      accountType: value as 'fan' | 'creator'
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }
    
    if (!formData.agreeToTerms || !formData.agreeToPrivacy) {
      alert('利用規約とプライバシーポリシーに同意してください');
      return;
    }
    
    console.log('Sign up form submitted:', formData);
  };

  const handleTwitterSignUp = () => {
    console.log('Twitter sign up clicked');
  };

  const isFormValid = formData.email && formData.username && formData.password && 
                     formData.confirmPassword && formData.agreeToTerms && formData.agreeToPrivacy;

  return (
    <AuthLayout title="新規登録">
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
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
              ユーザー名
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="ユーザー名を入力"
              value={formData.username}
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
                placeholder="パスワードを入力"
                value={formData.password}
                onChange={handleInputChange}
                className="pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
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
              パスワード確認
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
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              アカウントタイプ
            </Label>
            <RadioGroup
              value={formData.accountType}
              onValueChange={handleAccountTypeChange}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fan" id="fan" />
                <Label htmlFor="fan" className="text-sm">ファン</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creator" id="creator" />
                <Label htmlFor="creator" className="text-sm">クリエイター</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                <a href="#" className="text-primary hover:text-primary/80">
                  利用規約
                </a>
                に同意します
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="privacy"
                name="agreeToPrivacy"
                checked={formData.agreeToPrivacy}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="privacy" className="text-sm text-gray-700">
                <a href="#" className="text-primary hover:text-primary/80">
                  プライバシーポリシー
                </a>
                に同意します
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300"
          >
            アカウントを作成
          </Button>
        </form>

        <div className="text-center">
          <span className="text-gray-500">or</span>
        </div>

        <Button
          onClick={handleTwitterSignUp}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Twitterで登録
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            すでにアカウントをお持ちですか？{' '}
            <a href="/login" className="text-primary hover:text-primary/80">
              ログイン
            </a>
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}
