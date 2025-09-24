import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
export default function WithdrawalSubmitSection({ withdrawalAmount }) {
    return (_jsx("div", { className: "flex justify-center", children: _jsx(Button, { className: "bg-primary hover:bg-primary/90 px-8", disabled: withdrawalAmount <= 0, children: "\u7533\u8ACB" }) }));
}
