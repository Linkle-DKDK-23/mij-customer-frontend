import { useState } from 'react';

export default function Confirmation({ showAgeVerification, setShowAgeVerification }: { showAgeVerification: boolean, setShowAgeVerification: (showAgeVerification: boolean) => void }) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#F81775] mb-2">Mij</h1>
          <p className="text-gray-600 text-sm">Creator Content Platform</p>
        </div>

        {/* Age verification warning */}
        <div className="mb-8">
          <div className="bg-[#F81775]/10 border border-[#F81775]/20 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">年齢確認</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このコンテンツは18歳以上の方を対象としています。<br />
              あなたは18歳以上ですか？
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowAgeVerification(false)}
              className="w-full bg-[#F81775] text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:bg-[#e6156a] hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              はい
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full border-2 border-[#F81775] text-[#F81775] font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 hover:bg-[#F81775]/5 hover:scale-[1.02] active:scale-[0.98]"
            >
              いいえ
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-gray-500 leading-relaxed">
          <p>18歳未満の方はご利用いただけません。</p>
          <p className="mt-1">利用規約とプライバシーポリシーに同意の上ご利用ください。</p>
        </div>
      </div>
    </div>
  );
}