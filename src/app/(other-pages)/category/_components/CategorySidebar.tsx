import Link from "next/link";
import Image from "next/image";

import { CategoryProps } from "@/types/category";

type CategorySidebarProps = {
  categories: CategoryProps[];
};

function CategorySidebar({ categories }: CategorySidebarProps) {
  const withProducts = categories.filter(
    (category) => category.products.length > 0,
  );

  return (
    <div className="col-span-4 hidden overflow-hidden rounded-lg border border-border bg-card text-card-foreground sm:block lg:col-span-3">
      <h2 className="border-b border-border bg-secondary px-6 py-3 font-semibold">
        Shop By Category ({withProducts.length})
      </h2>
      <div className="custom-scrollbar flex h-[300px] flex-1 flex-col gap-2 overflow-y-auto px-6 py-3">
        {withProducts.length > 0 ? (
          withProducts.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center gap-3 rounded-md transition-all duration-300 hover:bg-muted"
            >
              <Image
                width={40}
                height={40}
                sizes="40px"
                loading="lazy"
                className="size-10 rounded-full border border-primary/30 object-cover"
                src={category.imageUrl ?? ""}
                alt={category.title}
              />
              <span className="line-clamp-1 truncate text-sm">
                {category.title}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No categories yet.</p>
        )}
      </div>
    </div>
  );
}

export default CategorySidebar;
