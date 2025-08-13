import React from "react";
import { User, AuthContextValue } from "@/api/types/auth";

export const AuthCtx = React.createContext<AuthContextValue>({
  user: null,
  loading: true,
  reload: async () => {},
  setUser: () => {},
});


export const useAuth = () => React.useContext(AuthCtx);
