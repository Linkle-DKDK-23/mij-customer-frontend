import React from "react";
import { isUser, isCreator, isAdmin } from "@/utils/userRole";

export type User = { id: string; email: string; role: number } | null;
export type AuthContextValue = {
  user: User;
  loading: boolean;
  reload: () => Promise<void>;
  setUser: (u: User) => void;
  isUser: () => boolean;
  isCreator: () => boolean;
  isAdmin: () => boolean;
};

export const AuthCtx = React.createContext<AuthContextValue>({
  user: null,
  loading: true,
  reload: async () => {},
  setUser: () => {},
  isUser: () => false,
  isCreator: () => false,
  isAdmin: () => false,
});


export const useAuth = () => React.useContext(AuthCtx);
