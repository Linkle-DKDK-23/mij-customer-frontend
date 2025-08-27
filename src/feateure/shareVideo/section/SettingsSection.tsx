import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithPopover } from "@/components/common/DatePickerWithPopover";
import PlanSelector from '@/feateure/shareVideo/componets/PlanSelector';
import { SettingsSectionProps } from '@/feateure/shareVideo/types';

export default function SettingsSection({
	scheduled,
	expiration,
	plan,
	single,
	scheduledDate,
	scheduledTime,
	expirationDate,
	selectedPlanId,
	selectedPlanName,
	singlePrice,
	showPlanSelector,
	onToggleSwitch,
	onScheduledDateChange,
	onScheduledTimeChange,
	onExpirationDateChange,
	onPlanSelect,
	onPlanRemove,
	onPlanClear,
	onSinglePriceChange,
	onPlanSelectorOpen,
	onPlanSelectorClose,
}: SettingsSectionProps) {
	return (
		<>
			<div className="space-y-4 p-5">
				{/* 予約投稿 */}
				<ToggleRow 
					label="予約投稿" 
					id="scheduled" 
					checked={scheduled}
					onChangeToggle={(v) => onToggleSwitch('scheduled', v)}
				/>
				{scheduled && (
					<div className="flex items-center space-x-2 w-full">
						{/* 日付入力欄：60% */}
						<DatePickerWithPopover 
							value={scheduledDate} 
							onChange={onScheduledDateChange} 
						/>
					
						{/* 時間選択：40% */}
						<div className="flex items-center space-x-2 basis-2/5 flex-shrink-0">
							<Select onValueChange={(value) => onScheduledTimeChange(value, true)}>
								<SelectTrigger className="w-[80px]">
									<SelectValue placeholder="時" />
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
					
							<Select onValueChange={(value) => onScheduledTimeChange(value, false)}>
								<SelectTrigger className="w-[80px]">
									<SelectValue placeholder="分" />
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

				{/* 公開期限 */}
				<ToggleRow 
					label="公開期限" 
					id="expiration" 
					checked={expiration}
					onChangeToggle={(v) => onToggleSwitch('expiration', v)}
				/>
				{expiration && (
					<div className="flex items-center space-x-2 w-full">
						<DatePickerWithPopover 
							value={expirationDate} 
							onChange={onExpirationDateChange} 
						/>
					</div>
				)}

				{/* プランに追加 */}
				<ToggleRow 
					label="プランに追加" 
					id="plan" 
					checked={plan}
					onChangeToggle={(v) => onToggleSwitch('plan', v)}
				/>
				{plan && (
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">
								{selectedPlanId.length > 0 ? `${selectedPlanId.length}つのプランを選択済み` : 'プランを選択してください'}
							</span>
							<div className="flex space-x-2">
								<Button
									variant="outline"
									size="sm"
									onClick={onPlanSelectorOpen}
								>
									{selectedPlanId.length > 0 ? '追加・変更' : '選択'}
								</Button>
								{selectedPlanId.length > 0 && (
									<Button
										variant="outline"
										size="sm"
										onClick={onPlanClear}
									>
										全解除
									</Button>
								)}
							</div>
						</div>
						{selectedPlanId.length > 0 && (
							<div className="space-y-1">
								{selectedPlanId.map((planId, index) => (
									<div key={planId} className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2 rounded">
										<span>選択中: {selectedPlanName[index] || `プランID: ${planId}`}</span>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onPlanRemove(index)}
											className="h-6 px-2 text-xs text-red-500 hover:text-red-700"
										>
											削除
										</Button>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{/* 単品販売 */}
				<ToggleRow 
					label="単品販売" 
					id="single" 
					checked={single}
					onChangeToggle={(v) => onToggleSwitch('single', v)}
				/>
				{single && (
					<div className="space-y-2">
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
							<Input 
								id="single-price" 
								type="number" 
								className="pl-8"
								placeholder="0"
								value={singlePrice || ''}
								onChange={(e) => onSinglePriceChange(e.target.value)}
							/>
						</div>
					</div>
				)}
			</div>

			{/* プランセレクター */}
			{showPlanSelector && (
				<PlanSelector
					selectedPlanId={selectedPlanId}
					onPlanSelect={onPlanSelect}
					onClose={onPlanSelectorClose}
				/>
			)}
		</>
	);
}

// 補助コンポーネント：ToggleRow
function ToggleRow({ 
	label, 
	id, 
	checked, 
	onChangeToggle 
}: { 
	label: string; 
	id: string; 
	checked: boolean; 
	onChangeToggle: (v: boolean) => void; 
}) {
	return (
		<div className="flex items-center justify-between">
			<Label htmlFor={id} className="text-sm font-medium font-bold">{label}</Label>
			<Switch id={id} checked={checked} onCheckedChange={onChangeToggle} />
		</div>
	);
} 