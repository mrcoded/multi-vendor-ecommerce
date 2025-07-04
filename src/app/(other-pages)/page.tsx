import getData from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { CategoryProps } from "@/types/category";

import HeroPage from "@/components/HeroPage";
import StoreList from "@/components/StoreList";
import CommunityPost from "@/components/community/CommunityPost";
import CategoryList from "./category/_components/CategoryList";

export default async function Home() {
  const communityPosts = await getData("communityPosts");

  const categoriesData = await getData("categories");
  const categories = categoriesData?.filter((category: CategoryProps) => {
    return category.products.length > 1;
  });

  const session = await getServerSession(authOptions);
  console.log("session", session?.user);

  return (
    <div className="min-h-screen">
      <HeroPage />
      <StoreList />

      {categories?.map((category: CategoryProps) => {
        return (
          <div key={category.id} className="py-8">
            <CategoryList isStorePage={false} category={category} />
          </div>
        );
      })}

      <CommunityPost
        posts={communityPosts.slice(0, 3)}
        title="Featured Community Posts"
      />
    </div>
  );
}
