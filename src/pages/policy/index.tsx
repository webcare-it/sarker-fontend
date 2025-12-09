import { useGetPolicy } from "@/api/queries/usePolicy";
import { SeoWrapper } from "@/components/common/seo-wrapper";
import { Skeleton } from "@/components/common/skeleton";
import { BaseLayout } from "@/components/layout/base-layout";

export const PolicyPage = () => {
  const { data, isLoading, key } = useGetPolicy();

  const content = data?.data?.[0]?.content as string;

  return (
    <>
      <SeoWrapper title={`Policy ${key?.toUpperCase()}`} />
      <BaseLayout isShowMegaMenu={false}>
        <div className="my-10 md:my-16">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          ) : content ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div> No content found</div>
          )}
        </div>
      </BaseLayout>
    </>
  );
};
