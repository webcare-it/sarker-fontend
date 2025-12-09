import { useGetLogo } from "@/api/queries/useGetImage";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/common/skeleton";
import { getImageUrl } from "@/helper";
import { Image } from "lucide-react";

interface Props {
  type: "DESKTOP" | "MOBILE";
}

export const Logo = ({ type }: Props) => {
  const { data, isLoading } = useGetLogo();
  const logo = data?.[0];

  if (type === "DESKTOP") {
    return (
      <Link to="/">
        <div className="w-40 h-12 relative overflow-hidden">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : logo ? (
            <img
              src={getImageUrl(logo as string)}
              alt="logo"
              className="absolute w-full h-full object-contain"
            />
          ) : (
            <div className="absolute w-full h-full flex items-center justify-center">
              <Image className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (type === "MOBILE") {
    return (
      <Link to="/">
        <div className="w-28 h-10 relative overflow-hidden">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : logo ? (
            <img
              src={getImageUrl(logo as string)}
              alt="logo"
              className="absolute w-full h-full object-contain"
            />
          ) : (
            <div className="absolute w-full h-full flex items-center justify-center">
              <Image className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </Link>
    );
  }

  return null;
};
