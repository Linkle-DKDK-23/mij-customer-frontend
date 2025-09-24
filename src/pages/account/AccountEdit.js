import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef } from 'react';
import AccountHeader from '@/features/account/component/AccountHeader';
import { updateAccountInfo, getAccountInfo } from '@/api/endpoints/account';
import { accountPresignedUrl } from '@/api/endpoints/account';
import { putToPresignedUrl } from '@/service/s3FileUpload';
import { useNavigate } from 'react-router-dom';
import { mimeToImageExt } from '@/lib/media';
import FileUploadGrid from '@/components/common/FileUploadGrid';
// セクションコンポーネントをインポート
import AccountEditHeaderSection from '@/features/account/AccountEdit/section/AccountEditHeaderSection';
import MessageSection from '@/features/account/AccountEdit/section/MessageSection';
import ProfileFormSection from '@/features/account/AccountEdit/section/ProfileFormSection';
export default function AccountEdit() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        coverImage: 'https://picsum.photos/600/200?random=110',
        avatar: '/src/assets/no-image.svg',
        name: '',
        id: '',
        description: '',
        links: {
            website: '',
        }
    });
    const [submitting, setSubmitting] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([
        { id: '1', name: 'カバー画像', type: 'cover', uploaded: false },
        { id: '2', name: 'アバター画像', type: 'avatar', uploaded: false }
    ]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [accountInfo, setAccountInfo] = useState(null);
    const [files, setFiles] = useState({
        'cover': null,
        'avatar': null
    });
    const [progress, setProgress] = useState({
        'cover': 0,
        'avatar': 0
    });
    const inputRefs = {
        'cover': useRef(null),
        'avatar': useRef(null),
    };
    const allFilesPicked = useMemo(() => ['cover', 'avatar'].every(k => !!files[k]), [files]);
    const openPicker = (kind) => inputRefs[kind].current?.click();
    const onPick = (kind) => (e) => {
        const f = e.target.files?.[0] ?? null;
        setMessage(null);
        if (!f)
            return;
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
    const handleSave = async () => {
        setMessage(null);
        if (!allFilesPicked) {
            setMessage('すべての画像を選択してください');
            return;
        }
        setSubmitting(true);
        const AccountFileKinds = ['cover', 'avatar'];
        const presignedUrlRequest = {
            files: AccountFileKinds.map((k) => {
                const file = files[k];
                return {
                    kind: k,
                    content_type: file.type,
                    ext: mimeToImageExt(file.type),
                };
            })
        };
        try {
            // 1) presign
            const presignRes = await accountPresignedUrl(presignedUrlRequest);
            const uploadOne = async (kind) => {
                const file = files[kind];
                const item = presignRes.uploads[kind];
                const header = item.required_headers;
                await putToPresignedUrl(item, file, header, {
                    onProgress: (pct) => setProgress((p) => ({ ...p, [kind]: pct })),
                });
                setUploadedFiles((prev) => prev.map((it) => (it.type === kind ? { ...it, uploaded: true } : it)));
            };
            await uploadOne('cover');
            await uploadOne('avatar');
            const res = await updateAccountInfo({
                name: profileData.name,
                display_name: profileData.id.replace('@', ''),
                description: profileData.description,
                links: profileData.links,
                avatar_url: presignRes.uploads['avatar'].key,
                cover_url: presignRes.uploads['cover'].key
            });
            if (res.success) {
                setMessage('アカウント情報が正常に更新されました');
                navigate('/account');
            }
            else {
                setMessage('アカウント情報の更新に失敗しました');
            }
            return;
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
    useEffect(() => {
        const fetchAccountInfo = async () => {
            try {
                const data = await getAccountInfo();
                setAccountInfo(data);
                setProfileData(prev => ({
                    ...prev,
                    name: data.slug,
                    id: data.display_name,
                    avatar: data.avatar_url || '/src/assets/no-image.svg'
                }));
            }
            catch (error) {
                console.error('Failed to fetch account info:', error);
            }
        };
        fetchAccountInfo();
    }, []);
    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    return (_jsxs("div", { className: "bg-white", children: [_jsx(AccountHeader, { title: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u3092\u7DE8\u96C6", showBackButton: true }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx(AccountEditHeaderSection, { loading: loading, onSave: handleSave }), _jsx(MessageSection, { message: message }), _jsx(FileUploadGrid, { uploads: uploadedFiles.map(upload => ({
                            id: upload.id,
                            name: upload.name,
                            type: upload.type,
                            uploaded: upload.uploaded,
                            file: files[upload.type],
                            progress: progress[upload.type],
                            disabled: submitting,
                            accept: 'image/jpeg,image/png',
                            icon: 'image',
                            showPreview: true,
                            onFileSelect: (type, file) => {
                                if (file) {
                                    setFiles(prev => ({ ...prev, [type]: file }));
                                    setUploadedFiles(prev => prev.map(item => item.type === type ? { ...item, uploaded: false } : item));
                                    setProgress(p => ({ ...p, [type]: 0 }));
                                    setMessage('');
                                }
                                else {
                                    setFiles(prev => ({ ...prev, [type]: null }));
                                    setUploadedFiles(prev => prev.map(item => item.type === type ? { ...item, uploaded: false } : item));
                                    setProgress(p => ({ ...p, [type]: 0 }));
                                }
                            }
                        })), columns: 1 }), _jsx(ProfileFormSection, { profileData: profileData, onInputChange: handleInputChange })] })] }));
}
