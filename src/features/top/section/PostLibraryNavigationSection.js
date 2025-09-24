import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
export default function PostLibraryNavigationSection() {
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    };
    return (
    // <section className="max-w-screen-md mx-auto bg-white border-b border-gray-200">
    //   <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //     <div className="flex justify-around w-full py-4">
    //       <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
    //         <ShoppingCart className="h-5 w-5" />
    //         <span className="font-medium text-xs">購入済み</span>
    //       </div>
    //       <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
    //         <Bookmark className="h-5 w-5" />
    //         <span className="font-medium text-xs">保存済み</span>
    //       </div>
    //       <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
    //         <Heart className="h-5 w-5" />
    //         <span className="font-medium text-xs">いいね済み</span>
    //       </div>
    //       <div className="flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer">
    //         <History className="h-5 w-5" />
    //         <span className="font-medium text-xs">閲覧履歴</span>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    _jsx("section", { className: "max-w-screen-md mx-auto bg-white border-b border-gray-200", children: _jsx("div", { className: "max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4", children: _jsxs("div", { className: "flex flex-row justify-center gap-2 w-full", children: [_jsx("div", { className: "flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer", children: _jsx("span", { className: "font-medium text-xs", onClick: () => handleClick('/terms'), children: "\u5229\u7528\u898F\u7D04" }) }), _jsx("div", { className: "flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer", children: _jsx("span", { className: "font-medium text-xs", onClick: () => handleClick('/legal-notice'), children: "\u7279\u5B9A\u5546\u6CD5\u53D6\u5F15\u6CD5\u306B\u57FA\u3065\u304F\u8868\u8A18" }) }), _jsx("div", { className: "flex flex-col items-center space-y-1 text-gray-700 hover:text-primary cursor-pointer", children: _jsx("span", { className: "font-medium text-xs", onClick: () => handleClick('/privacy-policy'), children: "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC" }) })] }) }) }));
}
