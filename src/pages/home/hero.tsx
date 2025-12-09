import Slider from "react-slick";
import { Image } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetBannerImages } from "@/api/queries/useGetImage";
import { NoDataFound } from "@/components/common/no-data-found";
import { Skeleton } from "@/components/common/skeleton";
import { getImageUrl } from "@/helper";

export const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768,

        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const { data, isLoading } = useGetBannerImages();

  return (
    <div className="w-full mt-2">
      {isLoading ? (
        <div className="w-full h-[280px] md:h-[360px] bg-gray-200">
          <Skeleton className="w-full h-full" />
        </div>
      ) : (
        <Slider {...settings}>
          {data && data?.length > 0 ? (
            data?.map(
              (
                banner: { image: string; link: string | null },
                index: number
              ) => (
                <div key={index} className="relative">
                  {banner?.image ? (
                    <div className="relative w-full aspect-[16/5] overflow-hidden">
                      {banner?.link ? (
                        <Link to={banner?.link} className="block w-full h-full">
                          <img
                            src={getImageUrl(banner?.image)}
                            alt="banner"
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      ) : (
                        <img
                          src={getImageUrl(banner?.image)}
                          alt="banner"
                          className="w-full h-full object-cover cursor-grab"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/5] flex items-center justify-center bg-gray-200">
                      <Image className="w-16 h-16 text-gray-500" />
                    </div>
                  )}
                </div>
              )
            )
          ) : (
            <div className="w-full h-[280px] flex items-center justify-center md:h-[360px] bg-gray-200">
              <NoDataFound />
            </div>
          )}
        </Slider>
      )}
    </div>
  );
};
