import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (_jsx("input", { type: type, className: cn("flex h-10 w-full rounded-md border border-muted bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus:outline-none focus:ring-0 focus:border-primary focus:border-2 shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className), ref: ref, ...props }));
});
Input.displayName = "Input";
export { Input };
