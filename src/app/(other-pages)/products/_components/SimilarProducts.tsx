import { ProductProp } from "@/types/products";

import CategoryCarousel from "@/components/carousels/CategoryCarousel";
import { Card, CardContent } from "@/components/ui/card";

function SimilarProducts({ products }: { products: ProductProp[] }) {
  if (products.length === 0) return null;

  return (
    <Card className="overflow-hidden border-border/80 shadow-none">
      <CardContent className="overflow-hidden p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground sm:text-xl">
          You May Also Like
        </h2>
        <div className="overflow-hidden">
          <CategoryCarousel
            products={products}
            clipOverflow
            autoPlay={false}
            infinite={false}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default SimilarProducts;
