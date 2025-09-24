import React from "react";
export const AuthCtx = React.createContext({
    user: null,
    loading: true,
    reload: async () => { },
    setUser: () => { },
});
export const useAuth = () => React.useContext(AuthCtx);
