import React, { useState, useEffect } from 'react';
import BottomNavigation from '@/components/common/BottomNavigation';
import Header from '@/components/common/Header';

// セクションコンポーネントをインポート
import BannerCarouselSection from '@/feateure/top/section/BannerCarouselSection';
import PostLibraryNavigationSection from '@/feateure/top/section/PostLibraryNavigationSection';
import RecommendedGenresSection from '@/feateure/top/section/RecommendedGenresSection';
import RankingSection from '@/feateure/top/section/RankingSection';
import CreatorsSection from '@/feateure/top/section/CreatorsSection';
import RecentPostsSection from '@/feateure/top/section/RecentPostsSection';

// 型定義をインポート
import { Post, Creator, Genre, BannerItem } from '@/feateure/top/types';
import { getTopPageData } from '@/api/endpoints/top';
import { TopPageData } from '@/api/types/type';

const bannerItems: BannerItem[] = [
  { id: '1', image: 'https://picsum.photos/800/200?random=31', title: 'Featured Content' },
  { id: '2', image: 'https://picsum.photos/800/200?random=32', title: 'New Releases' },
  { id: '3', image: 'https://picsum.photos/800/200?random=33', title: 'Popular Now' }
];

export default function Top() {
  const [topPageData, setTopPageData] = useState<TopPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPageData = async () => {
      try {
        setLoading(true);
        const data = await getTopPageData();

        console.log('data', data);
        setTopPageData(data);
      } catch (err) {
        setError('トップページデータの取得に失敗しました');
        console.error('Top page data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPageData();
  }, []);

  const convertToGenres = (genres: TopPageData['genres']): Genre[] => {
    return genres.map(genre => ({
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
      postCount: genre.post_count
    }));
  };

  const convertToPosts = (posts: TopPageData['ranking_posts'] | TopPageData['recent_posts']): Post[] => {
    return posts.map(post => ({
      id: post.id,
      title: post.description || '',
      thumbnail: post.thumbnail_url || 'https://picsum.photos/300/200?random=1',
      duration: '00:00',
      views: 0,
      likes: 'likes_count' in post ? post.likes_count : 0,
      creator: {
        name: post.creator_name,
        display_name: post.display_name,
        avatar: post.creator_avatar_url || 'https://picsum.photos/40/40?random=1',
        verified: false
      },
      rank: 'rank' in post ? post.rank : undefined
    }));
  };

  const convertToCreators = (creators: TopPageData['top_creators'] | TopPageData['new_creators']): Creator[] => {
    return creators.map(creator => ({
      id: creator.id,
      name: creator.name,
      display_name: creator.display_name,
      avatar: creator.avatar_url || 'https://picsum.photos/60/60?random=1',
      followers: creator.followers_count,
      verified: false,
      rank: creator.rank
    }));
  };

  if (loading) {
    return (
      <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
        <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
        <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!topPageData) {
    return (
      <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
        <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
          <div className="text-center">データが見つかりません</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <Header />

        {/* Banner Carousel */}
        <BannerCarouselSection bannerItems={bannerItems} />

        {/* Post Library Navigation */}
        <PostLibraryNavigationSection />

        {/* Recommended Genres */}
        <RecommendedGenresSection genres={convertToGenres(topPageData.genres)} />

        {/* ランキング */}
        <RankingSection posts={convertToPosts(topPageData.ranking_posts)} />

        {/* トップクリエイター */}
        <CreatorsSection 
          title="トップクリエイター" 
          creators={convertToCreators(topPageData.top_creators)} 
          showRank={true}
        />

        {/* 新人クリエイター */}
        <CreatorsSection 
          title="新人クリエイター" 
          creators={convertToCreators(topPageData.new_creators)} 
        />

        {/* 注目クリエイター */}
        <CreatorsSection 
          title="注目クリエイター" 
          creators={convertToCreators(topPageData.new_creators)} 
        />

        {/* 新着投稿 */}
        <RecentPostsSection posts={convertToPosts(topPageData.recent_posts)} />

        {/* Fixed Bottom Navigation */}
        <BottomNavigation />
      </div>
    </div>
  );
}
