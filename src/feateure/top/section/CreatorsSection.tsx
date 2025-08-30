import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  verified: boolean;
  rank?: number;
}

interface CreatorsSectionProps {
  title: string;
  creators: Creator[];
  showRank?: boolean;
  onCreatorClick?: (creatorId: string) => void;
}

export default function CreatorsSection({ 
  title, 
  creators, 
  showRank = false,
  onCreatorClick 
}: CreatorsSectionProps) {
  const navigate = useNavigate();

  const handleCreatorClick = (creatorId: string) => {
    if (onCreatorClick) {
      onCreatorClick(creatorId);
    } else {
      navigate(`/creator/profile`);
    }
  };

  return (
    <section className="bg-white py-6 border-t border-gray-200">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-pink-600">
            もっと見る
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="min-w-[240px] bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex-shrink-0"
            >
              <div className="text-center">
                <div onClick={() => handleCreatorClick(creator.id)}>
                  <div className="relative inline-block mb-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                    {showRank && creator.rank && (
                      <div className="absolute -top-1 -left-1 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {creator.rank}
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm mb-1 flex items-center justify-center">
                    {creator.name}
                    {creator.verified && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{creator.followers.toLocaleString()} followers</p>
                </div>

                <Button size="sm" className="w-full bg-primary hover:bg-pink-600 text-white">
                  フォロー
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 