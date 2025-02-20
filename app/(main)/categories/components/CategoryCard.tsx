'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArticleCategory } from '@prisma/client';
import { useState } from 'react';
import axios from 'axios';

interface CategoryCardProps {
  category: ArticleCategory;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowCategory = async () => {
    setIsFollowing(true);

    try {
      // Axios POST request
      await axios.post('/api/categories/follow', {
        categoryId: category.id,
      });

      // Refresh the page to reflect changes
      router.refresh();
    } catch (error) {
      console.error('Error following category:', error);
    } finally {
      setIsFollowing(false);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm flex items-center justify-between gap-1">
      <h3 className="text-xl font-medium">{category.name}</h3>
      <Button
        className="mt-2"
        onClick={handleFollowCategory}
        disabled={isFollowing}
      >
        {isFollowing ? 'Following...' : 'Follow'}
      </Button>
    </div>
  );
};
