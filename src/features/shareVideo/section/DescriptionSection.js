import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
export default function DescriptionSection({ description, onChange, }) {
    return (_jsxs("div", { className: "space-y-2 pr-5 pl-5", children: [_jsxs(Label, { htmlFor: "description", className: "text-sm font-medium font-bold", children: [_jsx("span", { className: "text-primary mr-1", children: "*" }), "\u8AAC\u660E\u6587"] }), _jsx(Textarea, { id: "description", value: description, onChange: (e) => onChange(e.target.value), placeholder: "\u8AAC\u660E\u6587\u3092\u5165\u529B", className: "resize-none border border-muted focus:outline-none focus:ring-0 focus:border-primary focus:border-2 shadow-none" })] }));
}
