import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-800 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-black">
            プライバシーポリシー
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              ウェブサービスである「mijfans」（以下「本サービス」といいます。）を運営するLinkle株式会社（以下「当社」といいます。）は、本サービスのユーザー（以下「ユーザー」といいます。）のプライバシーを尊重し、ユーザーの個人情報およびその他のユーザーのプライバシーに係る情報（以下「プライバシー情報」といいます。）の管理に細心の注意を払います。当社は、個人情報保護法をはじめとする各法令およびその他の規範を遵守してユーザーから収集した個人情報を適切に取り扱います。
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">第1条（総則）</h2>
                <div className="text-base sm:text-lg leading-relaxed">
                  （1）当社は、個人情報保護法をはじめとする各法令およびその他の規範を遵守してユーザーから収集した個人情報を適切に取り扱います。<br/>
                  （2）当社は、個人情報を取り扱う体制の強化、SSL技術の導入等、ユーザーの個人情報の取り扱いについて、継続的な改善を図っています。<br/>
                  （3）ユーザーは、本サービスの利用に際して本ポリシーを熟読し、その内容を完全に理解した上で、これに同意するものとします。
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">第2条（本ポリシーへの同意）</h2>
                <div className="text-base sm:text-lg leading-relaxed">
                  （1）ユーザーは、問い合わせ又は会員登録を通じて当社に自身のプライバシー情報を提供する場合、本ポリシーを熟読し、その内容に同意するものとします。<br/>
                  （2）ユーザーは、当社によるプライバシー情報の使用等について同意を撤回することができます。この場合、本サービスを継続利用することはできません。<br/>
                  （3）当社は、Cookie、IPアドレス、アクセスログ等のWEBトラッキング技術を活用してユーザーの行動や嗜好に関する情報を収集します。当社は、ユーザーが本サービスを利用した場合、当該ユーザーが当社によるこれらの技術を利用したプライバシー情報の収集について同意したものとみなします。
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">第3条（収集するプライバシー情報）</h2>
                <div className="text-base sm:text-lg leading-relaxed">
                  （1）当社は、本サービスの提供に際して、ユーザーから以下の情報を収集または取得します。<br/>
                  <div className="ml-4 sm:ml-6 mt-2">
                    1. ユーザーがフォーム等に入力することにより提供する情報：これには氏名、お問い合わせ等に関する情報、メールアドレス、年齢または生年月日等が含まれます。<br/>
                    2. Cookie、IPアドレス、アクセスログ等のWEBトラッキング技術、アクセス解析ツール等を介して当社がユーザーから収集する情報：これには利用端末やOS、ブラウザ等の接続環境に関する情報、ユーザーの行動履歴や閲覧履歴等に関する情報、購入した商品や閲覧した商品等のユーザーの嗜好に関する情報およびCookie情報が含まれます。なお、これらの情報にはユーザー個人を特定しうる個人情報に該当する情報は、含まれません。
                  </div>
                  （2）当社は、適法かつ公正な手段によってプライバシー情報を入手し、ユーザーの意思に反する不正な入手をしません。
                </div>
              </div>

              {/* 他の条項も同様にレスポンシブ対応 */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">第4条（プライバシー情報の利用目的）</h2>
                <div className="text-base sm:text-lg leading-relaxed">
                  当社は、ユーザーから収集したプライバシー情報を本サービスの運営の目的のために使用します。主な利用目的は、以下のとおりです。<br/>
                  <div className="ml-4 sm:ml-6 mt-2 space-y-1">
                    <div>1. 本人確認、認証のため</div>
                    <div>2. ユーザー投稿コンテンツの決済のため</div>
                    <div>3. 売上金の振込のため</div>
                    <div>4. 利用規約やポリシーの変更等の重要な通知を送信するため</div>
                    <div>5. 本サービスのコンテンツやサービスの内容や品質の向上に役立てるため</div>
                    <div>6. アンケート、懸賞、キャンペーン等の実施のため</div>
                    <div>7. マーケティング調査、統計、分析のため</div>
                    <div>8. システムメンテナンス、不具合対応のため</div>
                    <div>9. 広告の配信およびその成果確認のため</div>
                    <div>10. 技術サポートの提供、お客様からの問い合わせ対応のため</div>
                    <div>11. 不正行為または違法となる可能性のある行為を防止するため</div>
                    <div>12. クレーム、紛争・訴訟等の対応のため</div>
                  </div>
                </div>
              </div>

              {/* 残りの条項も同様のパターンで続く */}
              <div className="text-center mt-8 sm:mt-12">
                <div className="text-base sm:text-lg font-bold">プライバシーポリシーの制定日及び改定日</div>
                <div className="text-sm sm:text-base mt-2">制定: 2025年8月15日</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}