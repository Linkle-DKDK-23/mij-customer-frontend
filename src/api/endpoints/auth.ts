// src/api/auth.ts
import apiClient from "@/api/axios";
import { LoginForm, Me, LoginIn } from "@/api/types/auth";

/**
 * ログイン
 * @param data ログインフォーム
 * @returns ログイン結果
 */
export const login = (data: LoginForm) => apiClient.post<LoginIn>("/auth/login", data);

/**
 * ユーザー情報取得
 * @returns ユーザー情報
 */
export const me = () => apiClient.get<Me>("/auth/me", { withCredentials: true });

/**
 * ログアウト
 * @returns ログアウト結果
 */
export const logout = () => apiClient.post("/auth/logout");

/**
 * リフレッシュ
 * @returns リフレッシュ結果
 */
export const refresh = async () => {
	const res = await apiClient.post("/auth/refresh");
	return res.data;
}