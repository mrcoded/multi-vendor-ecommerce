export interface CommunityPostProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date | string;
  categoryId?: string | null;
}

export interface CommunityPostFormProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  content: string;
  isActive: boolean;
}
