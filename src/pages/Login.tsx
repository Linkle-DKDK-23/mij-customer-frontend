import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
  };

  const handleTwitterLogin = () => {
    console.log('Twitter login clicked');
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email or ID
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter address or ID"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Login
          </Button>
        </form>

        <div className="text-center">
          <span className="text-gray-500">or</span>
        </div>

        <Button
          onClick={handleTwitterLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Login with Twitter
        </Button>

        <div className="text-center space-y-2">
          <a
            href="#"
            className="text-sm text-primary hover:text-primary/80"
          >
            Forgot your password?
          </a>
          <div>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Help
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
