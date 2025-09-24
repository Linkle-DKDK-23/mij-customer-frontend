import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import CategoryModal from '@/features/shareVideo/componets/CategoryModal';
import { SHARE_VIDEO_CONSTANTS } from '@/features/shareVideo/constans/constans';
export default function CategorySection({ category1, category2, category3, showCategoryModal1, showCategoryModal2, showCategoryModal3, categories, genres, recommendedCategories, recentCategories, expandedGenres, onCategorySelect, onCategoryClear, onExpandedGenresChange, onModalOpenChange1, onModalOpenChange2, onModalOpenChange3, }) {
    return (_jsxs("div", { className: "space-y-2 pr-5 pl-5", children: [_jsxs(Label, { className: "text-sm font-medium font-bold", children: [_jsx("span", { className: "text-primary mr-1", children: "*" }), "\u30AB\u30C6\u30B4\u30EA\u30FC\uFF08\u5FC5\u305A1\u3064\u306F\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\uFF09"] }), _jsx("div", { className: "space-y-3", children: Array.from({ length: SHARE_VIDEO_CONSTANTS.CATEGORY_COUNT }, (_, index) => {
                    const categoryIndex = (index + 1);
                    const categoryStates = [category1, category2, category3];
                    const modalStates = [showCategoryModal1, showCategoryModal2, showCategoryModal3];
                    const setModalStates = [onModalOpenChange1, onModalOpenChange2, onModalOpenChange3];
                    const currentCategory = categoryStates[index];
                    return (_jsx("div", { className: "space-y-2", children: _jsxs("div", { className: "relative", children: [_jsx(CategoryModal, { categoryIndex: categoryIndex, isOpen: modalStates[index], onOpenChange: setModalStates[index], currentCategory: currentCategory, onCategorySelect: onCategorySelect, categories: categories, genres: genres, recommendedCategories: recommendedCategories, recentCategories: recentCategories, expandedGenres: expandedGenres, onExpandedGenresChange: onExpandedGenresChange }), currentCategory && (_jsx("button", { onClick: () => onCategoryClear(categoryIndex), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors", title: "\u9078\u629E\u89E3\u9664", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }))] }) }, categoryIndex));
                }) })] }));
}
