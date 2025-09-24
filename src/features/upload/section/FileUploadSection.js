import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useDropzone } from 'react-dropzone';
export default function FileUploadSection({ selectedFile, onFileSelect }) {
    const onDrop = React.useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            onFileSelect(file);
        }
    }, [onFileSelect]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'video/*': [] },
        multiple: false,
        maxSize: 500 * 1024 * 1024, // 500MB
    });
    return (_jsxs("div", { ...getRootProps(), style: {
            border: '2px dashed #ccc',
            borderRadius: '10px',
            padding: '30px',
            textAlign: 'center',
            backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
            cursor: 'pointer',
        }, children: [_jsx("input", { ...getInputProps() }), selectedFile ? (_jsxs("p", { children: [selectedFile.name, "\uFF08", (selectedFile.size / 1024 / 1024).toFixed(2), "MB\uFF09"] })) : (_jsx("p", { children: "\u3053\u3053\u306B\u52D5\u753B\u30D5\u30A1\u30A4\u30EB\u3092\u30C9\u30ED\u30C3\u30D7\u3001\u307E\u305F\u306F\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u9078\u629E" }))] }));
}
