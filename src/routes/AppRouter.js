import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import Upload from '@/pages/Upload';
import ViewVideo from '@/pages/ViewVideo';
import Top from '@/pages/top/Top';
import ShareVideo from '@/pages/share/post/SharePost';
import CreatorProfile from '@/pages/qreator/CreatorProfile';
import Account from '@/pages/account/Account';
import AccountProfile from '@/pages/account/AccountProfile';
import AccountEdit from '@/pages/account/AccountEdit';
import AccountSetting from '@/pages/account/AccountSetting';
import AccountPost from '@/pages/account/AccountPost';
import AccountSale from '@/pages/account/AccountSale';
import AccountSaleWithDraw from '@/pages/account/AccountSaleWithDraw';
import AccountPlanSetting from '@/pages/account/AccountPlanSetting';
import Login from '@/pages/signUp/Login';
import SingUp from '@/pages/signUp/SingUp';
// Supabase認証ページ
import SupabaseLogin from '@/pages/auth/SupabaseLogin';
import SupabaseSignup from '@/pages/auth/SupabaseSignup';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import AuthCallback from '@/pages/auth/AuthCallback';
import QreatorRequest from '@/pages/qreator/QreatorRequest';
import QreatorRequestCertifierImage from '@/pages/qreator/QreatorRequestCertifierImage';
import QreatorRequestSmsVerification from '@/pages/qreator/QreatorRequestSmsVerification';
import QreatorRequestPersonalInfo from '@/pages/qreator/QreatorRequestPersonalInfo';
import QreatorRequestPlanSetup from '@/pages/qreator/QreatorRequestPlanSetup';
import FeedSample from '@/pages/feed/FeedSample';
import PostRanking from '@/pages/postRanking/PostRanking';
import Category from '@/pages/category/Category';
import PostDetail from '@/pages/postDetail/postDetail';
import SocialTest from '@/pages/test/SocialTest';
import Terms from '@/pages/legal/Terms';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import LegalNotice from '@/pages/legal/LegalNotice';
import PrivateRoute from '@/routes/PrivateRoute';
export default function AppRouter() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Top, {}) }), _jsx(Route, { path: "/category", element: _jsx(Category, {}) }), _jsx(Route, { path: "/view_video", element: _jsx(ViewVideo, {}) }), _jsx(Route, { path: "/share/video", element: _jsx(ShareVideo, {}) }), _jsx(Route, { path: "/share/post", element: _jsx(ShareVideo, {}) }), _jsx(Route, { path: "/creator/profile", element: _jsx(CreatorProfile, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SingUp, {}) }), _jsx(Route, { path: "/auth/login", element: _jsx(SupabaseLogin, {}) }), _jsx(Route, { path: "/auth/signup", element: _jsx(SupabaseSignup, {}) }), _jsx(Route, { path: "/auth/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/auth/reset-password", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "/auth/callback", element: _jsx(AuthCallback, {}) }), _jsx(Route, { path: "/feed", element: _jsx(FeedSample, {}) }), _jsx(Route, { path: "/ranking/posts", element: _jsx(PostRanking, {}) }), _jsx(Route, { path: "/post/detail", element: _jsx(PostDetail, {}) }), _jsx(Route, { path: "/test/social", element: _jsx(SocialTest, {}) }), _jsx(Route, { path: "/upload_test", element: _jsx(PrivateRoute, { children: _jsx(Upload, {}) }) }), _jsx(Route, { path: "/account", element: _jsx(Account, {}) }), _jsx(Route, { path: "/account/profile", element: _jsx(AccountProfile, {}) }), _jsx(Route, { path: "/account/edit", element: _jsx(AccountEdit, {}) }), _jsx(Route, { path: "/account/settings", element: _jsx(AccountSetting, {}) }), _jsx(Route, { path: "/account/post", element: _jsx(AccountPost, {}) }), _jsx(Route, { path: "/account/sale", element: _jsx(AccountSale, {}) }), _jsx(Route, { path: "/account/sale-withdraw", element: _jsx(AccountSaleWithDraw, {}) }), _jsx(Route, { path: "/terms", element: _jsx(Terms, {}) }), _jsx(Route, { path: "/privacy-policy", element: _jsx(PrivacyPolicy, {}) }), _jsx(Route, { path: "/legal-notice", element: _jsx(LegalNotice, {}) }), _jsx(Route, { element: _jsx(AccountSaleWithDraw, {}) }), _jsx(Route, { path: "/account/plan", element: _jsx(AccountPlanSetting, {}) }), _jsx(Route, { path: "/creator/request", element: 
                // <PrivateRoute>
                _jsx(QreatorRequest, {}) }), _jsx(Route, { path: "/creator/request/verification", element: _jsx(PrivateRoute, { children: _jsx(QreatorRequestCertifierImage, {}) }) }), _jsx(Route, { path: "/creator/request/sms", element: _jsx(PrivateRoute, { children: _jsx(QreatorRequestSmsVerification, { onNext: () => { }, onBack: () => { }, currentStep: 2, totalSteps: 5, steps: [
                            { id: 1, title: '基本情報', completed: true, current: false },
                            { id: 2, title: '本人確認', completed: false, current: true },
                            { id: 3, title: '個人情報', completed: false, current: false },
                            { id: 4, title: 'プラン設定', completed: false, current: false },
                            { id: 5, title: '完了', completed: false, current: false }
                        ] }) }) }), _jsx(Route, { path: "/creator/request/personal-info", element: _jsx(PrivateRoute, { children: _jsx(QreatorRequestPersonalInfo, { onNext: () => { }, onBack: () => { }, currentStep: 3, totalSteps: 5, steps: [
                            { id: 1, title: '基本情報', completed: true, current: false },
                            { id: 2, title: '本人確認', completed: true, current: false },
                            { id: 3, title: '個人情報', completed: false, current: true },
                            { id: 4, title: 'プラン設定', completed: false, current: false },
                            { id: 5, title: '完了', completed: false, current: false }
                        ] }) }) }), _jsx(Route, { path: "/creator/request/plan-setup", element: _jsx(PrivateRoute, { children: _jsx(QreatorRequestPlanSetup, { onNext: () => { }, onBack: () => { }, currentStep: 4, totalSteps: 5, steps: [
                            { id: 1, title: '基本情報', completed: true, current: false },
                            { id: 2, title: '本人確認', completed: true, current: false },
                            { id: 3, title: '個人情報', completed: true, current: false },
                            { id: 4, title: 'プラン設定', completed: false, current: true },
                            { id: 5, title: '完了', completed: false, current: false }
                        ] }) }) })] }));
}
