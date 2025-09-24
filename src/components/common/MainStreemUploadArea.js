import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { UploadCloud } from "lucide-react";
// 動画アップロードエリア
export default function MainStreemUploadArea({ onFileChange }) {
    return (_jsxs(_Fragment, { children: [_jsx("label", { htmlFor: "video-upload", className: "cursor-pointer", children: _jsxs("div", { className: "w-24 h-24 flex flex-col items-center justify-center border-2 border-primary text-primary rounded-md", children: [_jsx(UploadCloud, { className: "w-8 h-8" }), _jsx("span", { className: "text-xs mt-2", children: "\u52D5\u753B" })] }) }), _jsx("input", { id: "video-upload", type: "file", accept: "video/*", className: "hidden", onChange: onFileChange })] }));
}
