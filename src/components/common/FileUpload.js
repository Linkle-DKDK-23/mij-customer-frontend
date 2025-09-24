import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Camera, CheckCircle, X } from 'lucide-react';
export default function FileUpload({ id, name, type, uploaded, file, progress = 0, disabled = false, accept = 'image/jpeg,image/png,application/pdf', maxSize = 10 * 1024 * 1024, // 10MB default
icon = 'file', showProgress = true, showFileInfo = true, showPreview = false, compact = false, onFileSelect, onRemove }) {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    useEffect(() => {
        if (file && showPreview) {
            if (file.type.startsWith('image/')) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                return () => URL.revokeObjectURL(url);
            }
        }
        else {
            setPreviewUrl(null);
        }
    }, [file, showPreview]);
    const handleClick = () => {
        if (!disabled) {
            inputRef.current?.click();
        }
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0] ?? null;
        if (selectedFile) {
            // Validate file type
            const allowedTypes = accept.split(',').map(type => type.trim());
            if (!allowedTypes.includes(selectedFile.type)) {
                alert(`ファイル形式は ${allowedTypes.join(', ')} のみです`);
                return;
            }
            // Validate file size
            if (selectedFile.size > maxSize) {
                const maxSizeMB = Math.round(maxSize / (1024 * 1024));
                alert(`ファイルサイズは ${maxSizeMB}MB 以下にしてください`);
                return;
            }
        }
        onFileSelect(selectedFile);
    };
    const getIcon = () => {
        if (uploaded) {
            return _jsx(CheckCircle, { className: "h-8 w-8 text-green-500" });
        }
        switch (icon) {
            case 'camera':
                return _jsx(Camera, { className: "h-8 w-8 text-gray-400" });
            case 'image':
                return _jsx(Upload, { className: "h-8 w-8 text-gray-400" });
            default:
                return _jsx(FileText, { className: "h-8 w-8 text-gray-400" });
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes < 1024)
            return `${bytes} B`;
        if (bytes < 1024 * 1024)
            return `${Math.round(bytes / 1024)} KB`;
        return `${Math.round(bytes / (1024 * 1024))} MB`;
    };
    return (_jsx("div", { className: `border-2 border-dashed rounded-lg text-center transition-colors ${uploaded
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'} ${compact ? 'p-4' : 'p-6'}`, children: _jsxs("div", { className: "flex flex-col items-center space-y-2", children: [previewUrl ? (_jsxs("div", { className: "relative", children: [_jsx("img", { src: previewUrl, alt: name, className: `rounded-lg object-cover ${compact ? 'w-20 h-20' : 'w-32 h-32'}` }), onRemove && !uploaded && (_jsx("button", { onClick: (e) => {
                                e.stopPropagation();
                                onRemove();
                            }, className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600", children: _jsx(X, { className: "w-3 h-3" }) }))] })) : (getIcon()), _jsx("h3", { className: `font-medium text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`, children: name }), _jsx("input", { ref: inputRef, type: "file", accept: accept, className: "hidden", onChange: handleFileChange, disabled: disabled }), !uploaded && !previewUrl && (_jsxs(Button, { onClick: handleClick, variant: "outline", className: "mt-2", disabled: disabled, size: compact ? 'sm' : 'default', children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E"] })), !uploaded && previewUrl && (_jsx(Button, { onClick: handleClick, variant: "outline", size: "sm", className: "mt-1", children: "\u5909\u66F4" })), file && onRemove && !uploaded && !previewUrl && (_jsxs(Button, { onClick: onRemove, variant: "outline", size: "sm", className: "mt-1", children: [_jsx(X, { className: "h-4 w-4 mr-1" }), "\u524A\u9664"] })), showProgress && (_jsx("div", { className: "w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden", children: _jsx("div", { className: "h-2 bg-primary transition-all", style: { width: `${progress}%` } }) })), showFileInfo && file && !uploaded && (_jsxs("p", { className: `text-gray-500 mt-1 ${compact ? 'text-xs' : 'text-sm'}`, children: [file.name, " (", formatFileSize(file.size), ")"] })), uploaded && (_jsx("p", { className: `text-green-600 ${compact ? 'text-xs' : 'text-sm'}`, children: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5B8C\u4E86" }))] }) }));
}
