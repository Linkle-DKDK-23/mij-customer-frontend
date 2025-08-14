import React from "react";

export type User = { id: string; email: string } | null;
export type AuthContextValue = {
  user: User;
  loading: boolean;
  reload: () => Promise<void>;
  setUser: (u: User) => void;
};

export const AuthCtx = React.createContext<AuthContextValue>({
  user: null,
  loading: true,
  reload: async () => {},
  setUser: () => {},
});


export const useAuth = () => React.useContext(AuthCtx);
