import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { UploadCloud } from "lucide-react";
export default function ImageUploadArea({ onFileChange }) {
    return (_jsxs(_Fragment, { children: [_jsx("label", { htmlFor: "images-upload", className: "cursor-pointer", children: _jsxs("div", { className: "w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-primary text-primary rounded-md hover:bg-primary/5 transition-colors", children: [_jsx(UploadCloud, { className: "w-8 h-8" }), _jsx("span", { className: "text-sm mt-2", children: "\u753B\u50CF\u3092\u9078\u629E" }), _jsx("span", { className: "text-xs text-gray-500 mt-1", children: "\u8907\u6570\u9078\u629E\u53EF\u80FD" })] }) }), _jsx("input", { id: "images-upload", type: "file", accept: "image/*", multiple: true, className: "hidden", onChange: onFileChange })] }));
}
