import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function Terms() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-800 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-black">
            mijfans利用規約
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              本利用規約（以下「本規約」といいます。）には、Linkle株式会社（以下「当社」といいます。）が提供するインターネットプラットフォーム「mijfans」における各種サービス（理由の如何を問わずサービスの名称又は内容が変更された場合は、当該変更後のサービスを含みます。以下「本サービス」といいます。）の利用に際して、第1条で定めるユーザーが遵守すべき事項及び当社とユーザー間の権利義務関係が定められています。本サービスをご利用になる方は、必ず本規約の全文をお読みいただき、本規約に同意の上、ご利用いただきますようお願いいたします。本サービスの利用開始とともに、ユーザーは本規約の条件に同意したものとみなされます。
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">第1章　総則</h2>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">第1条（用語の定義）</h2>
                <div className="text-base sm:text-lg leading-relaxed">
                  本規約において使用する用語の意味は、次のとおりとします。<br/>
                  <div className="space-y-3 mt-3">
                    <div>
                      （1）本プラットフォーム<br/>
                      <div className="ml-4 sm:ml-6 mt-1">
                        当社が運営する下記URL配下のウェブサイトをいいます。ただし、URLは当社の都合により変更される場合があります。<br/>
                        https://mijfans.jp/
                      </div>
                    </div>
                    <div>
                      （2）ユーザー<br/>
                      <div className="ml-4 sm:ml-6 mt-1">本プラットフォームを使用する個人をいいます。</div>
                    </div>
                    <div>
                      （3）本サービス<br/>
                      <div className="ml-4 sm:ml-6 mt-1">当社が運営するファンクラブプラットフォームの提供サービスをいいます。詳細は本規約第2章及び本プラットフォーム上で定めます。</div>
                    </div>
                    <div>
                      （4）会員<br/>
                      <div className="ml-4 sm:ml-6 mt-1">本規約第3条に定める会員登録手続きを完了したユーザーをいい、クリエイターとファンで構成されます。</div>
                    </div>
                    <div>
                      （5）クリエイター<br/>
                      <div className="ml-4 sm:ml-6 mt-1">本規約第3条に定める会員登録手続きを完了したユーザーのうち、ファンクラブの運営者として登録手続きを完了した個人の総称をいいます。</div>
                    </div>
                    <div>
                      （6）ファン<br/>
                      <div className="ml-4 sm:ml-6 mt-1">本規約第3条に定める会員登録手続きを完了したユーザーのうち、ファンクラブにおいてクリエイターが提供するサービスを利用する者として登録手続きを完了した個人の総称をいいます。</div>
                    </div>
                    <div>
                      （7）コンテンツ<br/>
                      <div className="ml-4 sm:ml-6 mt-1">
                        クリエイターがファンに提供する以下のデジタル情報をいいます。<br/>
                        映像コンテンツ：動画、映像作品、アニメーション等<br/>
                        音声・音楽コンテンツ：楽曲、音声作品等<br/>
                        画像コンテンツ：写真、イラスト、デジタルアート、画像集等<br/>
                        文書コンテンツ：記事、小説、日記等<br/>
                        インタラクティブコンテンツ：ゲーム要素を含む企画等のデジタル情報をいいます。
                      </div>
                    </div>
                    {/* 他の定義も同様に続く */}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">第2条（本規約の適用）</h2>
                <div className="text-base sm:text-lg leading-relaxed">
                  <div className="space-y-3">
                    <div>
                      （1）適用範囲<br/>
                      <div className="ml-4 sm:ml-6 mt-1">本規約は、当社が提供するmijfansサービスを利用する全てのユーザーと当社との間の利用に関わる全ての関係に適用されます。</div>
                    </div>
                    <div>
                      （2）同意の条件<br/>
                      <div className="ml-4 sm:ml-6 mt-1">ユーザーは、本規約を熟読し、その内容を完全に理解した上で、これに同意し、本規約に従って本サービスを利用するものとします。</div>
                    </div>
                    {/* 他の項目も同様に続く */}
                  </div>
                </div>
              </div>

              {/* 他の条項も同様のパターンで続く */}
              <div className="text-center mt-8 sm:mt-12">
                <div className="text-base sm:text-lg font-bold">附則</div>
                <div className="text-sm sm:text-base mt-2">
                  本規約は2025年8月15日から適用されます。<br/>
                  制定: 2025年8月15日
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}