import Loading from "@/app/loading";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { useCategories } from "@/hooks/useCategories";

export default async function Page() {
  const { data: categories } = useCategories();

  if (!categories) return <Loading />;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={categories} />
    </div>
  );
}
