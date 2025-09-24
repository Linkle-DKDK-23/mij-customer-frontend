import { jsx as _jsx } from "react/jsx-runtime";
import FileUpload from './FileUpload';
export default function FileUploadGrid({ uploads, className = '', columns = 1 }) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3'
    };
    return (_jsx("div", { className: `grid ${gridCols[columns]} gap-4 ${className}`, children: uploads.map((upload) => (_jsx(FileUpload, { ...upload, onFileSelect: (file) => upload.onFileSelect(upload.type, file), onRemove: upload.onRemove ? () => upload.onRemove(upload.type) : undefined }, upload.id))) }));
}
