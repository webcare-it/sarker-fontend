import { useGetProductsByCategory } from "@/api/queries/useProducts";
import type { ProductType } from "@/type";
import { SectionTitle } from "@/components/common/section-title";
import { CardLayout } from "@/components/common/card-layout";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import { useParams } from "react-router-dom";
import { AnimationWrapper } from "@/components/common/animation-wrapper";
import { NoDataFound } from "@/components/common/no-data-found";
import { slugifyToTitle } from "@/helper";
import { BaseLayout } from "@/components/layout/base-layout";
import { SeoWrapper } from "@/components/common/seo-wrapper";

export const CategoriesProductPage = () => {
  const { name } = useParams();

  const { data, isLoading } = useGetProductsByCategory();

  const products = (data?.data as ProductType[]) || [];

  return (
    <>
      <SeoWrapper title={slugifyToTitle(name as string)} />

      <BaseLayout>
        <section className="mb-10 md:mb-20 container mx-auto mt-10">
          <SectionTitle title={slugifyToTitle(name as string)} />
          <CardLayout>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products?.length > 0 ? (
              products?.map((product, i: number) => (
                <AnimationWrapper
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}>
                  <ProductCard key={product.id} product={product} />
                </AnimationWrapper>
              ))
            ) : (
              <div className="col-span-5">
                <NoDataFound title="No products found" />
              </div>
            )}
          </CardLayout>
        </section>
      </BaseLayout>
    </>
  );
};
