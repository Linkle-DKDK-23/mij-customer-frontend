import { supabase } from '@/lib/supabase';
/**
 * Supabaseでユーザー登録
 */
export const signUpWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    return { data, error };
};
/**
 * Supabaseでログイン
 */
export const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    return { data, error };
};
/**
 * Supabaseでログアウト
 */
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};
/**
 * パスワードリセットメール送信
 */
export const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
    });
    return { error };
};
/**
 * 新しいパスワードで更新
 */
export const updatePassword = async (password) => {
    const { data, error } = await supabase.auth.updateUser({
        password
    });
    return { data, error };
};
/**
 * ソーシャルログイン（Twitter/X）
 */
export const signInWithTwitter = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
    });
    return { error };
};
/**
 * ソーシャルログイン（Google）
 */
export const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
    });
    return { error };
};
/**
 * メール認証の再送信
 */
export const resendConfirmation = async (email) => {
    const { error } = await supabase.auth.resend({
        type: 'signup',
        email
    });
    return { error };
};
