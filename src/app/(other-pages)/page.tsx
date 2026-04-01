import { Suspense } from "react";

import Loading from "../loading";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { fetchAllCategoriesAction } from "@/lib/actions/category-actions";
import { getAllCommunityPostsAction } from "@/lib/actions/community-actions";

import HeroPage from "@/components/HeroPage";
import StoreList from "@/components/StoreList";
import CommunityPost from "@/components/community/CommunityPost";
import CategoryList from "./category/_components/CategoryList";
import SearchForm from "@/components/forms/SearchForm";

export default async function Home() {
  const { data: communityPosts } = await getAllCommunityPostsAction();
  //if no community posts
  // if (!communityPosts) return null;

  const { data: categoriesData } = await fetchAllCategoriesAction();

  const categories = categoriesData?.filter((category) => {
    return category.products.length > 1;
  });

  //get user session
  const session = await getServerSession(authOptions);
  // console.log("session", session?.user);

  const slicedPosts = communityPosts?.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <HeroPage />

        <div className="sm:hidden flex flex-1 max-w-md">
          <SearchForm />
        </div>

        <StoreList />

        {categories?.map((category) => {
          return (
            <div key={category.id} className="py-3.5 md:py-8">
              <CategoryList isStorePage={false} category={category} />
            </div>
          );
        })}

        <CommunityPost posts={slicedPosts} title="Featured Community Posts" />
      </Suspense>
    </div>
  );
}
