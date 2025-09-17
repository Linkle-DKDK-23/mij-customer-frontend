import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TagsSectionProps } from '@/feateure/shareVideo/types';

export default function TagsSection({
	tags,
	onChange,
}: TagsSectionProps) {
	return (
		<div className="space-y-2 border-b-2 border-primary pb-5 pr-5 pl-5">
			<Label htmlFor="tags" className="text-sm font-medium font-bold">タグ</Label>
			<Input 
				id="tags" 
				value={tags}
				onChange={(e) => onChange(e.target.value)}
				placeholder="タグを入力" 
			/>
		</div>
	);
} 