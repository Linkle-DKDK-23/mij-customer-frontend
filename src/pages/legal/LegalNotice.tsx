import React from 'react';
import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function LegalNotice() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-800 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-black">
            特定商取引法に基づく表記
          </h1>

          <div className="space-y-6 sm:space-y-8">
            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">販売業者</div>
              <div className="text-base sm:text-lg">Linkle株式会社</div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">代表取締役</div>
              <div className="text-base sm:text-lg">倉石楽生</div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">運営責任者</div>
              <div className="text-base sm:text-lg">Linkle株式会社</div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">所在地</div>
              <div className="text-base sm:text-lg">東京都渋谷区道玄坂1-12-1 渋谷マークシティW22階</div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">電話番号</div>
              <div className="text-base sm:text-lg">
                <div className="mb-1">03-6840-1624</div>
                <div className="text-sm sm:text-base text-gray-600 mt-1">
                  ※電話でのお問い合わせは受け付けておりません。お問い合わせは下記よりお願いいたします。
                </div>
                <div className="mt-2">support@mijfans.jp</div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">販売価格</div>
              <div className="text-base sm:text-lg">各商品ページの価格に準じます。</div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">お支払い方法</div>
              <div className="text-base sm:text-lg">クレジットカード・銀行振込（予定）</div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">お支払期限</div>
              <div className="text-base sm:text-lg">ご注文時にお支払い確定</div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">商品の引き渡し時期</div>
              <div className="text-base sm:text-lg">お支払い完了後、サービスの提供を行います。</div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">返品・キャンセル</div>
              <div className="text-base sm:text-lg">
                サービスの性質上、契約締結後のキャンセル、クーリングオフは一切認められず、お支払い頂いた料金については理由を問わず返還いたしません。
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">サービスの解約条件</div>
              <div className="text-base sm:text-lg">
                解約される場合は、当社サイト上の記載に従って解約手続を行う必要があります。
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">その他費用</div>
              <div className="text-base sm:text-lg">
                当社が代理受領した料金を「クリエイター」が指定する振込先口座に振り込む際、振込手数料として330円（税込）を当社にお支払いいただきます。
                <br /><br />
                なお、ご指定いただいた振込先口座情報の不備・誤記によって誤った振込先への振込がなされてしまった場合に、当社が任意で行う組戻し手続に際し、組戻し手数料として880円（税込）を当社にお支払いいただきます。
              </div>
            </div>
            <div className="pb-6 sm:pb-8">
              <div className="text-lg sm:text-xl font-bold mb-2 text-black">映像送信型性風俗特殊営業届</div>
              <div className="text-base sm:text-lg">
              茨城県公安委員会<br />
              第1160611号
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}