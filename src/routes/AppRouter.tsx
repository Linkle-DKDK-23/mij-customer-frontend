
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Upload from '@/pages/Upload';
import ViewVideo from '@/pages/ViewVideo';
import Top from '@/pages/Top';
import ShareVideo from '@/pages/share/video/ShareVideo';
import CreatorProfile from '@/pages/CreatorProfile';
import Account from '@/pages/Account';
import AccountProfile from '@/pages/AccountProfile';
import AccountEdit from '@/pages/AccountEdit';
import AccountSetting from '@/pages/AccountSetting';
import AccountPost from '@/pages/AccountPost';
import AccountSale from '@/pages/AccountSale';
import AccountSaleWithDraw from '@/pages/AccountSaleWithDraw';
import AccountPlanSetting from '@/pages/AccountPlanSetting';
import Login from '@/pages/Login';
import SingUp from '@/pages/SingUp';
import QreatorRequest from '@/pages/QreatorRequest';
import QreatorRequestCertifierImage from '@/pages/QreatorRequestCertifierImage';
import FeedSample from '@/pages/FeedSample';
import PostRanking from '@/pages/PostRanking';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/upload_test" element={<Upload />} />
      <Route path="/view_video" element={<ViewVideo />} />
      <Route path="/top" element={<Top />} />
      <Route path="/share/video" element={<ShareVideo />} />
      <Route path="/creator/profile" element={<CreatorProfile />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/profile" element={<AccountProfile />} />
      <Route path="/account/edit" element={<AccountEdit />} />
      <Route path="/account/settings" element={<AccountSetting />} />
      <Route path="/account/post" element={<AccountPost />} />
      <Route path="/account/sale" element={<AccountSale />} />
      <Route path="/account/sale-withdraw" element={<AccountSaleWithDraw />} />
      <Route path="/account/plan" element={<AccountPlanSetting />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SingUp />} />
      <Route path="/creator/request" element={<QreatorRequest />} />
      <Route path="/creator/request/verification" element={<QreatorRequestCertifierImage />} />
      <Route path="/feed" element={<FeedSample />} />
      <Route path="/ranking/posts" element={<PostRanking />} />
    </Routes>
  );
}
