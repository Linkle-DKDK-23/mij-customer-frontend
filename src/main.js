import { jsx as _jsx } from "react/jsx-runtime";
// src/main.tsx（置き換え）
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@/routes/AppRouter";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/index.css";
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(AppRouter, {}) }) }) }));
