export const sortingLinks = (slug: string) => [
  {
    title: "Relevance",
    href: `/category/${slug}`,
    sort: null,
  },
  {
    title: "Price - High to Low",
    href: `/category/${slug}?sort=desc`,
    sort: "desc",
  },
  {
    title: "Price - Low to High",
    href: `/category/${slug}?sort=asc`,
    sort: "asc",
  },
];
