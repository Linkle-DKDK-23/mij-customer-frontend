import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
export default function CategoryModal({ categoryIndex, isOpen, onOpenChange, currentCategory, onCategorySelect, categories, genres, recommendedCategories, recentCategories, expandedGenres, onExpandedGenresChange, }) {
    const placeholder = `カテゴリー${categoryIndex}を選択してください`;
    const title = `カテゴリー${categoryIndex}選択`;
    const handleGenreToggle = (genreId) => {
        if (expandedGenres.includes(genreId)) {
            onExpandedGenresChange(expandedGenres.filter(id => id !== genreId));
        }
        else {
            onExpandedGenresChange([...expandedGenres, genreId]);
        }
    };
    const getGenreDescription = (genreName) => {
        switch (genreName) {
            case '見た目':
                return '巨乳、美身など出演者の魅力に応じたジャンル';
            case 'プレイ':
                return '絶頂位、フェラなどプレイ内容に応じたジャンル';
            case 'タイプ':
                return '素人、人妻など役柄のコンセプトに応じたジャンル';
            case 'シチュエーション':
                return 'カップル、エステなど撮影状況に応じたジャンル';
            case 'コスチューム':
                return '制服、水着など衣装に応じたジャンル';
            default:
                return '';
        }
    };
    return (_jsxs(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Input, { readOnly: true, placeholder: placeholder, value: currentCategory ? categories.find(cat => cat.id === currentCategory)?.name || '' : '', className: "cursor-pointer text-left pr-10" }) }), _jsxs(DialogContent, { className: "max-w-md max-h-[80vh] overflow-y-auto", children: [_jsx(DialogTitle, { className: "text-lg font-medium text-center", children: title }), _jsxs(DialogDescription, { className: "sr-only", children: [placeholder, "\u3002\u304A\u3059\u3059\u3081\u306E\u30B8\u30E3\u30F3\u30EB\u3001\u76F4\u8FD1\u4F7F\u7528\u3057\u305F\u30B8\u30E3\u30F3\u30EB\u3001\u307E\u305F\u306F\u30AB\u30C6\u30B4\u30EA\u30FC\u304B\u3089\u63A2\u3059\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002"] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center", children: _jsx("span", { className: "text-pink-500 text-sm", children: "\uD83D\uDE0A" }) }), _jsx("h3", { className: "text-sm font-medium", children: "\u304A\u3059\u3059\u3081\u306E\u30B8\u30E3\u30F3\u30EB" })] }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: recommendedCategories.map((category) => (_jsx("button", { onClick: () => onCategorySelect(category.id, categoryIndex), className: `px-3 py-2 rounded-full border text-sm transition-colors ${currentCategory === category.id
                                                ? 'bg-pink-50 border-pink-300 text-pink-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-pink-200'}`, children: category.name }, category.id))) })] }), recentCategories.length > 0 && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center", children: _jsx("span", { className: "text-pink-500 text-sm", children: "\uD83D\uDD52" }) }), _jsx("h3", { className: "text-sm font-medium", children: "\u76F4\u8FD1\u4F7F\u7528\u3057\u305F\u30B8\u30E3\u30F3\u30EB" })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: recentCategories.map((category) => (_jsx("button", { onClick: () => onCategorySelect(category.id, categoryIndex), className: `px-3 py-2 rounded-full border text-sm transition-colors ${currentCategory === category.id
                                                ? 'bg-pink-50 border-pink-300 text-pink-700'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-pink-200'}`, children: category.name }, category.id))) })] })), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center", children: _jsx("span", { className: "text-pink-500 text-sm", children: "\uD83D\uDD0D" }) }), _jsx("h3", { className: "text-sm font-medium", children: "\u30AB\u30C6\u30B4\u30EA\u30FC\u304B\u3089\u63A2\u3059" })] }), _jsx("div", { className: "space-y-2", children: genres.map((genre) => (_jsxs("div", { className: "border-b border-gray-100 last:border-b-0", children: [_jsxs("button", { onClick: () => handleGenreToggle(genre.id), className: "w-full flex items-center justify-between py-3 text-left hover:bg-gray-50", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-pink-600", children: genre.name }), _jsx("div", { className: "text-xs text-gray-500", children: getGenreDescription(genre.name) })] }), _jsx("div", { className: "text-gray-400", children: expandedGenres.includes(genre.id) ? '▼' : '▶' })] }), expandedGenres.includes(genre.id) && (_jsx("div", { className: "pb-3 grid grid-cols-2 gap-2", children: categories.filter(cat => cat.genre_id === genre.id).map((category) => (_jsx("button", { onClick: () => onCategorySelect(category.id, categoryIndex), className: `px-3 py-2 rounded-full border text-sm transition-colors ${currentCategory === category.id
                                                            ? 'bg-pink-50 border-pink-300 text-pink-700'
                                                            : 'bg-white border-gray-200 text-gray-700 hover:border-pink-200'}`, children: category.name }, category.id))) }))] }, genre.id))) })] })] })] })] }));
}
