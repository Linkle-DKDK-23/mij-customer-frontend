import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Upload from '@/pages/Upload';
import ViewVideo from '@/pages/ViewVideo';
import ShareVideo from '@/pages/share/video/ShareVideo';

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/upload_test" element={<Upload />} />
            <Route path='/view_video' element={<ViewVideo />} />
            <Route path='/share/video' element={<ShareVideo />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;
  