
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Upload from '@/pages/Upload';
import ViewVideo from '@/pages/ViewVideo';
import Top from '@/pages/Top';
import ShareVideo from '@/pages/share/video/ShareVideo';
import CreatorProfile from '@/pages/CreatorProfile';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/upload_test" element={<Upload />} />
      <Route path="/view_video" element={<ViewVideo />} />
      <Route path="/top" element={<Top />} />
      <Route path="/share/video" element={<ShareVideo />} />
      <Route path="/creator/profile" element={<CreatorProfile />} />
    </Routes>
  );
}
