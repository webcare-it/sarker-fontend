import { useGetProductsForHome } from "@/api/queries/useProducts";
import { AnimationWrapper } from "@/components/common/animation-wrapper";
import { CardLayout } from "@/components/common/card-layout";
import { SectionTitle } from "@/components/common/section-title";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product";
import type { ProductType } from "@/type";
import { NoDataFound } from "@/components/common/no-data-found";
import { useTranslation } from "@/hooks/useTranslation";

export const FlashDealSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetProductsForHome("flash-deal");

  const products = (data?.data as ProductType[]) || [];

  return (
    <section
      className={`mb-10 md:mb-20 container mx-auto ${
        products?.length === 0 && !isLoading && "hidden"
      }`}>
      <SectionTitle title={t.flash_deal} />
      <CardLayout>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
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
  );
};
