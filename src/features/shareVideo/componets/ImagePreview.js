import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
export default function ImagePreview({ images, onRemove }) {
    return (_jsx("div", { className: "grid grid-cols-2 gap-4", children: images.map((image, index) => (_jsxs("div", { className: "relative", children: [_jsx("img", { src: URL.createObjectURL(image), alt: `Preview ${index + 1}`, className: "w-full h-32 object-cover rounded-md" }), _jsx("button", { type: "button", className: "absolute top-2 right-2 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center", onClick: () => onRemove(index), children: _jsx(X, { className: "h-4 w-4" }) }), _jsx("div", { className: "absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded", children: image.name })] }, index))) }));
}
