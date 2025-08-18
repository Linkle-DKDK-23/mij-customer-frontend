import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Share, MessageCircle, Crown, Star, Link as LinkIcon } from 'lucide-react';
import AccountLayout from '@/components/account/AccountLayout';
import AccountNavigation from '@/components/account/AccountNavigation';
import { getUserProfileBySlug } from '@/api/endpoints/user';
import { UserProfile } from '@/api/types/profile';

const NO_IMAGE_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwTDEwMCAxMDBaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTRBRiIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

export default function AccountProfile() {
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'plans' | 'individual' | 'gacha'>('posts');
  
  const slug = searchParams.get('slug');

  useEffect(() => {
    if (!slug) {
      setError('スラッグが指定されていません');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfileBySlug(slug);
        setProfile(data);
      } catch (err) {
        setError('プロフィールの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  if (loading) return <div className="p-6 text-center">読み込み中...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!profile) return <div className="p-6 text-center">プロフィールが見つかりません</div>;

  const navigationItems = [
    { id: 'posts', label: '投稿', count: profile.posts.length, isActive: activeTab === 'posts' },
    { id: 'plans', label: 'プラン', count: profile.plans.length, isActive: activeTab === 'plans' },
    { id: 'individual', label: '単品購入', count: profile.individual_purchases.length, isActive: activeTab === 'individual' },
    { id: 'gacha', label: 'ガチャ', count: profile.gacha_items.length, isActive: activeTab === 'gacha' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as 'posts' | 'plans' | 'individual' | 'gacha');
  };

  const renderEmptyState = (type: string) => (
    <div className="p-6 text-center text-gray-500">
      {type}はありません。
    </div>
  );

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return profile.posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {profile.posts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={post.thumbnail_storage_key || NO_IMAGE_URL} 
                    alt={post.title} 
                    className="w-full h-40 object-cover" 
                  />
                  {post.video_duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {formatDuration(post.video_duration)}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">{new Date(post.created_at).toLocaleDateString()}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : renderEmptyState('投稿');
      case 'plans':
        return profile.plans.length > 0 ? (
          <div className="p-6 space-y-4">
            {profile.plans.map((plan) => (
              <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <img src={NO_IMAGE_URL} alt={plan.name} className="w-20 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{plan.name}</h3>
                    {plan.description && <p className="text-sm text-gray-600">{plan.description}</p>}
                    <p className="text-sm font-medium text-primary">月額料金 ¥{plan.price.toLocaleString()}/月</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">加入</Button>
                </div>
              </div>
            ))}
          </div>
        ) : renderEmptyState('プラン');
      case 'individual':
        return profile.individual_purchases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {profile.individual_purchases.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative">
                  <img src={item.post?.thumbnail_storage_key || NO_IMAGE_URL} alt="購入アイテム" className="w-full h-40 object-cover" />
                  <div className="absolute top-2 right-2 bg-primary text-white text-sm px-2 py-1 rounded">
                    ¥{item.amount.toLocaleString()}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">{new Date(item.created_at).toLocaleDateString()}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.post?.title || '単品購入'}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : renderEmptyState('単品購入');
      case 'gacha':
        return profile.gacha_items.length > 0 ? (
          <div className="p-6 space-y-4">
            {profile.gacha_items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img src={NO_IMAGE_URL} alt="ガチャアイテム" className="w-20 h-16 object-cover rounded" />
                    <Star className="absolute top-1 left-1 h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">ガチャアイテム</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm font-medium text-primary">¥{item.amount.toLocaleString()}</span>
                      <span className="text-sm text-gray-600">{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : renderEmptyState('ガチャ');
      default:
        return null;
    }
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="relative">
          <div 
            className="h-32 bg-gradient-to-r from-blue-400 to-purple-500"
            style={{
              backgroundImage: profile.cover_url ? `url(${profile.cover_url})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute -bottom-8 left-6">
            <img 
              src={profile.avatar_url || NO_IMAGE_URL} 
              alt={profile.display_name || profile.slug}
              className="w-16 h-16 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button variant="ghost" size="sm" className="bg-white/20 text-white hover:bg-white/30">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-white/20 text-white hover:bg-white/30">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="px-6 pt-10 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{profile.display_name || profile.slug}</h1>
              <p className="text-gray-600">@{profile.slug}</p>
              {profile.bio && <p className="text-gray-700 mt-2">{profile.bio}</p>}
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span>{profile.post_count}投稿</span>
                <span>{profile.follower_count}フォロワー</span>
              </div>
              {profile.website_url && (
                <a href={profile.website_url} className="flex items-center space-x-1 text-primary text-sm mt-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>{profile.website_url}</span>
                </a>
              )}
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              フォロー
            </Button>
          </div>
        </div>

        <AccountNavigation items={navigationItems} onItemClick={handleTabClick} />

        {renderContent()}
      </div>
    </AccountLayout>
  );
}
