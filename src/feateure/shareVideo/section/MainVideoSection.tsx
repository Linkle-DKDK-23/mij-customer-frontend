import React from 'react';
import { Button } from "@/components/ui/button";
import ThumbnailPreview from "@/feateure/shareVideo/componets/ThumbnailPreview";
import MainStreemUploadArea from "@/components/common/MainStreemUploadArea";
import { MainVideoSectionProps } from '@/feateure/shareVideo/types';

export default function MainVideoSection({
	selectedMainFile,
	previewMainUrl,
	thumbnail,
	uploading,
	uploadProgress,
	uploadMessage,
	onFileChange,
	onThumbnailChange,
	onRemove,
	onUpload,
}: MainVideoSectionProps) {
	return (
		<>
			{/* プレビュー表示 */}
			<div className="w-full">
				{previewMainUrl && (
					<video
						src={previewMainUrl}
						controls
						className="w-full rounded-md shadow-md"
					/>
				)}
			</div>

			{/* サムネイル画像（アップロードエリア風） */}
			<div className="flex items-center space-x-4 p-5">
				{selectedMainFile ? (
					thumbnail && (
						<ThumbnailPreview 
							thumbnail={thumbnail} 
							onRemove={onRemove} 
							onChange={onThumbnailChange} 
						/>
					)
				) : (
					<MainStreemUploadArea onFileChange={onFileChange} />
				)}
			</div>

			{/* アップロード処理 */}
			{selectedMainFile && onUpload && (
				<div className="space-y-4 p-5 border-t border-primary pt-5">
					<Button
						onClick={onUpload}
						disabled={uploading}
						className="w-full bg-primary hover:bg-primary/90 text-white"
					>
						{uploading ? 'アップロード中...' : '動画をアップロード'}
					</Button>

					{/* プログレスバー */}
					{uploading && (
						<div className="w-full bg-gray-200 rounded-full h-2.5">
							<div
								className="bg-primary h-2.5 rounded-full transition-all duration-300"
								style={{ width: `${uploadProgress.main || 0}%` }}
							/>
						</div>
					)}

					{/* アップロードメッセージ */}
					{uploadMessage && (
						<div className={`p-3 rounded-md text-sm ${
							uploadMessage.includes('完了') 
								? 'bg-green-50 text-green-700 border border-green-200' 
								: 'bg-red-50 text-red-700 border border-green-200'
						}`}>
							{uploadMessage}
						</div>
					)}
				</div>
			)}
		</>
	);
} 