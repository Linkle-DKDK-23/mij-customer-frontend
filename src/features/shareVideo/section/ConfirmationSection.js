import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
export default function ConfirmationSection({ checks, onCheckChange, }) {
    return (_jsxs("div", { className: "space-y-4 m-4 p-4 bg-secondary rounded-md", children: [_jsx(CheckRow, { id: "confirm1", checked: checks.confirm1, onChange: (v) => onCheckChange('confirm1', v), label: "\u6295\u7A3F\u5185\u5BB9\u304C\u8457\u4F5C\u6A29\u3084\u8096\u50CF\u6A29\u306E\u4FB5\u5BB3\u306B\u3042\u305F\u3089\u306A\u3044\u3053\u3068\u3092\u78BA\u8A8D\u3057\u307E\u3057\u305F" }), _jsx(CheckRow, { id: "confirm2", checked: checks.confirm2, onChange: (v) => onCheckChange('confirm2', v), label: "\u6295\u7A3F\u5185\u5BB9\u306B\u672A\u6210\u5E74\u8005\u304C\u5199\u3063\u3066\u3044\u306A\u3044\u3053\u3068\u3001\u307E\u305F\u672A\u6210\u5E74\u8005\u3092\u9023\u60F3\u3055\u305B\u308B\u8868\u73FE\u7B49\u304C\u542B\u307E\u308C\u3066\u3044\u306A\u3044\u3053\u3068\u3092\u78BA\u8A8D\u3057\u307E\u3057\u305F" }), _jsx(CheckRow, { id: "confirm3", checked: checks.confirm3, onChange: (v) => onCheckChange('confirm3', v), label: "\u6027\u8868\u73FE\u306B\u306F\u5341\u5206\u306B\u914D\u616E\u3057\u3066\u30E2\u30B6\u30A4\u30AF\u51E6\u7406\u3092\u884C\u3063\u3066\u3044\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3057\u307E\u3057\u305F" }), _jsx("a", { href: "#", className: "text-sm text-primary underline", children: "\u30E2\u30B6\u30A4\u30AF\u306E\u30AC\u30A4\u30C9\u30E9\u30A4\u30F3\u3092\u898B\u308B" })] }));
}
// CheckRow 補助コンポーネント
function CheckRow({ id, checked, onChange, label, }) {
    return (_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(Checkbox, { id: id, checked: checked, onCheckedChange: onChange, className: "mt-1" }), _jsx(Label, { htmlFor: id, className: "text-sm leading-relaxed", children: label })] }));
}
