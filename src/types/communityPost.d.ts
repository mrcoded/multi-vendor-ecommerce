export interface CommunityPostProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  categoryId?: string;
}
