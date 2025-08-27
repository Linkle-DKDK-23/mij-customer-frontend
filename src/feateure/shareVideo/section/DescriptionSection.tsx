import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DescriptionSectionProps } from '@/feateure/shareVideo/types';

export default function DescriptionSection({
	description,
	onChange,
}: DescriptionSectionProps) {
	return (
		<div className="space-y-2 pr-5 pl-5">
			<Label htmlFor="description" className="text-sm font-medium font-bold">
				<span className="text-primary mr-1">*</span>説明文
			</Label>
			<Textarea
				id="description"
				value={description}
				onChange={(e) => onChange(e.target.value)}
				placeholder="説明文を入力"
				className="resize-none border border-muted focus:outline-none focus:ring-0 focus:border-primary focus:border-2 shadow-none"
			/>
		</div>
	);
} 