import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
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
                }
                else {
                    // セッションがない場合はログインページにリダイレクト
                    navigate('/auth/login');
                }
            }
            catch (error) {
                console.error('Unexpected error in auth callback:', error);
                navigate('/auth/login?error=' + encodeURIComponent('認証処理中にエラーが発生しました'));
            }
        };
        handleAuthCallback();
    }, [navigate]);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsx("div", { className: "text-center", children: _jsx(LoadingSpinner, { size: "lg", message: "\u8A8D\u8A3C\u51E6\u7406\u4E2D..." }) }) }));
}
