import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, onAuthStateChange } from '@/lib/supabase';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // 現在のセッションを取得
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };
        getSession();
        // 認証状態の変更を監視
        const { data: { subscription } } = onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
            // セッション変更時の処理
            if (event === 'SIGNED_IN') {
                console.log('User signed in:', session?.user?.email);
            }
            else if (event === 'SIGNED_OUT') {
                console.log('User signed out');
            }
        });
        return () => subscription?.unsubscribe();
    }, []);
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        }
    };
    return (_jsx(AuthContext.Provider, { value: { user, session, loading, signOut }, children: children }));
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
// 認証が必要なコンポーネントをラップするHOC
export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const { user, loading } = useAuth();
        if (loading) {
            return _jsx("div", { className: "flex items-center justify-center min-h-screen", children: "Loading..." });
        }
        if (!user) {
            // 未認証の場合、ログインページにリダイレクト
            window.location.href = '/login';
            return null;
        }
        return _jsx(Component, { ...props });
    };
}
