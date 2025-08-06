import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Share, 
  MessageCircle, 
  Heart,
  Play,
  Clock,
  Crown,
  Star,
  Eye,
  Link as LinkIcon
} from 'lucide-react';

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  duration: string;
  date: string;
  isVideo?: boolean;
}

interface Plan {
  id: string;
  title: string;
  description: string;
  thumbnails: string[];
  postCount: number;
  monthlyPrice: number;
  isRecommended?: boolean;
  isFree?: boolean;
}

interface GachaItem {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  remaining: number;
  total: number;
}

interface IndividualPurchase {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  duration?: string;
  date: string;
}

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  postCount: number;
  followerCount: number;
  websiteUrl?: string;
  isFollowing: boolean;
}

const mockCreator: Creator = {
  id: '1',
  name: 'さとみめろん',
  username: '@satomimelon',
  avatar: 'https://picsum.photos/200/200?random=1',
  bio: 'さとみです。いつもSNSでの応援ありがとうございます🍈Hカップで応援！仕事の疲れを癒したいと思ってます。ムチムチだし、剛毛だし、デカ尻だし巨乳🍈しか取りえないのわかってます。だから、いつも笑顔で全力でおっぱいで癒したい🍈🍈🍈',
  postCount: 71,
  followerCount: 2007,
  websiteUrl: 'https://note.com/satomimelon',
  isFollowing: false
};

const mockPosts: Post[] = [
  {
    id: '1',
    title: '最初で最後のへたっぴフェラです🍌💦',
    thumbnail: 'https://picsum.photos/300/200?random=11',
    price: 4980,
    duration: '05:36',
    date: '2025/07/30 09:00',
    isVideo: true
  },
  {
    id: '2',
    title: 'はじめましての方へ',
    thumbnail: 'https://picsum.photos/300/200?random=12',
    price: 980,
    duration: '20:58',
    date: '2025/06/11 09:30',
    isVideo: true
  },
  {
    id: '3',
    title: '潮吹き解禁しました💦',
    thumbnail: 'https://picsum.photos/300/200?random=13',
    price: 5980,
    duration: '10:46',
    date: '2025/05/28 09:00',
    isVideo: true
  },
  {
    id: '4',
    title: 'ノーパン出社してそのまま車で唾液オナニーしちゃいました',
    thumbnail: 'https://picsum.photos/300/200?random=14',
    price: 3980,
    duration: '13:05',
    date: '2025/07/31 06:27',
    isVideo: true
  },
  {
    id: '5',
    title: '仕事中におさぼり指オナニーしました',
    thumbnail: 'https://picsum.photos/300/200?random=15',
    price: 3980,
    duration: '09:42',
    date: '2025/08/02 01:00',
    isVideo: true
  },
  {
    id: '6',
    title: '先輩と車内でおさぼりえっちオナニー',
    thumbnail: 'https://picsum.photos/300/200?random=16',
    price: 2980,
    duration: '11:37',
    date: '2025/08/01 09:00',
    isVideo: true
  }
];

const mockPlans: Plan[] = [
  {
    id: '1',
    title: '【定額】高級🍈プラン(週1更新)',
    description: 'おすすめプラン',
    thumbnails: [
      'https://picsum.photos/150/100?random=21',
      'https://picsum.photos/150/100?random=22',
      'https://picsum.photos/150/100?random=23'
    ],
    postCount: 62,
    monthlyPrice: 11919,
    isRecommended: true
  },
  {
    id: '2',
    title: '🍐プラン(無料)',
    description: '無料プラン',
    thumbnails: ['https://picsum.photos/150/100?random=24'],
    postCount: 1,
    monthlyPrice: 0,
    isFree: true
  },
  {
    id: '3',
    title: '【定額】🍉プラン (週1更新)',
    description: 'スタンダードプラン',
    thumbnails: [
      'https://picsum.photos/150/100?random=25',
      'https://picsum.photos/150/100?random=26'
    ],
    postCount: 41,
    monthlyPrice: 6980
  }
];

const mockGachaItems: GachaItem[] = [
  {
    id: '1',
    title: '【ハズレなし】さとみの思い出の下着ガチャ(パンスト付き)',
    thumbnail: 'https://picsum.photos/200/150?random=31',
    price: 5980,
    remaining: 0,
    total: 10
  },
  {
    id: '2',
    title: '【ハズレなし】さとみの思い出の下着ガチャ',
    thumbnail: 'https://picsum.photos/200/150?random=32',
    price: 5980,
    remaining: 0,
    total: 38
  }
];

const mockIndividualPurchases: IndividualPurchase[] = [
  {
    id: '1',
    title: '限定写真集セット',
    thumbnail: 'https://picsum.photos/300/200?random=41',
    price: 2980,
    date: '2025/08/01'
  },
  {
    id: '2',
    title: 'プレミアム動画パック',
    thumbnail: 'https://picsum.photos/300/200?random=42',
    price: 4980,
    duration: '15:30',
    date: '2025/07/28'
  },
  {
    id: '3',
    title: '特別限定コンテンツ',
    thumbnail: 'https://picsum.photos/300/200?random=43',
    price: 1980,
    date: '2025/07/25'
  },
  {
    id: '4',
    title: 'プライベート動画集',
    thumbnail: 'https://picsum.photos/300/200?random=44',
    price: 3980,
    duration: '12:45',
    date: '2025/07/20'
  }
];

