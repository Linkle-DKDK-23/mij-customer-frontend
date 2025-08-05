// react要素をインポート
import React, { useState, useEffect, useCallback,useRef } from 'react';

// コンポーネントをインポート
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ThumbnailPreview from "@/components/custome/ThumbnailPreview"
import MainStreemUploadArea from "@/components/custome/MainStreemUploadArea"
import SampleStreemUploadArea from "@/components/custome/SampleStreemUploadArea"
import OgpPreview from "@/components/custome/OgpPreview"
import OgpUploadArea from "@/components/custome/OgpUploadArea,"
import { DatePickerWithPopover } from "@/components/custome/DatePickerWithPopover"

export default function ShareVideo() {

	const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
	const [previewMainUrl, setPreviewMainUrl] = useState<string | null>(null)
	const [selectedSampleFile, setSelectedSampleFile] = useState<File | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
	const [ogp, setOgp] = useState<string | null>(null);
	const [ogpPreview, setOgpPreview] = useState<string | null>(null);
	const [previewSampleUrl, setPreviewSampleUrl] = useState<string | null>(null)
	const [sampleDuration, setSampleDuration] = useState<string | null>(null);
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const [isSample, setIsSample] = useState<'upload' | 'cut_out'>('upload');
	const [scheduled, setScheduled] = useState(false);
	const [expiration, setExpiration] = useState(false);
	const [plan, setPlan] = useState(false);
	const [single, setSingle] = useState(false);
	const [checks, setChecks] = useState({
    confirm1: false,
    confirm2: false,
    confirm3: false,
  })

	// サムネイル生成
	useEffect(() => {
		if (!selectedMainFile) return;
	
		const video = document.createElement("video");
		video.src = URL.createObjectURL(selectedMainFile);
		video.crossOrigin = "anonymous"; // セキュリティ上必要な場合も
		video.currentTime = 1;
	
		video.addEventListener("loadeddata", () => {
			const canvas = document.createElement("canvas");
			canvas.width = 96; 
			canvas.height = 96;
	
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				const thumbnailDataUrl = canvas.toDataURL("image/jpeg");
				setThumbnail(thumbnailDataUrl);
			}
		});
	}, [selectedMainFile]);

	// サムネイル変更
	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const imageUrl = reader.result as string;
				setThumbnail(imageUrl);
			};
			reader.readAsDataURL(file);
		}
	};

	// 動画アップロード
	const handleMainVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedMainFile(file);
			setPreviewMainUrl(URL.createObjectURL(file));
		}
	};

	// サンプル動画アップロード
	const handleSampleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
	
		if (file) {
			setSelectedSampleFile(file);
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
				const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
				setSampleDuration(formatted);
			};
		}
	};

	// OGP画像変更
	const handleOgpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setOgp(URL.createObjectURL(file));
		}
	}

	// チェックボックスの全てがtrueかどうかを判定
	const allChecked = Object.values(checks).every(Boolean)

	// 動画削除
	const removeVideo = () => {
		setSelectedMainFile(null);
		setPreviewMainUrl(null);
		setThumbnail(null);
	}

	// サンプル動画削除
	const removeSampleVideo = () => {
		setSelectedSampleFile(null);
		setPreviewSampleUrl(null);
	}

	// カットアウトモーダルを表示
	const showCutOutModal = () => {
		console.log('showCutOutModal')
	}

	// トグルスイッチの状態を変更
	const onToggleSwitch = (id: string, v: boolean) => {
		switch (id) {
			case 'scheduled': setScheduled(v); break;
			case 'expiration': setExpiration(v); break;
			case 'plan': setPlan(v); break;
			case 'single': setSingle(v); break;
		}
	}


	return (
		<div className="w-full max-w-lg bg-white space-y-6">
			{/* タイトル */}
			<h1 className="text-xl font-semibold text-center border-b-2 border-primary pb-4">新規投稿</h1>

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
						<ThumbnailPreview thumbnail={thumbnail} onRemove={removeVideo} onChange={handleThumbnailChange} />
					)
				) : (
					<MainStreemUploadArea onFileChange={handleMainVideoChange} />
				)}
			</div>

			{selectedMainFile && (

				<>
				<div className="space-y-2 pr-5 pl-5 border-t border-primary pt-5 pb-5">
					<Label htmlFor="sample-video" className="text-sm font-medium font-bold">
						<span className="text-primary mr-1">*</span>サンプル動画を設定する
					</Label>

					<RadioGroup defaultValue="upload" onValueChange={(value) => setIsSample(value as 'upload' | 'cut_out')} className="space-y-2">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="upload" id="sample-upload" />
							<Label htmlFor="sample-upload">サンプルから動画をアップロード</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="cut_out" id="sample-cut_out" />
							<Label htmlFor="sample-cut_out">本編動画から指定</Label>
						</div>
					</RadioGroup>


					<div className="flex items-center bg-secondary rounded-md space-x-4 p-5">
						{/* サンプル動画をアップロード */}
						{isSample === 'upload' && (	
							<div className="flex flex-col rounded-md p-2 items-center justify-center w-full space-y-2">
								{previewSampleUrl ? (
									<div className="flex flex-col rounded-md p-2 items-center justify-center w-full space-y-2">
										<div className="flex items-center justify-between w-full">
											<span className="text-sm font-medium font-bold">再生時間: {sampleDuration}</span>
											<Button 
												variant="default" 
												size="sm" 
												className="text-xs"
												onClick={() => removeSampleVideo()}
											>動画を削除</Button>
										</div>
										<video
											src={previewSampleUrl}
											controls
										/>
									</div>
								) : (
									<div className="flex flex-col border border-primary rounded-md p-2 items-center justify-center w-full space-y-2">
										<SampleStreemUploadArea onFileChange={handleSampleVideoChange} />
										<span className="text-sm font-medium font-bold text-primary">サンプル動画をアップロード</span>
										<p className="text-xs text-muted-foreground">ファイル容量500MBまで、最長5分の動画がアップロード可能です。</p>
									</div>
								)}
							</div>
							
						)}

						{isSample === 'cut_out' && (
							<div className="flex items-center w-full justify-between space-x-2">
								<Label htmlFor="sample-cut_out" className="text-sm font-medium font-bold">
									<span className="text-primary mr-1">*</span>サンプル動画を設定する
								</Label>
								<Button
									variant="default"
									size="sm"
									className="text-xs"
									onClick={() => showCutOutModal()}
								>編集</Button>
							</div>
						)}
					</div>
				</div>
				

				<div className="space-y-2 pr-5 pl-5 border-t border-b border-primary pt-5 pb-5">
					<Label htmlFor="ogp-image" className="text-sm font-medium font-bold">
						<span className="text-primary mr-1">*</span>OGP画像を設定する
					</Label>

					{ogp ? (
						<OgpPreview ogp={ogp} onChange={handleOgpChange} />
					) : (
						<OgpUploadArea onFileChange={handleOgpChange} />
					)}
					<ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1 mt-2">
						<li>OGP画像とはSNSなどでリンクを貼った際に表示される画像です。推奨サイズは1200✕630ピクセルです。</li>
						<li>設定すると審査対象となり、利用規約違反があった場合は、予告なくアカウントが凍結される可能性があります。</li>
					</ul>
				</div>
				</>
			)}

			{/* 説明文 */}
			<div className="space-y-2 pr-5 pl-5">
				<Label htmlFor="description" className="text-sm font-medium font-bold">
					<span className="text-primary mr-1">*</span>説明文
				</Label>
				<Textarea
					id="description"
					placeholder="説明文を入力"
					className="resize-none border border-muted focus:outline-none focus:ring-0 focus:border-primary focus:border-2 shadow-none"
				/>
			</div>

			{/* ジャンルセレクト */}
			<div className="space-y-2 pr-5 pl-5">
				<Label className="text-sm font-medium font-bold">
					<span className="text-primary mr-1">*</span>ジャンル（必ず1つは指定してください）
				</Label>

				{/* ジャンル1 */}
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="ジャンル1" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="music">音楽</SelectItem>
						<SelectItem value="art">アート</SelectItem>
						<SelectItem value="fitness">フィットネス</SelectItem>
					</SelectContent>
				</Select>

				{/* ジャンル2 */}
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="ジャンル2" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="music">音楽</SelectItem>
						<SelectItem value="art">アート</SelectItem>
						<SelectItem value="fitness">フィットネス</SelectItem>
					</SelectContent>
				</Select>

				{/* ジャンル3 */}
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="ジャンル3" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="music">音楽</SelectItem>
						<SelectItem value="art">アート</SelectItem>
						<SelectItem value="fitness">フィットネス</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* タグ入力 */}
			<div className="space-y-2 border-b-2 border-primary pb-5 pr-5 pl-5">
				<Label htmlFor="tags" className="text-sm font-medium font-bold">タグ</Label>
				<Input id="tags" placeholder="タグを入力" />
			</div>

			{/* トグルスイッチ一覧 */}
			<div className="space-y-4 p-5">
				<ToggleRow 
					label="予約投稿" 
					id="scheduled" 
					checked={scheduled}
					onChangeToggle={(v) => onToggleSwitch('scheduled', v)}
				/>
				{scheduled && (
					<div className="flex items-center space-x-2 w-full">
					{/* 日付入力欄：60% */}
					<DatePickerWithPopover value={selectedDate} onChange={setSelectedDate} />
				
					{/* 時間選択：40% */}
					<div className="flex items-center space-x-2 basis-2/5 flex-shrink-0">
						<Select>
							<SelectTrigger className="w-[80px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{Array.from({ length: 24 }, (_, i) => (
									<SelectItem key={i} value={i.toString()}>
										{i.toString().padStart(2, "0")}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<span className="text-sm font-medium font-bold">時</span>
				
						<Select>
							<SelectTrigger className="w-[80px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{Array.from({ length: 60 }, (_, i) => (
									<SelectItem key={i} value={i.toString()}>
										{i.toString().padStart(2, "0")}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<span className="text-sm font-medium font-bold">分</span>
					</div>
				</div>
				)}
				<ToggleRow 
					label="公開期限" 
					id="expiration" 
					checked={expiration}
					onChangeToggle={(v) => onToggleSwitch('expiration', v)}
				/>
				{expiration && (
					<div className="flex items-center space-x-2 w-full">
						<DatePickerWithPopover value={selectedDate} onChange={setSelectedDate} />
					</div>
				)}
				<ToggleRow 
					label="プランに追加" 
					id="plan" 
					checked={plan}
					onChangeToggle={(v) => onToggleSwitch('plan', v)}
				/>
				{plan && (
					<div className="space-y-2">
						<Label htmlFor="plan-date" className="text-sm font-medium font-bold">
							<span className="text-primary mr-1">*</span>プランに追加
						</Label>
						<Input id="plan-date" type="datetime-local" />
					</div>
				)}
				<ToggleRow label="単品販売" id="single" 
					checked={single}
					onChangeToggle={(v) => onToggleSwitch('single', v)}
				/>
				{single && (
					<div className="space-y-2">
						<Label htmlFor="single-date" className="text-sm font-medium font-bold">
							<span className="text-primary mr-1">*</span>単品販売
						</Label>
						<Input id="single-date" type="datetime-local" />
					</div>
				)}
			</div>

			 {/* ✅ チェック項目 */}
			 <div className="space-y-4 m-4 p-4 bg-secondary rounded-md">
        <CheckRow
          id="confirm1"
          checked={checks.confirm1}
          onChange={(v) => setChecks({ ...checks, confirm1: v })}
          label="投稿内容が著作権や肖像権の侵害にあたらないことを確認しました"
        />
        <CheckRow
          id="confirm2"
          checked={checks.confirm2}
          onChange={(v) => setChecks({ ...checks, confirm2: v })}
          label="投稿内容に未成年者が写っていないこと、また未成年者を連想させる表現等が含まれていないことを確認しました"
        />
        <CheckRow
          id="confirm3"
          checked={checks.confirm3}
          onChange={(v) => setChecks({ ...checks, confirm3: v })}
          label="性表現には十分に配慮してモザイク処理を行っていることを確認しました"
        />
        <a href="#" className="text-sm text-primary underline">
          モザイクのガイドラインを見る
        </a>
      </div>

      {/* ✅ 投稿ボタン */}
			<div className="m-4">
				<Button disabled={!allChecked} className="w-full">
					投稿する
				</Button>
			</div>

			{/* フッター */}
			<ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1 m-4">
				<li>利用規約に則したコンテンツの投稿をお願いいたします。</li>
				<li>利用規約に則したコンテンツの投稿をお願いいたします。</li>
				<li>モザイク処理を行っていないコンテンツはわいせつ物頒布等となり犯罪行為ですのでおやめください。</li>
				<li>性器や挿入箇所へのモザイク修正が行われていない場合、全ての投稿を削除する可能性があります。</li>
			</ul>


		</div>
	);
}

// 🔧 補助コンポーネント：ToggleRow
function ToggleRow({ label, id, checked, onChangeToggle }: { label: string; id: string; checked: boolean; onChangeToggle: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="text-sm font-medium font-bold">{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onChangeToggle} />
    </div>
  )
}

// ✅ CheckRow 補助コンポーネント
function CheckRow({
  id,
  checked,
  onChange,
  label,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="mt-1"
      />
      <Label htmlFor={id} className="text-sm leading-relaxed">
        {label}
      </Label>
    </div>
  )
}