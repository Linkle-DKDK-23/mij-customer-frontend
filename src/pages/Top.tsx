import React from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  ShoppingCart, 
  Bookmark, 
  Heart, 
  History, 
  ChevronRight, 
  Play, 
  Clock, 
  Eye, 
  Star,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rank?: number;
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  verified: boolean;
  rank?: number;
}

interface Genre {
  id: string;
  name: string;
  postCount: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Beautiful sunset photography session',
    thumbnail: 'https://picsum.photos/300/200?random=1',
    duration: '12:34',
    views: 15420,
    likes: 892,
    creator: {
      name: 'PhotoArtist',
      avatar: 'https://picsum.photos/40/40?random=11',
      verified: true
    },
    rank: 1
  },
  {
    id: '2',
    title: 'Urban street art exploration',
    thumbnail: 'https://picsum.photos/300/200?random=2',
    duration: '8:45',
    views: 12350,
    likes: 654,
    creator: {
      name: 'StreetVibes',
      avatar: 'https://picsum.photos/40/40?random=12',
      verified: false
    },
    rank: 2
  },
  {
    id: '3',
    title: 'Cooking masterclass series',
    thumbnail: 'https://picsum.photos/300/200?random=3',
    duration: '25:12',
    views: 9876,
    likes: 543,
    creator: {
      name: 'ChefMaster',
      avatar: 'https://picsum.photos/40/40?random=13',
      verified: true
    },
    rank: 3
  },
  {
    id: '4',
    title: 'Nature documentary highlights',
    thumbnail: 'https://picsum.photos/300/200?random=4',
    duration: '18:30',
    views: 8765,
    likes: 432,
    creator: {
      name: 'NatureDoc',
      avatar: 'https://picsum.photos/40/40?random=14',
      verified: true
    },
    rank: 4
  },
  {
    id: '5',
    title: 'Music production tutorial',
    thumbnail: 'https://picsum.photos/300/200?random=5',
    duration: '15:22',
    views: 7654,
    likes: 321,
    creator: {
      name: 'BeatMaker',
      avatar: 'https://picsum.photos/40/40?random=15',
      verified: false
    },
    rank: 5
  }
];

const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'TopCreator',
    avatar: 'https://picsum.photos/60/60?random=21',
    followers: 125000,
    verified: true,
    rank: 1
  },
  {
    id: '2',
    name: 'ArtisticSoul',
    avatar: 'https://picsum.photos/60/60?random=22',
    followers: 98000,
    verified: true,
    rank: 2
  },
  {
    id: '3',
    name: 'CreativeMinds',
    avatar: 'https://picsum.photos/60/60?random=23',
    followers: 87000,
    verified: false,
    rank: 3
  },
  {
    id: '4',
    name: 'VisualStory',
    avatar: 'https://picsum.photos/60/60?random=24',
    followers: 76000,
    verified: true,
    rank: 4
  },
  {
    id: '5',
    name: 'ContentKing',
    avatar: 'https://picsum.photos/60/60?random=25',
    followers: 65000,
    verified: false,
    rank: 5
  }
];

const mockGenres: Genre[] = [
  { id: '1', name: 'Photography', postCount: 1234 },
  { id: '2', name: 'Art & Design', postCount: 987 },
  { id: '3', name: 'Cooking', postCount: 765 },
  { id: '4', name: 'Music', postCount: 654 },
  { id: '5', name: 'Travel', postCount: 543 },
  { id: '6', name: 'Fashion', postCount: 432 },
  { id: '7', name: 'Technology', postCount: 321 },
  { id: '8', name: 'Fitness', postCount: 210 }
];

const bannerItems = [
  { id: '1', image: 'https://picsum.photos/800/200?random=31', title: 'Featured Content' },
  { id: '2', image: 'https://picsum.photos/800/200?random=32', title: 'New Releases' },
  { id: '3', image: 'https://picsum.photos/800/200?random=33', title: 'Popular Now' }
];

export default function Top() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-pink-500">myfans</div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Carousel */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
            {bannerItems.map((banner) => (
              <div key={banner.id} className="flex-shrink-0 w-80 h-32 relative rounded-lg overflow-hidden">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-lg">{banner.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post Library Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide">
            <div className="flex items-center space-x-2 flex-shrink-0 text-gray-700 hover:text-pink-500 cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Purchased</span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0 text-gray-700 hover:text-pink-500 cursor-pointer">
              <Bookmark className="h-5 w-5" />
              <span className="font-medium">Saved</span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0 text-gray-700 hover:text-pink-500 cursor-pointer">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Liked</span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0 text-gray-700 hover:text-pink-500 cursor-pointer">
              <History className="h-5 w-5" />
              <span className="font-medium">Viewing History</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Genres */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recommended Genres</h2>
            <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600">
              See more genres
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mockGenres.map((genre) => (
              <div key={genre.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors">
                <h3 className="font-medium text-gray-900 text-sm">{genre.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{genre.postCount.toLocaleString()} posts</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ranking Posts */}
      <section className="bg-white py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Ranking Posts</h2>
            <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600">
              View all rankings
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                    {post.rank === 1 && <Crown className="h-3 w-3 mr-1" />}
                    #{post.rank}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{post.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <img 
                      src={post.creator.avatar} 
                      alt={post.creator.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs text-gray-600 flex items-center">
                      {post.creator.name}
                      {post.creator.verified && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {post.likes.toLocaleString()}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Bookmark className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Profiles */}
      <section className="bg-white py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Creators</h2>
            <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600">
              View all creators
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {mockCreators.map((creator) => (
              <div key={creator.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="relative inline-block mb-3">
                    <img 
                      src={creator.avatar} 
                      alt={creator.name}
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                    <div className="absolute -top-1 -left-1 bg-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {creator.rank}
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm mb-1 flex items-center justify-center">
                    {creator.name}
                    {creator.verified && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{creator.followers.toLocaleString()} followers</p>
                  <Button size="sm" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                    Follow
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
