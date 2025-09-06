import { supabase } from '@/lib/supabase'
import type { AuthError } from '@supabase/supabase-js'

export interface AuthResponse {
  data: any
  error: AuthError | null
}

/**
 * Supabaseでユーザー登録
 */
export const signUpWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { data, error }
}

/**
 * Supabaseでログイン
 */
export const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

/**
 * Supabaseでログアウト
 */
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * パスワードリセットメール送信
 */
export const resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`
  })
  return { error }
}

/**
 * 新しいパスワードで更新
 */
export const updatePassword = async (password: string): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.updateUser({
    password
  })
  return { data, error }
}

/**
 * ソーシャルログイン（Twitter/X）
 */
export const signInWithTwitter = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { error }
}

/**
 * ソーシャルログイン（Google）
 */
export const signInWithGoogle = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { error }
}

/**
 * メール認証の再送信
 */
export const resendConfirmation = async (email: string): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email
  })
  return { error }
}