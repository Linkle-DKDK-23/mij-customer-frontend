import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// react要素をインポート
import { useState, useEffect } from 'react';
import { getGenres, getCategories, getRecommendedCategories, getRecentCategories } from '@/api/endpoints/categories';
import { useNavigate } from 'react-router-dom';
import { SHARE_VIDEO_CONSTANTS, SHARE_VIDEO_VALIDATION_MESSAGES } from '@/features/shareVideo/constans/constans';
// セクションコンポーネントをインポート
import MainVideoSection from '@/features/shareVideo/section/MainVideoSection';
import SampleVideoSection from '@/features/shareVideo/section/SampleVideoSection';
import OgpImageSection from '@/features/shareVideo/section/OgpImageSection';
import ImagePostSection from '@/features/shareVideo/section/ImagePostSection';
import ThumbnailSection from '@/features/shareVideo/section/ThumbnailSection';
import DescriptionSection from '@/features/shareVideo/section/DescriptionSection';
import CategorySection from '@/features/shareVideo/section/CategorySection';
import TagsSection from '@/features/shareVideo/section/TagsSection';
import SettingsSection from '@/features/shareVideo/section/SettingsSection';
import ConfirmationSection from '@/features/shareVideo/section/ConfirmationSection';
import FooterSection from '@/features/shareVideo/section/FooterSection';
// ユーティリティ
import { formatDateTime, formatTime } from '@/lib/datetime';
import { mimeToImageExt, mimeToExt } from '@/lib/media';
// コンポーネントをインポート
import { Button } from "@/components/ui/button";
import { postImagePresignedUrl, postVideoPresignedUrl } from '@/api/endpoints/postMedia';
// エンドポイントをインポート
import { createPost } from '@/api/endpoints/post';
import { putToPresignedUrl } from '@/service/s3FileUpload';
export default function ShareVideo() {
    const navigate = useNavigate();
    const [postType, setPostType] = useState('video');
    // メイン動画関連の状態
    const [selectedMainFile, setSelectedMainFile] = useState(null);
    const [previewMainUrl, setPreviewMainUrl] = useState(null);
    // サンプル動画関連の状態
    const [selectedSampleFile, setSelectedSampleFile] = useState(null);
    const [previewSampleUrl, setPreviewSampleUrl] = useState(null);
    const [sampleDuration, setSampleDuration] = useState(null);
    // 画像関連の状態
    const [ogp, setOgp] = useState(null);
    const [ogpPreview, setOgpPreview] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    // 動画設定の状態
    const [isSample, setIsSample] = useState('upload');
    // トグルスイッチの状態
    const [scheduled, setScheduled] = useState(false);
    const [expiration, setExpiration] = useState(false);
    const [plan, setPlan] = useState(false);
    const [single, setSingle] = useState(false);
    // 確認項目の状態
    const [checks, setChecks] = useState({
        confirm1: false,
        confirm2: false,
        confirm3: false,
    });
    // プラン選択の状態
    const [selectedPlanId, setSelectedPlanId] = useState([]);
    const [selectedPlanName, setSelectedPlanName] = useState([]);
    const [showPlanSelector, setShowPlanSelector] = useState(false);
    // カテゴリー関連の状態
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [recommendedCategories, setRecommendedCategories] = useState([]);
    const [recentCategories, setRecentCategories] = useState([]);
    const [expandedGenres, setExpandedGenres] = useState([]);
    // 3つのカテゴリー選択用の状態
    const [category1, setCategory1] = useState('');
    const [category2, setCategory2] = useState('');
    const [category3, setCategory3] = useState('');
    const [showCategoryModal1, setShowCategoryModal1] = useState(false);
    const [showCategoryModal2, setShowCategoryModal2] = useState(false);
    const [showCategoryModal3, setShowCategoryModal3] = useState(false);
    // 動画アップロード処理の状態
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({
        main: 0,
        sample: 0,
        ogp: 0,
        thumbnail: 0,
        images: 0
    });
    const [uploadMessage, setUploadMessage] = useState('');
    // フォームデータの状態管理
    const [formData, setFormData] = useState({
        description: '',
        genres: [],
        tags: '',
        scheduled: false,
        scheduledDate: new Date(),
        scheduledTime: '',
        formattedScheduledDateTime: '',
        expiration: false,
        expirationDate: new Date(),
        plan: false,
        plan_ids: [],
        single: false,
        mainVideo: null,
        sampleVideo: null,
        ogpImage: null,
        thumbnail: null,
        images: [],
        singlePrice: '',
    });
    // カテゴリー取得処理
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresData, categoriesData, recommendedData] = await Promise.all([
                    getGenres(),
                    getCategories(),
                    getRecommendedCategories()
                ]);
                setGenres(genresData);
                setCategories(categoriesData);
                setRecommendedCategories(recommendedData);
                try {
                    const recentData = await getRecentCategories();
                    setRecentCategories(recentData);
                }
                catch (error) {
                    console.log('Recent categories not available (user not authenticated)');
                    setRecentCategories([]);
                }
            }
            catch (error) {
                console.error('Failed to fetch categories data:', error);
            }
        };
        fetchData();
    }, []);
    // サムネイル生成
    useEffect(() => {
        if (!selectedMainFile)
            return;
        const video = document.createElement("video");
        video.src = URL.createObjectURL(selectedMainFile);
        video.crossOrigin = "anonymous"; // セキュリティ上必要な場合も
        video.currentTime = 1;
        video.addEventListener("loadeddata", () => {
            const canvas = document.createElement("canvas");
            canvas.width = SHARE_VIDEO_CONSTANTS.THUMBNAIL_SIZE;
            canvas.height = SHARE_VIDEO_CONSTANTS.THUMBNAIL_SIZE;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnailDataUrl = canvas.toDataURL("image/jpeg");
                setThumbnail(thumbnailDataUrl);
            }
        });
    }, [selectedMainFile]);
    // 日時更新処理の共通化
    const updateScheduledDateTime = (date, time) => {
        if (date) {
            setFormData(prev => ({ ...prev, scheduledDate: date }));
        }
        if (time) {
            updateFormData('scheduledTime', time);
        }
        // 日付と時間を組み合わせてフォーマット
        const currentDate = date || formData.scheduledDate;
        const currentTime = time || formData.scheduledTime;
        if (currentDate && currentTime) {
            const formattedDateTime = formatDateTime(currentDate, currentTime);
            updateFormData('formattedScheduledDateTime', formattedDateTime);
        }
    };
    // 時間選択処理の共通化
    const handleTimeSelection = (value, isHour) => {
        let finalTime;
        if (isHour) {
            // 時間選択時
            finalTime = `${value}:00`;
        }
        else {
            // 分選択時
            const currentHour = formData.scheduledTime ? formData.scheduledTime.split(':')[0] : '00';
            finalTime = `${currentHour}:${value}`;
        }
        updateScheduledDateTime(undefined, finalTime);
    };
    // ファイル処理の共通化
    const handleFileChange = (file, fileType) => {
        if (file) {
            switch (fileType) {
                case 'main':
                    setSelectedMainFile(file);
                    setPreviewMainUrl(URL.createObjectURL(file));
                    break;
                case 'sample':
                    setSelectedSampleFile(file);
                    break;
                case 'ogp':
                    setOgp(URL.createObjectURL(file));
                    break;
                case 'thumbnail':
                    // thumbnailはbase64文字列として保存するため、FileReaderを使用
                    const reader = new FileReader();
                    reader.onload = () => {
                        const imageUrl = reader.result;
                        setThumbnail(imageUrl);
                    };
                    reader.readAsDataURL(file);
                    break;
            }
        }
    };
    // ファイル削除処理の共通化
    const removeFile = (fileType) => {
        switch (fileType) {
            case 'main':
                setSelectedMainFile(null);
                if (previewMainUrl) {
                    URL.revokeObjectURL(previewMainUrl);
                    setPreviewMainUrl('');
                }
                setThumbnail(null);
                break;
            case 'sample':
                setSelectedSampleFile(null);
                if (previewSampleUrl) {
                    URL.revokeObjectURL(previewSampleUrl);
                    setPreviewSampleUrl('');
                }
                break;
            case 'ogp':
                setOgp(null);
                break;
            case 'thumbnail':
                setThumbnail(null);
                break;
        }
    };
    // 既存のファイル処理関数を保持（互換性のため）
    const handleMainVideoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        // ファイルバリデーション
        if (file.size > SHARE_VIDEO_CONSTANTS.MAX_FILE_SIZE) {
            alert(SHARE_VIDEO_VALIDATION_MESSAGES.FILE_SIZE_ERROR);
            return;
        }
        handleFileChange(file, 'main');
        setUploadMessage(''); // 前回のメッセージをクリア
    };
    const handleSampleVideoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(file, 'sample');
            const url = URL.createObjectURL(file);
            setPreviewSampleUrl(url);
            // 動画要素を一時的に生成して再生時間取得
            const video = document.createElement("video");
            video.preload = "metadata";
            video.src = url;
            video.onloadedmetadata = () => {
                const durationInSeconds = video.duration;
                const minutes = Math.floor(durationInSeconds / 60);
                const seconds = Math.floor(durationInSeconds % 60);
                setSampleDuration(formatTime(minutes, seconds));
            };
        }
    };
    const handleOgpChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileChange(file, 'ogp');
        }
    };
    const handleThumbnailChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setThumbnail(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };
    // チェックボックスの全てがtrueかどうかを判定
    const allChecked = Object.values(checks).every(Boolean);
    // 動画削除
    const removeVideo = () => {
        removeFile('main');
    };
    // サンプル動画削除
    const removeSampleVideo = () => {
        removeFile('sample');
    };
    // カットアウトモーダルを表示
    const showCutOutModal = () => {
        console.log('showCutOutModal');
    };
    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files);
            setSelectedImages(prev => [...prev, ...newImages]);
        }
    };
    const removeImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };
    // トグルスイッチの状態変更処理
    const onToggleSwitch = (field, value) => {
        // ローカル状態を更新
        if (field === 'scheduled')
            setScheduled(value);
        if (field === 'expiration')
            setExpiration(value);
        if (field === 'plan')
            setPlan(value);
        if (field === 'single')
            setSingle(value);
        // formDataも更新
        updateFormData(field, value);
        // 無効化時は関連データもクリア
        if (!value) {
            if (field === 'scheduled') {
                updateScheduledDateTime(new Date(), '');
            }
            if (field === 'expiration') {
                updateFormData('expirationDate', new Date());
            }
            if (field === 'plan') {
                updateFormData('plan_ids', '');
            }
            if (field === 'single') {
                updateFormData('singlePrice', '');
            }
        }
    };
    // フォームデータ更新関数
    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    // カテゴリー選択処理の共通化
    const handleCategorySelection = (categoryId, categoryIndex) => {
        const categoryStates = [category1, category2, category3];
        const setCategoryStates = [setCategory1, setCategory2, setCategory3];
        const setModalStates = [setShowCategoryModal1, setShowCategoryModal2, setShowCategoryModal3];
        const currentCategory = categoryStates[categoryIndex - 1];
        const newCategory = categoryId === currentCategory ? '' : categoryId;
        // カテゴリー状態を更新
        setCategoryStates[categoryIndex - 1](newCategory);
        // formData.genresを更新
        const otherCategories = categoryStates.filter((_, index) => index !== categoryIndex - 1);
        const currentGenres = otherCategories.filter(Boolean);
        if (newCategory) {
            currentGenres.push(newCategory);
        }
        updateFormData('genres', currentGenres);
        // モーダルを閉じる
        setModalStates[categoryIndex - 1](false);
    };
    // カテゴリー解除処理の共通化
    const clearCategory = (categoryIndex) => {
        const categoryStates = [category1, category2, category3];
        const setCategoryStates = [setCategory1, setCategory2, setCategory3];
        const categoryId = categoryStates[categoryIndex - 1];
        if (categoryId) {
            // カテゴリー状態をクリア
            setCategoryStates[categoryIndex - 1]('');
            // formData.genresから削除
            const otherCategories = categoryStates.filter((_, index) => index !== categoryIndex - 1);
            const updatedGenres = otherCategories.filter(Boolean);
            updateFormData('genres', updatedGenres);
        }
    };
    // 投稿データをまとめて送信（AccountEdit.tsxと同じ処理フロー）
    const handleSubmitPost = async () => {
        // TODO: 投稿プランを選択してないと422になる
        // バリデーション
        if (postType === 'video' && !selectedMainFile) {
            setUploadMessage(SHARE_VIDEO_VALIDATION_MESSAGES.MAIN_VIDEO_REQUIRED);
            return;
        }
        if (postType === 'image' && selectedImages.length === 0) {
            setUploadMessage('画像を選択してください。');
            return;
        }
        if (!formData.description.trim()) {
            setUploadMessage(SHARE_VIDEO_VALIDATION_MESSAGES.DESCRIPTION_REQUIRED);
            return;
        }
        if (!allChecked) {
            setUploadMessage(SHARE_VIDEO_VALIDATION_MESSAGES.CONFIRMATION_REQUIRED);
            return;
        }
        if (formData.scheduled && !formData.formattedScheduledDateTime) {
            setUploadMessage(SHARE_VIDEO_VALIDATION_MESSAGES.SCHEDULED_DATETIME_REQUIRED);
            return;
        }
        if (formData.expiration && !formData.expirationDate) {
            setUploadMessage(SHARE_VIDEO_VALIDATION_MESSAGES.EXPIRATION_DATE_REQUIRED);
            return;
        }
        if (formData.plan && !formData.plan_ids) {
            setUploadMessage(SHARE_VIDEO_VALIDATION_MESSAGES.PLAN_REQUIRED);
            return;
        }
        if (formData.single && !formData.singlePrice) {
            setUploadMessage(SHARE_VIDEO_VALIDATION_MESSAGES.SINGLE_PRICE_REQUIRED);
            return;
        }
        setUploading(true);
        setUploadMessage('');
        try {
            // 基本情報を登録
            const postData = {
                ...formData,
                description: formData.description,
                category_ids: formData.genres,
                tags: formData.tags,
                scheduled: formData.scheduled,
                formattedScheduledDateTime: formData.formattedScheduledDateTime ? new Date(formData.formattedScheduledDateTime) : undefined,
                expiration: formData.expiration,
                expirationDate: formData.expirationDate,
                plan: formData.plan,
                plan_ids: formData.plan_ids,
                single: formData.single,
                price: formData.singlePrice ? Number(formData.singlePrice) : undefined,
                post_type: postType,
            };
            const response = await createPost(postData);
            // 画像のpresigned URLを取得
            const { imagePresignedUrl, videoPresignedUrl } = await getPresignedUrl(response.id);
            // 2) S3 PUT（presigned URLを使用）
            const uploadFile = async (file, kind, presignedData) => {
                const header = presignedData.required_headers;
                await putToPresignedUrl(presignedData, file, header, {
                    onProgress: (pct) => setUploadProgress(prev => ({ ...prev, [kind]: pct })),
                });
            };
            if (postType === 'video') {
                // メイン動画をアップロード
                if (selectedMainFile && videoPresignedUrl.uploads?.main) {
                    await uploadFile(selectedMainFile, 'main', videoPresignedUrl.uploads.main);
                }
                // サンプル動画があればアップロード
                if (selectedSampleFile && videoPresignedUrl.uploads?.sample) {
                    await uploadFile(selectedSampleFile, 'sample', videoPresignedUrl.uploads.sample);
                }
                // サムネイル画像があればアップロード
                if (thumbnail && imagePresignedUrl.uploads?.thumbnail) {
                    // base64文字列をBlobに変換してFileオブジェクトに変換
                    const thumbnailBlob = await fetch(thumbnail).then(r => r.blob());
                    const thumbnailFile = new File([thumbnailBlob], 'thumbnail.jpg', { type: 'image/jpeg' });
                    await uploadFile(thumbnailFile, 'thumbnail', imagePresignedUrl.uploads.thumbnail);
                }
                // OGP画像があればアップロード
                if (ogp && imagePresignedUrl.uploads?.ogp) {
                    // base64文字列をBlobに変換してFileオブジェクトに変換
                    const ogpBlob = await fetch(ogp).then(r => r.blob());
                    const ogpFile = new File([ogpBlob], 'ogp.jpg', { type: 'image/jpeg' });
                    await uploadFile(ogpFile, 'ogp', imagePresignedUrl.uploads.ogp);
                }
                // 画像投稿の場合もサムネイル画像があればアップロード
                if (thumbnail && imagePresignedUrl.uploads?.thumbnail) {
                    // base64文字列をBlobに変換してFileオブジェクトに変換
                    const thumbnailBlob = await fetch(thumbnail).then(r => r.blob());
                    const thumbnailFile = new File([thumbnailBlob], 'thumbnail.jpg', { type: 'image/jpeg' });
                    await uploadFile(thumbnailFile, 'thumbnail', imagePresignedUrl.uploads.thumbnail);
                }
            }
            else if (postType === 'image') {
                if (selectedImages.length > 0 && imagePresignedUrl.uploads?.images) {
                    const imageUploads = Array.isArray(imagePresignedUrl.uploads.images)
                        ? imagePresignedUrl.uploads.images
                        : [imagePresignedUrl.uploads.images];
                    for (let i = 0; i < selectedImages.length && i < imageUploads.length; i++) {
                        await uploadFile(selectedImages[i], 'images', imageUploads[i]);
                        // 画像投稿の場合もサムネイル画像があればアップロード
                        if (thumbnail && imagePresignedUrl.uploads?.thumbnail) {
                            // base64文字列をBlobに変換してFileオブジェクトに変換
                            const thumbnailBlob = await fetch(thumbnail).then(r => r.blob());
                            const thumbnailFile = new File([thumbnailBlob], 'thumbnail.jpg', { type: 'image/jpeg' });
                            await uploadFile(thumbnailFile, 'thumbnail', imagePresignedUrl.uploads.thumbnail);
                        }
                    }
                }
            }
            setUploadMessage(postType === 'video' ? '動画の投稿が完了しました！' : '画像の投稿が完了しました！');
            navigate(`/top`);
            return;
        }
        catch (error) {
            console.error('投稿エラー:', error);
            setUploadMessage('投稿に失敗しました。時間をおいて再試行してください。');
        }
        finally {
            setUploading(false);
            // プログレスバーをリセット
            setUploadProgress({
                main: 0,
                sample: 0,
                ogp: 0,
                thumbnail: 0,
                images: 0
            });
        }
    };
    // プレシジョンURLを取得
    const getPresignedUrl = async (postId) => {
        // 画像類のリクエスト内容整理
        const imagePresignedUrlRequest = {
            files: [
                ...(thumbnail ? [{
                        post_id: postId,
                        kind: 'thumbnail',
                        content_type: 'image/jpeg',
                        ext: 'jpg',
                    }] : []),
                ...(ogp ? [{
                        post_id: postId,
                        kind: 'ogp',
                        content_type: 'image/jpeg',
                        ext: 'jpg',
                    }] : []),
                ...(postType === 'image' && selectedImages.length > 0 ?
                    selectedImages.map((image, index) => ({
                        post_id: postId,
                        kind: 'images',
                        content_type: image.type,
                        ext: mimeToImageExt(image.type),
                    })) : [])
            ]
        };
        // 動画類のリクエスト内容整理
        const videoPresignedUrlRequest = {
            files: [
                ...(postType === 'video' && selectedMainFile ? [{
                        post_id: postId,
                        kind: 'main',
                        content_type: selectedMainFile.type || 'video/mp4',
                        ext: mimeToExt(selectedMainFile.type || 'video/mp4'),
                    }] : []),
                ...(postType === 'video' && selectedSampleFile ? [{
                        post_id: postId,
                        kind: 'sample',
                        content_type: selectedSampleFile.type,
                        ext: mimeToExt(selectedSampleFile.type),
                    }] : [])
            ]
        };
        const imagePresignedUrl = await postImagePresignedUrl(imagePresignedUrlRequest);
        const videoPresignedUrl = postType === 'video' && videoPresignedUrlRequest.files.length > 0 ? await postVideoPresignedUrl(videoPresignedUrlRequest) : { uploads: {} };
        return {
            imagePresignedUrl,
            videoPresignedUrl,
        };
    };
    // ファイルリセット関数を追加
    const resetAllFiles = () => {
        // 動画関連のリセット
        setSelectedMainFile(null);
        if (previewMainUrl) {
            URL.revokeObjectURL(previewMainUrl);
            setPreviewMainUrl(null);
        }
        setSelectedSampleFile(null);
        if (previewSampleUrl) {
            URL.revokeObjectURL(previewSampleUrl);
            setPreviewSampleUrl(null);
        }
        setSampleDuration(null);
        // 画像関連のリセット
        setSelectedImages([]);
        setOgp(null);
        setOgpPreview(null);
        setThumbnail(null);
        // メッセージのリセット
        setUploadMessage('');
    };
    // セグメントボタンのクリックハンドラーを修正
    const handlePostTypeChange = (type) => {
        // 現在のタイプと同じ場合は何もしない
        if (postType === type)
            return;
        // ファイルをリセット
        resetAllFiles();
        // 投稿タイプを変更
        setPostType(type);
    };
    return (_jsxs("div", { className: "w-full max-w-lg bg-white space-y-6", children: [_jsx("h1", { className: "text-xl font-semibold text-center border-b-2 border-primary pb-4", children: "\u65B0\u898F\u6295\u7A3F" }), _jsxs("div", { className: "flex bg-gray-100 rounded-lg p-1", children: [_jsx("button", { className: `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${postType === 'video' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`, onClick: () => handlePostTypeChange('video'), children: "\u52D5\u753B\u6295\u7A3F" }), _jsx("button", { className: `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${postType === 'image' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`, onClick: () => handlePostTypeChange('image'), children: "\u753B\u50CF\u6295\u7A3F" })] }), postType === 'video' ? (_jsxs(_Fragment, { children: [_jsx(MainVideoSection, { selectedMainFile: selectedMainFile, previewMainUrl: previewMainUrl, thumbnail: thumbnail, uploading: uploading, uploadProgress: uploadProgress, uploadMessage: uploadMessage, onFileChange: handleMainVideoChange, onThumbnailChange: handleThumbnailChange, onRemove: removeVideo }), selectedMainFile && (_jsxs(_Fragment, { children: [_jsx(SampleVideoSection, { isSample: isSample, previewSampleUrl: previewSampleUrl, sampleDuration: sampleDuration, onSampleTypeChange: (value) => setIsSample(value), onFileChange: handleSampleVideoChange, onRemove: removeSampleVideo, onEdit: showCutOutModal }), _jsx(OgpImageSection, { ogp: ogp, onFileChange: handleOgpChange })] }))] })) : (_jsxs(_Fragment, { children: [_jsx(ImagePostSection, { selectedImages: selectedImages, uploading: uploading, uploadProgress: uploadProgress, uploadMessage: uploadMessage, onFileChange: handleImageChange, onRemove: removeImage }), _jsx(ThumbnailSection, { thumbnail: thumbnail, uploadProgress: uploadProgress.thumbnail, onThumbnailChange: handleThumbnailChange, onRemove: () => setThumbnail(null) })] })), _jsx(DescriptionSection, { description: formData.description, onChange: (value) => updateFormData('description', value) }), _jsx(CategorySection, { category1: category1, category2: category2, category3: category3, showCategoryModal1: showCategoryModal1, showCategoryModal2: showCategoryModal2, showCategoryModal3: showCategoryModal3, categories: categories, genres: genres, recommendedCategories: recommendedCategories, recentCategories: recentCategories, expandedGenres: expandedGenres, onCategorySelect: handleCategorySelection, onCategoryClear: clearCategory, onExpandedGenresChange: setExpandedGenres, onModalOpenChange1: setShowCategoryModal1, onModalOpenChange2: setShowCategoryModal2, onModalOpenChange3: setShowCategoryModal3 }), _jsx(TagsSection, { tags: formData.tags, onChange: (value) => updateFormData('tags', value) }), _jsx(SettingsSection, { scheduled: scheduled, expiration: expiration, plan: plan, single: single, scheduledDate: formData.scheduledDate, scheduledTime: formData.scheduledTime, expirationDate: formData.expirationDate, selectedPlanId: selectedPlanId, selectedPlanName: selectedPlanName, singlePrice: formData.singlePrice || '', showPlanSelector: showPlanSelector, onToggleSwitch: onToggleSwitch, onScheduledDateChange: (date) => updateScheduledDateTime(date, formData.scheduledTime), onScheduledTimeChange: handleTimeSelection, onExpirationDateChange: (date) => updateFormData('expirationDate', date), onPlanSelect: (planId, planName) => {
                    // 既に選択されているプランかチェック
                    if (selectedPlanId.includes(planId)) {
                        // 既に選択済みの場合は削除
                        const newPlanIds = selectedPlanId.filter(id => id !== planId);
                        const newPlanNames = selectedPlanName.filter((_, index) => selectedPlanId[index] !== planId);
                        setSelectedPlanId(newPlanIds);
                        setSelectedPlanName(newPlanNames);
                        updateFormData('plan_ids', newPlanIds);
                    }
                    else {
                        // 新しく追加
                        const newPlanIds = [...selectedPlanId, planId];
                        const newPlanNames = [...selectedPlanName, planName || ''];
                        setSelectedPlanId(newPlanIds);
                        setSelectedPlanName(newPlanNames);
                        updateFormData('plan_ids', newPlanIds);
                    }
                    setShowPlanSelector(false);
                }, onPlanRemove: (index) => {
                    const newPlanIds = selectedPlanId.filter((_, i) => i !== index);
                    const newPlanNames = selectedPlanName.filter((_, i) => i !== index);
                    setSelectedPlanId(newPlanIds);
                    setSelectedPlanName(newPlanNames);
                    updateFormData('plan_ids', newPlanIds);
                }, onPlanClear: () => {
                    setSelectedPlanId([]);
                    setSelectedPlanName([]);
                    updateFormData('plan_ids', []);
                }, onSinglePriceChange: (value) => updateFormData('singlePrice', value), onPlanSelectorOpen: () => setShowPlanSelector(true), onPlanSelectorClose: () => setShowPlanSelector(false) }), _jsx(ConfirmationSection, { checks: checks, onCheckChange: (field, value) => setChecks({ ...checks, [field]: value }) }), _jsx("div", { className: "m-4", children: _jsx(Button, { onClick: handleSubmitPost, disabled: !allChecked || uploading, className: "w-full bg-primary hover:bg-primary/90 text-white", children: uploading ? '投稿中...' : '投稿する' }) }), _jsx(FooterSection, {})] }));
}
