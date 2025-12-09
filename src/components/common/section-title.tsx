import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "./skeleton";

interface Props {
  title: string;
  linkText?: string;
  href?: string;
  className?: string;
}

export const SectionTitle = ({
  title,
  linkText,
  href,
  className = "",
}: Props) => {
  return (
    <div
      className={`flex flex-wrap md:justify-between items-start sm:items-end md:gap-2 mb-6 md:mb-8 px-4 md:px-0 ${className}`}>
      <h2 className="text-lg font-bold md:text-3xl lg:text-4xl text-primary tracking-tight flex">
        {title}
        <span className="w-16 md:w-28 h-0.5 md:h-1 bg-primary rounded-full mt-5 md:mt-8" />
      </h2>

      {linkText && href && (
        <Link
          to={href}
          className="flex items-center gap-1 text-base font-medium text-primary hover:text-primary/80 transition-colors group">
          {linkText}
          <ArrowRight className="w-6 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export const SectionTitleSkeleton = () => {
  return (
    <div className="flex justify-between items-start sm:items-end gap-4 mb-6 md:mb-8 px-4 md:px-0">
      <div className="flex items-end">
        <Skeleton className="h-8 md:h-10 lg:h-14 w-[250px] md:w-xs lg:w-xl rounded-lg" />
        <Skeleton className="h-1 w-10 md:w-24 lg:w-36 rounded-lg" />
      </div>
    </div>
  );
};
