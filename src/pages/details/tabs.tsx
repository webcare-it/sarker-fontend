import { useGetReviews } from "@/api/queries/useGetReviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getYouTubeEmbedUrl } from "@/helper";
import type { ProductDetailsType } from "@/type";

interface Props {
  product: ProductDetailsType;
}

interface ReviewType {
  user_id: number;
  user_name: string;
  avatar: string;
  rating: number;
  comment: string;
  time: string;
}

export const ProductTabs = ({ product }: Props) => {
  const { data, isLoading } = useGetReviews();

  const reviews = (data?.data as ReviewType[]) || [];

  return (
    <div className="mt-6 md:mt-8 mx-4 md:mx-auto">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="flex w-full overflow-x-auto">
          <TabsTrigger
            value="description"
            className="flex-shrink-0 md:whitespace-nowrap cursor-pointer">
            Details
          </TabsTrigger>
          <TabsTrigger
            value="policy"
            className="flex-shrink-0 md:whitespace-nowrap cursor-pointer">
            Return Policy
          </TabsTrigger>
          <TabsTrigger
            value="video"
            className="flex-shrink-0 md:whitespace-nowrap cursor-pointer">
            Video
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="flex-shrink-0 md:whitespace-nowrap cursor-pointer">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          {product?.description ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          ) : (
            <p className="text-muted-foreground">
              No product description available.
            </p>
          )}
        </TabsContent>

        <TabsContent value="policy" className="mt-6">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: `
                <h3 style="font-size: 1.5rem; font-weight: 600; color: #000;">Return Policy</h3>
                <p>We offer a 30-day return policy for all products. Here are the key points:</p>
                <ul>
                  <li>Items must be returned in original condition with tags attached</li>
                  <li>Returns must be initiated within 30 days of purchase</li>
                  <li>Customer is responsible for return shipping costs</li>
                  <li>Refunds will be processed within 5-7 business days</li>
                  <li>Custom or personalized items are not eligible for return</li>
                </ul>
                <p>For any questions about returns, please contact our customer service team.</p>
              `,
            }}
          />
        </TabsContent>

        <TabsContent value="video" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Product Video
            </h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {product?.video_link ? (
                <iframe
                  src={getYouTubeEmbedUrl(product.video_link) || ""}
                  title="Product Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">
                      Product video will be available soon
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Customer Reviews
            </h3>

            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : reviews?.length > 0 ? (
              reviews?.map((review, index: number) => (
                <div key={index} className="border rounded-lg p-2 md:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar>
                      <AvatarImage src={review?.avatar} />
                      <AvatarFallback>
                        {review?.user_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex justify-between w-full items-center">
                      <div>
                        <p className="font-medium text-sm md:text-base text-foreground">
                          {review?.user_name}
                        </p>
                        <div className="flex items-center gap-0.5 md:gap-1">
                          {[...Array(review?.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-3 h-3 md:w-4 md:h-4 text-yellow-500"
                              fill="currentColor"
                              viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs md:text-nowrap md:text-sm text-muted-foreground">
                      {review?.time}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {review?.comment}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No reviews found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
