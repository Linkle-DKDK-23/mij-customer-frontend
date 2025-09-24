import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
export default function AccountEditHeaderSection({ loading, onSave }) {
    return (_jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx(Button, { variant: "outline", children: "\u30AD\u30E3\u30F3\u30BB\u30EB" }), _jsx(Button, { className: "bg-primary hover:bg-primary/90", onClick: onSave, disabled: loading, children: loading ? '保存中...' : '保存' })] }));
}
