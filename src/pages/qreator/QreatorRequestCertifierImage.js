import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Camera, CheckCircle } from 'lucide-react';
import AuthLayout from '@/features/auth/AuthLayout';
import VerificationLayout from '@/features/auth/VerificationLayout';
import { identityPresignedUrl, completeIdentityUpload } from '@/api/endpoints/identity';
import { putToPresignedUrl } from '@/service/s3FileUpload';
import FileUploadGrid from '@/components/common/FileUploadGrid';
import ErrorMessage from '@/components/common/ErrorMessage';
const mimeToExt = (mime) => {
    if (mime === "image/png")
        return "png";
    if (mime === "application/pdf")
        return "pdf";
    return "jpg";
};
export default function QreatorRequestCertifierImage({ onNext, onBack, currentStep, totalSteps, steps, }) {
    const [uploadedFiles, setUploadedFiles] = useState([
        { id: '1', name: '身分証明書（表面）', type: 'front', uploaded: false },
        { id: '2', name: '身分証明書（裏面）', type: 'back', uploaded: false },
        { id: '3', name: '本人確認写真', type: 'selfie', uploaded: false }
    ]);
    /** ファイル実体・進捗・メッセージ */
    const [files, setFiles] = useState({
        'front': null,
        'back': null,
        'selfie': null
    });
    const [progress, setProgress] = useState({
        'front': 0, 'back': 0, 'selfie': 0
    });
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    /** 隠しinputを種類ごとに用意（クリックで発火） */
    const inputRefs = {
        'front': useRef(null),
        'back': useRef(null),
        'selfie': useRef(null),
    };
    const allFilesPicked = useMemo(() => ['front', 'back', 'selfie'].every(k => !!files[k]), [files]);
    /** ファイル選択ボタン押下 → input を click */
    const openPicker = (kind) => inputRefs[kind].current?.click();
    /** ファイル選択時の処理（まだS3には送らない） */
    const onPick = (kind) => (e) => {
        const f = e.target.files?.[0] ?? null;
        setMessage(null);
        if (!f)
            return;
        // フロント側バリデーション（最小）
        const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowed.includes(f.type)) {
            setMessage('ファイル形式は JPEG/PNG/PDF のみです');
            return;
        }
        if (f.size > 10 * 1024 * 1024) {
            setMessage('ファイルサイズは 10MB 以下にしてください');
            return;
        }
        setFiles(prev => ({ ...prev, [kind]: f }));
        setUploadedFiles(prev => prev.map(item => item.type === kind ? { ...item, uploaded: false } : item));
        setProgress(p => ({ ...p, [kind]: 0 }));
    };
    /** 送信（presign → PUT → complete） */
    const handleSubmit = async () => {
        setMessage(null);
        // 3ファイル存在チェック（キー名修正）
        const fFront = files['front'];
        const fBack = files['back'];
        const fSelf = files['selfie'];
        if (!fFront || !fBack || !fSelf) {
            setMessage('すべての書類を選択してください');
            return;
        }
        const IdentityFileKinds = ['front', 'back', 'selfie'];
        setSubmitting(true);
        // presign payload（ファイルごと）
        const presignedUrlRequest = {
            files: IdentityFileKinds.map((k) => {
                const file = files[k];
                return {
                    kind: k,
                    content_type: file.type,
                    ext: mimeToExt(file.type),
                };
            })
        };
        try {
            // 1) presign
            const presignRes = await identityPresignedUrl(presignedUrlRequest);
            const { verification_id, uploads } = presignRes;
            // 2) S3 PUT（presigned には CSRF不要なので素の axios を使用）
            const uploadOne = async (kind) => {
                const file = files[kind];
                const item = uploads[kind];
                const header = item.required_headers;
                await putToPresignedUrl(item, file, header, {
                    onProgress: (pct) => setProgress((p) => ({ ...p, [kind]: pct })),
                });
                setUploadedFiles((prev) => prev.map((it) => (it.type === kind ? { ...it, uploaded: true } : it)));
            };
            await uploadOne('front');
            await uploadOne('back');
            await uploadOne('selfie');
            // 3) complete（各ファイルの ext を渡す）
            await completeIdentityUpload(verification_id, ['front', 'back', 'selfie'].map((k) => ({
                kind: k,
                ext: mimeToExt(files[k].type),
            })));
            setMessage('アップロード完了。審査をお待ちください。');
            if (onNext)
                onNext();
        }
        catch (e) {
            const status = e?.response?.status;
            if (status === 400 || status === 403) {
                setMessage('URLの有効期限切れかヘッダ不一致です。もう一度やり直してください。');
            }
            else {
                setMessage('アップロードに失敗しました。時間をおいて再試行してください。');
            }
            console.error(e);
        }
        finally {
            setSubmitting(false);
        }
    };
    const allFilesUploaded = uploadedFiles.every(f => f.uploaded);
    /** カードUI（共通） */
    const Card = ({ file, compact = false }) => (_jsx("div", { className: `border-2 border-dashed rounded-lg p-6 text-center transition-colors ${file.uploaded ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`, children: _jsxs("div", { className: "flex flex-col items-center space-y-2", children: [file.uploaded ? (_jsx(CheckCircle, { className: "h-8 w-8 text-green-500" })) : file.type === 'selfie' ? (_jsx(Camera, { className: "h-8 w-8 text-gray-400" })) : (_jsx(FileText, { className: "h-8 w-8 text-gray-400" })), _jsx("h3", { className: "text-sm font-medium text-gray-900", children: file.name }), _jsx("input", { ref: inputRefs[file.type], type: "file", accept: "image/jpeg,image/png,application/pdf", className: "hidden", onChange: onPick(file.type) }), !file.uploaded && (_jsxs(Button, { onClick: () => openPicker(file.type), variant: "outline", className: "mt-2", disabled: submitting, children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E"] })), _jsx("div", { className: "w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden", children: _jsx("div", { className: "h-2 bg-primary transition-all", style: { width: `${progress[file.type]}%` } }) }), files[file.type] && !file.uploaded && (_jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [files[file.type].name, "\uFF08", Math.round(files[file.type].size / 1024), " KB\uFF09"] })), file.uploaded && _jsx("p", { className: "text-xs text-green-600", children: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5B8C\u4E86" })] }) }));
    const PageBody = (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u8EAB\u5206\u8A3C\u660E\u66F8\u306E\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u672C\u4EBA\u78BA\u8A8D\u306E\u305F\u3081\u3001\u4EE5\u4E0B\u306E\u66F8\u985E\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044" })] }), _jsx(FileUploadGrid, { uploads: uploadedFiles.map(upload => ({
                    id: upload.id,
                    name: upload.name,
                    type: upload.type,
                    uploaded: upload.uploaded,
                    file: files[upload.type],
                    progress: progress[upload.type],
                    disabled: submitting,
                    accept: 'image/jpeg,image/png,application/pdf',
                    icon: upload.type === 'selfie' ? 'camera' : 'file',
                    showPreview: true, // 全てのファイルタイプでプレビューを表示
                    onFileSelect: (type, file) => {
                        setMessage('');
                        if (file) {
                            // フロント側バリデーション（最小）
                            const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
                            if (!allowed.includes(file.type)) {
                                setMessage('ファイル形式は JPEG/PNG/PDF のみです');
                                return;
                            }
                            if (file.size > 10 * 1024 * 1024) {
                                setMessage('ファイルサイズは 10MB 以下にしてください');
                                return;
                            }
                            setFiles(prev => ({ ...prev, [type]: file }));
                            setUploadedFiles(prev => prev.map(item => item.type === type ? { ...item, uploaded: false } : item));
                            setProgress(p => ({ ...p, [type]: 0 }));
                        }
                        else {
                            setFiles(prev => ({ ...prev, [type]: null }));
                            setUploadedFiles(prev => prev.map(item => item.type === type ? { ...item, uploaded: false } : item));
                            setProgress(p => ({ ...p, [type]: 0 }));
                        }
                    }
                })), columns: 1 }), _jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-medium text-yellow-900 mb-2", children: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u6642\u306E\u6CE8\u610F\u4E8B\u9805" }), _jsxs("ul", { className: "text-sm text-yellow-800 space-y-1", children: [_jsx("li", { children: "\u2022 \u753B\u50CF\u306F\u9BAE\u660E\u3067\u6587\u5B57\u304C\u8AAD\u307F\u53D6\u308C\u308B\u3082\u306E\u3092\u3054\u7528\u610F\u304F\u3060\u3055\u3044" }), _jsx("li", { children: "\u2022 \u30D5\u30A1\u30A4\u30EB\u5F62\u5F0F\uFF1AJPEG\u3001PNG\u3001PDF\uFF08\u6700\u592710MB\uFF09" }), _jsx("li", { children: "\u2022 \u8EAB\u5206\u8A3C\u660E\u66F8\u306F\u6709\u52B9\u671F\u9650\u5185\u306E\u3082\u306E\u3092\u3054\u4F7F\u7528\u304F\u3060\u3055\u3044" }), _jsx("li", { children: "\u2022 \u672C\u4EBA\u78BA\u8A8D\u5199\u771F\u306F\u8EAB\u5206\u8A3C\u660E\u66F8\u3068\u540C\u3058\u4EBA\u7269\u3067\u3042\u308B\u3053\u3068\u3092\u78BA\u8A8D\u3067\u304D\u308B\u3082\u306E" })] })] }), _jsxs("div", { className: "flex space-x-4", children: [onBack && (_jsx(Button, { onClick: onBack, variant: "outline", className: "flex-1", disabled: submitting, children: "\u623B\u308B" })), _jsx(Button, { onClick: handleSubmit, disabled: submitting || !allFilesPicked, className: `${onBack ? 'flex-1' : 'w-full'} bg-primary hover:bg-primary/90 text-white disabled:bg-gray-300`, children: submitting ? '提出中…' : '確認書類を提出する' })] }), message && (_jsx(ErrorMessage, { message: message, variant: message.includes('完了') ? 'success' : 'error', onClose: () => setMessage(null) }))] }));
    if (currentStep && totalSteps && steps) {
        return (_jsx(VerificationLayout, { currentStep: currentStep, totalSteps: totalSteps, steps: steps, children: PageBody }));
    }
    return (_jsxs(AuthLayout, { children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary rounded-full", children: _jsx(FileText, { className: "h-8 w-8 text-white" }) }), _jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u8EAB\u5206\u8A3C\u660E\u66F8\u78BA\u8A8D" }), _jsx("p", { className: "text-sm text-gray-600", children: "\u672C\u4EBA\u78BA\u8A8D\u306E\u305F\u3081\u3001\u8EAB\u5206\u8A3C\u660E\u66F8\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3057\u3066\u304F\u3060\u3055\u3044" })] }), PageBody] }));
}
