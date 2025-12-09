import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface PaginationDataType {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface PaginationWrapperProps {
  paginationData: PaginationDataType;
  onPageChange: (page: number) => void;
  className?: string;
}

export const PaginationWrapper = ({
  paginationData,
  onPageChange,
  className = "mb-10 mt-10 md:mb-20 container mx-auto",
}: PaginationWrapperProps) => {
  const { current_page, last_page, links } = paginationData;

  const handlePageClick = (page: number) => {
    if (page !== current_page && page >= 1 && page <= last_page) {
      onPageChange(page);
    }
  };

  const getPageNumber = (url: string | null): number | null => {
    if (!url) return null;
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const page = urlParams.get("page");
    return page ? parseInt(page, 10) : null;
  };

  return (
    <section className={className}>
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (current_page > 1) {
                  handlePageClick(current_page - 1);
                }
              }}
              className={
                current_page <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* Page Numbers */}
          {links
            .filter(
              (link) => link.label !== "« Previous" && link.label !== "Next »"
            )
            .map((link, index) => {
              const pageNumber = getPageNumber(link.url);
              if (!pageNumber) return null;

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={link.active}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(pageNumber);
                    }}
                    className="cursor-pointer">
                    {link.label}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

          {/* Show ellipsis if there are more pages */}
          {current_page < last_page - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (current_page < last_page) {
                  handlePageClick(current_page + 1);
                }
              }}
              className={
                current_page >= last_page
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};
