export const SHARE_VIDEO_CONSTANTS = {
	MAX_FILE_SIZE: 500 * 1024 * 1024, // 500MB
	THUMBNAIL_SIZE: 96,
	CATEGORY_COUNT: 3,
} as const;

export const SHARE_VIDEO_VALIDATION_MESSAGES = {
	MAIN_VIDEO_REQUIRED: 'メイン動画を選択してください',
	DESCRIPTION_REQUIRED: '説明文を入力してください',
	CONFIRMATION_REQUIRED: '確認項目にチェックを入れてください',
	SCHEDULED_DATETIME_REQUIRED: '公開予約日時を設定してください',
	EXPIRATION_DATE_REQUIRED: '公開終了日時を設定してください',
	PLAN_REQUIRED: 'プランを選択してください',
	SINGLE_PRICE_REQUIRED: '単発料金を設定してください',
	FILE_SIZE_ERROR: 'ファイルサイズは 500MB 以下にしてください',
} as const;