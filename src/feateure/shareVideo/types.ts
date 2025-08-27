import { Category, Genre } from "@/api/endpoints/categories";


// カテゴリーセクションの型定義
export interface CategorySectionProps {
	category1: string;
	category2: string;
	category3: string;
	showCategoryModal1: boolean;
	showCategoryModal2: boolean;
	showCategoryModal3: boolean;
	categories: Category[];
	genres: Genre[];
	recommendedCategories: Category[];
	recentCategories: Category[];
	expandedGenres: string[];
	onCategorySelect: (categoryId: string, categoryIndex: 1 | 2 | 3) => void;
	onCategoryClear: (categoryIndex: 1 | 2 | 3) => void;
	onExpandedGenresChange: (expandedGenres: string[]) => void;
	onModalOpenChange1: (open: boolean) => void;
	onModalOpenChange2: (open: boolean) => void;
	onModalOpenChange3: (open: boolean) => void;
}

// 確認項目セクションの型定義
export interface ConfirmationSectionProps {
	checks: {
		confirm1: boolean;
		confirm2: boolean;
		confirm3: boolean;
	};
	onCheckChange: (field: 'confirm1' | 'confirm2' | 'confirm3', value: boolean) => void;
}

// 説明文セクションの型定義
export interface DescriptionSectionProps {
	description: string;
	onChange: (value: string) => void;
}

// メイン動画セクションの型定義
export interface MainVideoSectionProps {
	selectedMainFile: File | null;
	previewMainUrl: string | null;
	thumbnail: string | null;
	uploading: boolean;
	uploadProgress: Record<string, number>;
	uploadMessage: string;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemove: () => void;
	onUpload: () => void;
}


// OGP画像セクションの型定義
export interface OgpImageSectionProps {
	ogp: string | null;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// サンプル動画セクションの型定義
export interface SampleVideoSectionProps {
	isSample: 'upload' | 'cut_out';
	previewSampleUrl: string | null;
	sampleDuration: string | null;
	onSampleTypeChange: (value: 'upload' | 'cut_out') => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemove: () => void;
	onEdit: () => void;
}


// 動画設定セクションの型定義
export interface SettingsSectionProps {
	scheduled: boolean;
	expiration: boolean;
	plan: boolean;
	single: boolean;
	scheduledDate: Date;
	scheduledTime: string;
	expirationDate: Date;
	selectedPlanId: string[];
	selectedPlanName: string[];
	singlePrice: string;
	showPlanSelector: boolean;
	onToggleSwitch: (field: 'scheduled' | 'expiration' | 'plan' | 'single', value: boolean) => void;
	onScheduledDateChange: (date: Date) => void;
	onScheduledTimeChange: (value: string, isHour: boolean) => void;
	onExpirationDateChange: (date: Date) => void;
	onPlanSelect: (planId: string, planName?: string) => void;
	onPlanRemove: (index: number) => void;
	onPlanClear: () => void;
	onSinglePriceChange: (value: string) => void;
	onPlanSelectorOpen: () => void;
	onPlanSelectorClose: () => void;
}

// タグセクションの型定義
export interface TagsSectionProps {
	tags: string;
	onChange: (value: string) => void;
}
