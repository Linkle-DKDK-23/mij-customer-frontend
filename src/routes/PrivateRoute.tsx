// src/routes/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user) {
    // 元の遷移先を state に保持
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}