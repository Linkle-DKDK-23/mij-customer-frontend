import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ConfirmationSectionProps } from '@/feateure/shareVideo/types';


export default function ConfirmationSection({
	checks,
	onCheckChange,
}: ConfirmationSectionProps) {
	return (
		<div className="space-y-4 m-4 p-4 bg-secondary rounded-md">
			<CheckRow
				id="confirm1"
				checked={checks.confirm1}
				onChange={(v) => onCheckChange('confirm1', v)}
				label="投稿内容が著作権や肖像権の侵害にあたらないことを確認しました"
			/>
			<CheckRow
				id="confirm2"
				checked={checks.confirm2}
				onChange={(v) => onCheckChange('confirm2', v)}
				label="投稿内容に未成年者が写っていないこと、また未成年者を連想させる表現等が含まれていないことを確認しました"
			/>
			<CheckRow
				id="confirm3"
				checked={checks.confirm3}
				onChange={(v) => onCheckChange('confirm3', v)}
				label="性表現には十分に配慮してモザイク処理を行っていることを確認しました"
			/>
			<a href="#" className="text-sm text-primary underline">
				モザイクのガイドラインを見る
			</a>
		</div>
	);
}

// CheckRow 補助コンポーネント
function CheckRow({
	id,
	checked,
	onChange,
	label,
}: {
	id: string;
	checked: boolean;
	onChange: (v: boolean) => void;
	label: string;
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
	);
} 