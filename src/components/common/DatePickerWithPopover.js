import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/DatePickerWithPopover.tsx
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
export function DatePickerWithPopover({ value, onChange, }) {
    const [open, setOpen] = useState(false);
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-full justify-start text-left font-normal", children: value ? format(value, "yyyy/MM/dd", { locale: ja }) : _jsx("span", { className: "text-muted-foreground", children: "\u65E5\u4ED8\u3092\u9078\u629E" }) }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: value, onSelect: (date) => {
                        onChange(date);
                        setOpen(false);
                    }, locale: ja }) })] }));
}
