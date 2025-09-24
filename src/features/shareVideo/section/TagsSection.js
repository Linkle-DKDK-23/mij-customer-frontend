import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function TagsSection({ tags, onChange, }) {
    return (_jsxs("div", { className: "space-y-2 border-b-2 border-primary pb-5 pr-5 pl-5", children: [_jsx(Label, { htmlFor: "tags", className: "text-sm font-medium font-bold", children: "\u30BF\u30B0" }), _jsx(Input, { id: "tags", value: tags, onChange: (e) => onChange(e.target.value), placeholder: "\u30BF\u30B0\u3092\u5165\u529B" })] }));
}
