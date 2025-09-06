import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/common';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/auth/login?error=' + encodeURIComponent(error.message));
          return;
        }

        if (data.session) {
          // 認証成功 - トップページにリダイレクト
          navigate('/top');
        } else {
          // セッションがない場合はログインページにリダイレクト
          navigate('/auth/login');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        navigate('/auth/login?error=' + encodeURIComponent('認証処理中にエラーが発生しました'));
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="lg" message="認証処理中..." />
      </div>
    </div>
  );
}