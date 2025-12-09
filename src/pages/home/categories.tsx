import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getImageUrl, slugify } from "@/helper";
import { Image } from "lucide-react";
import { Skeleton } from "@/components/common/skeleton";
import { useCategories } from "@/api/queries/useCategories";
import { Link } from "react-router-dom";
import type { CategoryType } from "@/type";

export const CategoriesSection = () => {
  const { data, isLoading } = useCategories();

  const categories = (data?.data as CategoryType[]) || [];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
    variableWidth: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  const CategorySkeleton = () => (
    <div className="flex flex-col items-center px-1 mx-1 sm:px-2 sm:mx-2">
      <Skeleton className="w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 rounded-lg" />
      <Skeleton className="mt-1 sm:mt-2 w-16 sm:w-18 md:w-20 h-3 sm:h-4 rounded" />
    </div>
  );

  return (
    <section className="w-full py-10 md:py-16">
      <Slider {...settings}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CategorySkeleton key={index} />
            ))
          : categories &&
            categories?.length > 0 &&
            categories?.map((category) => (
              <Link
                key={category?.id}
                to={`/categories/${category?.id}/${slugify(category?.name)}`}
                className="flex flex-col items-center px-1 mx-1 sm:px-2 sm:mx-2"
                aria-label={`Explore ${category?.name}`}>
                <div className="w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden shadow-md hover:bg-primary/20 transition-colors duration-300 relative p-1 sm:p-2">
                  {category?.icon ? (
                    <img
                      src={getImageUrl(category?.icon)}
                      alt={category?.name}
                      className="w-full h-full object-cover absolute"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Image className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                    </div>
                  )}
                </div>
                <span className="mt-1 sm:mt-2 text-xs font-medium text-gray-700 hover:text-primary max-w-[80px] sm:max-w-[100px] md:max-w-[120px] line-clamp-1 text-center">
                  {category?.name}
                </span>
              </Link>
            ))}
      </Slider>
    </section>
  );
};
