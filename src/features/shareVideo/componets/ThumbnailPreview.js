import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// サムネイル表示 + 削除ボタン
export default function ThumbnailPreview({ thumbnail, onRemove, onChange, }) {
    return (_jsxs("div", { className: "flex items-start justify-between gap-x-4 w-full", children: [_jsxs("div", { className: "w-24 h-24 flex flex-col items-center justify-center border-2 rounded-md", children: [_jsx("img", { src: thumbnail, alt: "thumbnail", className: "w-full h-full object-cover rounded-md cursor-pointer", onClick: () => document.getElementById("custom-thumbnail-upload")?.click() }), _jsx(Input, { id: "custom-thumbnail-upload", type: "file", accept: "image/*", className: "hidden", onChange: onChange })] }), _jsx(Button, { className: "text-xs self-start", variant: "destructive", onClick: onRemove, children: "\u52D5\u753B\u3092\u524A\u9664" })] }));
}
