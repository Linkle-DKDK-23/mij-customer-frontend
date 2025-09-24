import { jsx as _jsx } from "react/jsx-runtime";
export default function MessageSection({ message }) {
    if (!message)
        return null;
    const isSuccess = message.includes('正常');
    return (_jsx("div", { className: `p-3 rounded-md text-sm ${isSuccess
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'}`, children: message }));
}