const CreatorHeader: React.FC<{ creator: Creator }> = ({ creator }) => (
  <div className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{creator.name}</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                フォロー
              </Button>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">{creator.username}</p>
          
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {creator.bio}
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <span className="font-medium">
              <span className="text-gray-900">{creator.postCount}</span>
              <span className="text-gray-500 ml-1">投稿</span>
            </span>
            <span className="font-medium">
              <span className="text-gray-900">{creator.followerCount.toLocaleString()}</span>
              <span className="text-gray-500 ml-1">フォロワー</span>
            </span>
          </div>
          
          {creator.websiteUrl && (
            <div className="mt-2">
              <a 
                href={creator.websiteUrl}
                className="text-primary hover:text-primary/80 text-sm flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon className="h-4 w-4 mr-1" />
                {creator.websiteUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const PostsSection: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {posts.map((post) => (
      <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full aspect-video object-cover"
          />
          {post.isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-12 w-12 text-white opacity-80" />
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.duration}
          </div>
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            ¥{post.price.toLocaleString()}
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-500 mb-1">{post.date}</p>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</h3>
        </div>
      </div>
    ))}
  </div>
);

const PlansSection: React.FC<{ plans: Plan[] }> = ({ plans }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {plans.map((plan) => (
      <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {plan.isRecommended && (
          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1">
            おすすめ
          </div>
        )}
        
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {plan.thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt=""
                className="w-16 h-12 object-cover rounded"
              />
            ))}
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2">{plan.title}</h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">
              <div>投稿数 {plan.postCount}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">月額料金</div>
              <div className="font-bold text-lg">
                {plan.isFree ? (
                  <span className="text-green-600">無料</span>
                ) : (
                  <span>¥{plan.monthlyPrice.toLocaleString()}/月</span>
                )}
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-primary hover:bg-primary/90 text-white">
            加入
          </Button>
        </div>
      </div>
    ))}
  </div>
);

const IndividualPurchaseSection: React.FC<{ items: IndividualPurchase[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((item) => (
      <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full aspect-video object-cover"
          />
          {item.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {item.duration}
            </div>
          )}
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            ¥{item.price.toLocaleString()}
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-500 mb-1">{item.date}</p>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
        </div>
      </div>
    ))}
  </div>
);

const GachaSection: React.FC<{ items: GachaItem[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item) => (
      <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute top-2 right-2">
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-primary font-bold">
              <Crown className="h-4 w-4 mr-1" />
              ¥{item.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              残り {item.remaining} /{item.total}
            </div>
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            disabled={item.remaining === 0}
          >
            {item.remaining === 0 ? '売り切れ' : 'ガチャを回す'}
          </Button>
        </div>
      </div>
    ))}
  </div>
);

export default function CreatorProfile() {
  const [activeTab, setActiveTab] = useState<'posts' | 'plans' | 'individual' | 'gacha'>('posts');

  const tabs = [
    { id: 'posts' as const, label: `投稿`, count: mockPosts.length },
    { id: 'plans' as const, label: `プラン`, count: mockPlans.length },
    { id: 'individual' as const, label: `単品購入`, count: mockIndividualPurchases.length },
    { id: 'gacha' as const, label: `ガチャ`, count: mockGachaItems.length }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsSection posts={mockPosts} />;
      case 'plans':
        return <PlansSection plans={mockPlans} />;
      case 'individual':
        return <IndividualPurchaseSection items={mockIndividualPurchases} />;
      case 'gacha':
        return <GachaSection items={mockGachaItems} />;
      default:
        return <PostsSection posts={mockPosts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CreatorHeader creator={mockCreator} />
      
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
            {mockPlans.map((plan) => (
              <div key={plan.id} className="flex-shrink-0 w-80">
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  {plan.isRecommended && (
                    <div className="bg-red-500 text-white text-xs font-bold px-3 py-1">
                      おすすめ
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {plan.thumbnails.slice(0, 7).map((thumbnail, index) => (
                        <img
                          key={index}
                          src={thumbnail}
                          alt=""
                          className="w-12 h-8 object-cover rounded"
                        />
                      ))}
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-2">{plan.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        投稿数 {plan.postCount}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">月額料金</div>
                        <div className="font-bold text-sm">
                          {plan.isFree ? (
                            <span className="text-green-600">¥0/月</span>
                          ) : (
                            <span>¥{plan.monthlyPrice.toLocaleString()}/月</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-3 bg-primary hover:bg-primary/90 text-white text-sm">
                      加入
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
            {mockGachaItems.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-80">
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex">
                    <div className="relative w-24 h-16">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <Star className="absolute top-1 right-1 h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 p-3">
                      <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-primary font-bold text-sm">
                          <Crown className="h-3 w-3 mr-1" />
                          ¥{item.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">
                          残り {item.remaining} /{item.total}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} {tab.count}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </section>
    </div>
  );
}
