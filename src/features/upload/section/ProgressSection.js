import { jsx as _jsx } from "react/jsx-runtime";
export default function ProgressSection({ uploading, progress }) {
    if (!uploading)
        return null;
    return (_jsx("div", { style: { width: '100%', backgroundColor: '#eee', marginTop: '10px' }, children: _jsx("div", { style: {
                width: `${progress}%`,
                backgroundColor: '#4caf50',
                height: '10px',
                transition: 'width 0.3s',
            } }) }));
}
