// src/routes/AppRouter.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Upload from '@/pages/Upload';
import ViewVideo from '@/pages/ViewVideo';
import Top from '@/pages/top/Top';
import ShareVideo from '@/pages/share/video/ShareVideo';
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
import QreatorRequest from '@/pages/qreator/QreatorRequest';
import QreatorRequestCertifierImage from '@/pages/qreator/QreatorRequestCertifierImage';
import QreatorRequestSmsVerification from '@/pages/qreator/QreatorRequestSmsVerification';
import QreatorRequestPersonalInfo from '@/pages/qreator/QreatorRequestPersonalInfo';
import QreatorRequestPlanSetup from '@/pages/qreator/QreatorRequestPlanSetup';
import FeedSample from '@/pages/feed/FeedSample';
import PostRanking from '@/pages/postRanking/PostRanking';

import PrivateRoute from '@/routes/PrivateRoute';

export default function AppRouter() {
  return (
    <Routes>
      {/* 公開ページ */}
      <Route path="/top" element={<Top />} />
      <Route path="/view_video" element={<ViewVideo />} />
      <Route path="/share/video" element={<ShareVideo />} />
      <Route path="/creator/profile" element={<CreatorProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SingUp />} />
      <Route path="/feed" element={<FeedSample />} />
      <Route path="/ranking/posts" element={<PostRanking />} />

      {/* 認証必須ページ（必要に応じて追加） */}
      <Route
        path="/upload_test"
        element={
          <PrivateRoute>
            <Upload />
          </PrivateRoute>
        }
      />
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
      />
      <Route
        path="/account/profile"
        element={
          <PrivateRoute>
            <AccountProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/account/edit"
        element={
          <PrivateRoute>
            <AccountEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="/account/settings"
        element={
          <PrivateRoute>
            <AccountSetting />
          </PrivateRoute>
        }
      />
      <Route
        path="/account/post"
        element={
          <PrivateRoute>
            <AccountPost />
          </PrivateRoute>
        }
      />
      <Route
        path="/account/sale"
        element={
          <PrivateRoute>
            <AccountSale />
          </PrivateRoute>
        }
      />
      <Route
        path="/account/sale-withdraw"
        element={
          <PrivateRoute>
            <AccountSaleWithDraw />
          </PrivateRoute>
        }
      />
      <Route
        path="/account/plan"
        element={
          <PrivateRoute>
            <AccountPlanSetting />
          </PrivateRoute>
        }
      />
      <Route
        path="/creator/request"
        element={
          <PrivateRoute>
            <QreatorRequest />
          </PrivateRoute>
        }
      />
      <Route
        path="/creator/request/verification"
        element={
          <PrivateRoute>
            <QreatorRequestCertifierImage />
          </PrivateRoute>
        }
      />
      <Route
        path="/creator/request/sms"
        element={
          <PrivateRoute>
            <QreatorRequestSmsVerification 
              onNext={() => {}} 
              onBack={() => {}} 
              currentStep={2}
              totalSteps={5}
              steps={[
                { id: 1, title: '基本情報', completed: true, current: false },
                { id: 2, title: '本人確認', completed: false, current: true },
                { id: 3, title: '個人情報', completed: false, current: false },
                { id: 4, title: 'プラン設定', completed: false, current: false },
                { id: 5, title: '完了', completed: false, current: false }
              ]}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/creator/request/personal-info"
        element={
          <PrivateRoute>
            <QreatorRequestPersonalInfo 
              onNext={() => {}} 
              onBack={() => {}} 
              currentStep={3}
              totalSteps={5}
              steps={[
                { id: 1, title: '基本情報', completed: true, current: false },
                { id: 2, title: '本人確認', completed: true, current: false },
                { id: 3, title: '個人情報', completed: false, current: true },
                { id: 4, title: 'プラン設定', completed: false, current: false },
                { id: 5, title: '完了', completed: false, current: false }
              ]}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="/creator/request/plan-setup"
        element={
          <PrivateRoute>
            <QreatorRequestPlanSetup 
              onNext={() => {}} 
              onBack={() => {}} 
              currentStep={4}
              totalSteps={5}
              steps={[
                { id: 1, title: '基本情報', completed: true, current: false },
                { id: 2, title: '本人確認', completed: true, current: false },
                { id: 3, title: '個人情報', completed: true, current: false },
                { id: 4, title: 'プラン設定', completed: false, current: true },
                { id: 5, title: '完了', completed: false, current: false }
              ]}
            />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
