import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { MessageCircle, Reply, Edit3, Trash2 } from 'lucide-react';
import { getComments, createComment, updateComment, deleteComment, getCommentReplies } from '@/api/endpoints/social';
function CommentItem({ comment, onReply, onEdit, onDelete, currentUserId }) {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const loadReplies = async () => {
        if (loadingReplies)
            return;
        setLoadingReplies(true);
        try {
            const response = await getCommentReplies(comment.id);
            setReplies(response.data);
            setShowReplies(true);
        }
        catch (error) {
            console.error('Failed to load replies:', error);
        }
        finally {
            setLoadingReplies(false);
        }
    };
    const isOwner = currentUserId === comment.user_id;
    return (_jsx("div", { className: "border-b border-gray-100 pb-4 mb-4", children: _jsxs("div", { className: "flex space-x-3", children: [_jsx("div", { className: "flex-shrink-0", children: comment.user_avatar ? (_jsx("img", { className: "h-8 w-8 rounded-full", src: comment.user_avatar, alt: comment.user_display_name })) : (_jsx("div", { className: "h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center", children: _jsx("span", { className: "text-sm text-gray-600", children: comment.user_display_name.charAt(0) }) })) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h4", { className: "text-sm font-medium text-gray-900", children: comment.user_display_name }), _jsx("span", { className: "text-xs text-gray-500", children: new Date(comment.created_at).toLocaleString() })] }), _jsx("p", { className: "mt-1 text-sm text-gray-700 whitespace-pre-wrap", children: comment.body }), _jsxs("div", { className: "mt-2 flex items-center space-x-4", children: [_jsxs("button", { onClick: () => onReply(comment.id), className: "text-xs text-gray-500 hover:text-blue-600 flex items-center space-x-1", children: [_jsx(Reply, { className: "h-3 w-3" }), _jsx("span", { children: "\u8FD4\u4FE1" })] }), isOwner && (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => onEdit(comment), className: "text-xs text-gray-500 hover:text-green-600 flex items-center space-x-1", children: [_jsx(Edit3, { className: "h-3 w-3" }), _jsx("span", { children: "\u7DE8\u96C6" })] }), _jsxs("button", { onClick: () => onDelete(comment.id), className: "text-xs text-gray-500 hover:text-red-600 flex items-center space-x-1", children: [_jsx(Trash2, { className: "h-3 w-3" }), _jsx("span", { children: "\u524A\u9664" })] })] })), _jsx("button", { onClick: loadReplies, disabled: loadingReplies, className: "text-xs text-blue-600 hover:text-blue-700", children: loadingReplies ? '読み込み中...' : '返信を見る' })] }), showReplies && replies.length > 0 && (_jsx("div", { className: "mt-4 ml-4 space-y-3", children: replies.map((reply) => (_jsx(CommentItem, { comment: reply, onReply: onReply, onEdit: onEdit, onDelete: onDelete, currentUserId: currentUserId }, reply.id))) }))] })] }) }));
}
export default function CommentSection({ postId, className = "" }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState('');
    const loadComments = async () => {
        setLoading(true);
        try {
            const response = await getComments(postId);
            setComments(response.data);
        }
        catch (error) {
            console.error('Failed to load comments:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadComments();
    }, [postId]);
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim())
            return;
        try {
            const commentData = {
                body: newComment,
                parent_comment_id: replyingTo || undefined
            };
            await createComment(postId, commentData);
            setNewComment('');
            setReplyingTo(null);
            loadComments(); // コメント一覧を再読み込み
        }
        catch (error) {
            console.error('Failed to create comment:', error);
        }
    };
    const handleEditComment = async (e) => {
        e.preventDefault();
        if (!editingComment || !editText.trim())
            return;
        try {
            await updateComment(editingComment.id, { body: editText });
            setEditingComment(null);
            setEditText('');
            loadComments(); // コメント一覧を再読み込み
        }
        catch (error) {
            console.error('Failed to update comment:', error);
        }
    };
    const handleDeleteComment = async (commentId) => {
        if (!confirm('このコメントを削除しますか？'))
            return;
        try {
            await deleteComment(commentId);
            loadComments(); // コメント一覧を再読み込み
        }
        catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };
    const startReply = (parentId) => {
        setReplyingTo(parentId);
    };
    const startEdit = (comment) => {
        setEditingComment(comment);
        setEditText(comment.body);
    };
    return (_jsxs("div", { className: `bg-white rounded-lg shadow-sm border p-6 ${className}`, children: [_jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [_jsx(MessageCircle, { className: "h-5 w-5 text-gray-500" }), _jsxs("h3", { className: "text-lg font-semibold text-gray-900", children: ["\u30B3\u30E1\u30F3\u30C8 (", comments.length, ")"] })] }), _jsxs("form", { onSubmit: handleSubmitComment, className: "mb-6", children: [_jsx("div", { className: "flex space-x-3", children: _jsx("div", { className: "flex-1", children: _jsx("textarea", { value: newComment, onChange: (e) => setNewComment(e.target.value), placeholder: replyingTo ? "返信を入力..." : "コメントを入力...", className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none", rows: 3 }) }) }), _jsxs("div", { className: "mt-3 flex justify-between items-center", children: [replyingTo && (_jsx("button", { type: "button", onClick: () => setReplyingTo(null), className: "text-sm text-gray-500 hover:text-gray-700", children: "\u8FD4\u4FE1\u3092\u30AD\u30E3\u30F3\u30BB\u30EB" })), _jsx("button", { type: "submit", disabled: !newComment.trim(), className: "px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed", children: replyingTo ? '返信' : 'コメント' })] })] }), editingComment && (_jsxs("form", { onSubmit: handleEditComment, className: "mb-6 bg-yellow-50 p-4 rounded-lg", children: [_jsx("div", { className: "flex space-x-3", children: _jsx("div", { className: "flex-1", children: _jsx("textarea", { value: editText, onChange: (e) => setEditText(e.target.value), className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none", rows: 3 }) }) }), _jsxs("div", { className: "mt-3 flex justify-end space-x-2", children: [_jsx("button", { type: "button", onClick: () => {
                                    setEditingComment(null);
                                    setEditText('');
                                }, className: "px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200", children: "\u30AD\u30E3\u30F3\u30BB\u30EB" }), _jsx("button", { type: "submit", disabled: !editText.trim(), className: "px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed", children: "\u66F4\u65B0" })] })] })), _jsx("div", { className: "space-y-4", children: loading ? (_jsx("div", { className: "text-center py-4", children: _jsx("div", { className: "text-gray-500", children: "\u8AAD\u307F\u8FBC\u307F\u4E2D..." }) })) : comments.length === 0 ? (_jsx("div", { className: "text-center py-8 text-gray-500", children: "\u307E\u3060\u30B3\u30E1\u30F3\u30C8\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u6700\u521D\u306E\u30B3\u30E1\u30F3\u30C8\u3092\u6295\u7A3F\u3057\u3066\u307F\u307E\u3057\u3087\u3046\uFF01" })) : (comments.map((comment) => (_jsx(CommentItem, { comment: comment, onReply: startReply, onEdit: startEdit, onDelete: handleDeleteComment }, comment.id)))) })] }));
}
