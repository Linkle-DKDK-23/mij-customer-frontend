import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { AuthCtx } from "@/providers/AuthContext";
import { AuthContextValue, User } from "@/api/types/auth";
import { me as meApi } from "@/api/endpoints/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      const me = await meApi();
      setUser(me.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 初期ロード
  useEffect(() => {
    let timeout = setTimeout(() => {
      // フェイルセーフ：何かあってもローディングを落とす
      setLoading(false);
    }, 5000);
    reload().finally(() => clearTimeout(timeout));
    return () => clearTimeout(timeout);
  }, []);

  const value: AuthContextValue = { user, loading, reload, setUser };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
