import {
  SectionTitle,
  SectionTitleSkeleton,
} from "@/components/common/section-title";
import { useProductsByCategoryHome } from "@/api/queries/useProducts";
import type { CategoryProductType } from "@/type";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import { CardLayout } from "@/components/common/card-layout";
import { AnimationWrapper } from "@/components/common/animation-wrapper";
import { slugify } from "@/helper";

interface CategoryProductsType {
  categoryId: unknown;
  data: { data?: CategoryProductType[] };
  isLoading: boolean;
  error: unknown;
}

interface FormatType {
  categoryId: string;
  categoryName: string;
  products: CategoryProductType[];
  hasProducts: boolean;
}

const formatCategoryData = (rawData: CategoryProductsType[]): FormatType[] => {
  if (!rawData || !Array.isArray(rawData)) return [];

  return rawData
    ?.filter(
      (category) => category.data && !category.error && !category.isLoading
    )
    ?.map((category) => {
      const products = category?.data?.data ?? [];
      const firstProduct = products?.[0] ?? {};

      return {
        categoryId: String(category.categoryId),
        categoryName: firstProduct?.category_name,
        products: products,
        hasProducts: products?.length > 0,
      };
    })
    ?.filter((category) => category.hasProducts);
};

export const CategoryProductsSection = () => {
  const { data, isLoading } = useProductsByCategoryHome();

  const formattedData = formatCategoryData(data as CategoryProductsType[]);

  return (
    <section>
      {isLoading ? (
        <CategoryProductsSkeleton />
      ) : (
        <>
          {formattedData?.length > 0 &&
            formattedData?.map((category) => (
              <section key={category?.categoryId} className="mb-10 md:mb-20">
                <SectionTitle
                  title={category?.categoryName}
                  linkText="View All"
                  href={`/categories/${category?.categoryId}/${slugify(
                    category?.categoryName
                  )}`}
                />
                <CardLayout>
                  {category?.products?.map((product, i: number) => (
                    <AnimationWrapper
                      key={product.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}>
                      <ProductCard key={product.id} product={product} />
                    </AnimationWrapper>
                  ))}
                </CardLayout>
              </section>
            ))}
        </>
      )}
    </section>
  );
};

const CategoryProductsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <SectionTitleSkeleton />
          <CardLayout>
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </CardLayout>
        </div>
      ))}
    </>
  );
};
