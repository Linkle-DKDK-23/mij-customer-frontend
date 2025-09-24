import { jsx as _jsx } from "react/jsx-runtime";
import PostCard from './PostCard';
export default function PostGrid({ posts, showRank = false, columns = 2, className = '', onPostClick, onCreatorClick }) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4'
    };
    return (_jsx("div", { className: `grid ${gridCols[columns]} gap-4 ${className}`, children: posts.map((post) => (_jsx(PostCard, { ...post, showRank: showRank, onClick: onPostClick, onCreatorClick: onCreatorClick }, post.id))) }));
}
