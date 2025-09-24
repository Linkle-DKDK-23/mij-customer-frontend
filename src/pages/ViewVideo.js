import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
export default function ViewVideo() {
    const { id } = useParams();
    return (_jsx("div", { className: "w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16", children: _jsxs("div", { className: "min-h-screen bg-gray-50 pb-20", children: [_jsx(Header, {}), _jsx("section", { className: "bg-white py-6", children: _jsx("div", { className: "max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-xl font-semibold text-gray-900 mb-4", children: "\u52D5\u753B\u8A73\u7D30" }), id && (_jsxs("p", { className: "text-gray-600", children: ["\u52D5\u753BID: ", id] })), _jsx("p", { className: "text-gray-500 mt-4", children: "\u3053\u306E\u30DA\u30FC\u30B8\u3067\u306F\u52D5\u753B\u306E\u8A73\u7D30\u8868\u793A\u6A5F\u80FD\u3092\u5B9F\u88C5\u4E88\u5B9A\u3067\u3059\u3002" })] }) }) }), _jsx(BottomNavigation, {})] }) }));
}
