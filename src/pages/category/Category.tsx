import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getPostsByCategory } from '@/api/endpoints/post';

import Header from '@/components/common/Header';
import BottomNavigation from '@/components/common/BottomNavigation';
import { PostCategory } from '@/feateure/category/types';
import CategoryListSection from '@/feateure/category/section/CategoryListSection';
	
export default function Category() {
	const [searchParams] = useSearchParams();
	const [posts, setPosts] = useState<PostCategory[]>([]);
	const slug = searchParams.get('slug');
	const navigate = useNavigate();
	
	useEffect(() => {
		if (!slug) {
			navigate('/');
		}
		const fetchCategory = async () => {
			try {
				const response = await getPostsByCategory(slug);
				console.log('response', response);
				setPosts(response);
			} catch (error) {
				console.error('Error fetching category:', error);
			}
		};

		fetchCategory();
	}, [slug]);


	const convertToPosts = (posts: PostCategory[]) => {
		return posts.map((post) => ({
			id: post.id,
			description: post.description,
			thumbnail_url: post.thumbnail_url,
			likes_count: post.likes_count,
			creator_name: post.creator_name,
			display_name: post.display_name,
			creator_avatar_url: post.creator_avatar_url,
		}));
	};

  return (
    <div className="w-full max-w-screen-md mx-auto bg-white space-y-6 pt-16">
			<Header />
			<CategoryListSection posts={convertToPosts(posts)} />
			<BottomNavigation />
		</div>
  );
}