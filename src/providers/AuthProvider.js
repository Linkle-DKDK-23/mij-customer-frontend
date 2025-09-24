import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AuthCtx } from "@/providers/AuthContext";
import { me as meApi } from "@/api/endpoints/auth";
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const reload = async () => {
        try {
            const me = await meApi();
            setUser(me.data);
            // アクセス成功時にローカルストレージに最終アクセス時刻を保存
            localStorage.setItem('lastAccessTime', Date.now().toString());
        }
        catch (error) {
            console.error('Auth reload error:', error);
            // 401エラーまたは48時間期限切れエラーをハンドル
            if (error?.response?.status === 401) {
                setUser(null);
                localStorage.removeItem('lastAccessTime');
                // セッション期限切れの場合はログイン画面にリダイレクト
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
            else {
                setUser(null);
            }
        }
        finally {
            setLoading(false);
        }
    };
    // 48時間チェック（クライアントサイド）
    const checkInactivity = () => {
        const lastAccessTime = localStorage.getItem('lastAccessTime');
        if (lastAccessTime) {
            const now = Date.now();
            const timeDiff = now - parseInt(lastAccessTime);
            const hoursSinceLastAccess = timeDiff / (1000 * 60 * 60);
            if (hoursSinceLastAccess > 48) {
                // 48時間経過している場合、ユーザーをログアウトしてログイン画面に遷移
                setUser(null);
                localStorage.removeItem('lastAccessTime');
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return true;
            }
        }
        return false;
    };
    // 初期ロード
    useEffect(() => {
        let timeout = setTimeout(() => {
            // フェイルセーフ：何かあってもローディングを落とす
            setLoading(false);
        }, 5000);
        // まずクライアントサイドで48時間チェック
        if (!checkInactivity()) {
            // 期限切れでない場合のみサーバーに問い合わせ
            reload().finally(() => clearTimeout(timeout));
        }
        else {
            setLoading(false);
            clearTimeout(timeout);
        }
        return () => clearTimeout(timeout);
    }, []);
    // 定期的な非アクティブチェック（10分間隔）
    useEffect(() => {
        const interval = setInterval(() => {
            checkInactivity();
        }, 10 * 60 * 1000); // 10分間隔
        return () => clearInterval(interval);
    }, []);
    const value = { user, loading, reload, setUser };
    return _jsx(AuthCtx.Provider, { value: value, children: children });
}
