import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from '@/pages/Upload';
import ViewVideo from '@/pages/ViewVideo';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/upload_test" element={<Upload />} />
        <Route path='/view_video' element={<ViewVideo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
