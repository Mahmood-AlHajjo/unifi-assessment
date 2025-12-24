"use client";

import { useState, useEffect, useCallback } from "react";
import { Bike } from "@/types/bike";
import { fetchStolenBikes, formatDate } from "@/services/bikeApi";
import {
  FiltersContainer,
  FiltersTitle,
  FiltersGrid,
  FilterGroup,
  FilterLabel,
  Input,
  SearchButton,
  StatsBar,
  TotalCount,
  PageInfo,
  BikeGrid,
  BikeCard,
  BikeImageContainer,
  BikeImage,
  PlaceholderImage,
  BikeDetails,
  BikeTitle,
  BikeDescription,
  BikeMetaGrid,
  BikeMeta,
  MetaLabel,
  MetaValue,
  StolenBadge,
  PaginationContainer,
  PaginationButton,
  PaginationEllipsis,
  LoadingContainer,
  Spinner,
  LoadingText,
  SkeletonCard,
  SkeletonImage,
  SkeletonContent,
  SkeletonLine,
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
  EmptyContainer,
  EmptyTitle,
  EmptyMessage,
  DateFilterNotice,
} from "./styled";
import {
  FilterIcon,
  SearchIcon,
  LocationIcon,
  CalendarIcon,
  ClockIcon,
  ErrorIcon,
  EmptyIcon,
  PlaceholderBikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  WarningIcon,
} from "./Icons";

const PER_PAGE = 10;

interface Filters {
  query: string;
  dateFrom: string;
  dateTo: string;
}

export default function BikeTheftList() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    query: "",
    dateFrom: "",
    dateTo: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    query: "",
    dateFrom: "",
    dateTo: "",
  });

  const loadBikes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchStolenBikes({
        page,
        query: appliedFilters.query,
      });

      let filteredResult = result.bikes;

      // Client-side date filtering (API limitation workaround)
      if (appliedFilters.dateFrom || appliedFilters.dateTo) {
        const fromTimestamp = appliedFilters.dateFrom
          ? Math.floor(new Date(appliedFilters.dateFrom).getTime() / 1000)
          : 0;
        const toTimestamp = appliedFilters.dateTo
          ? Math.floor(new Date(appliedFilters.dateTo + "T23:59:59").getTime() / 1000)
          : Infinity;

        filteredResult = filteredResult.filter(
          (bike) => bike.date_stolen >= fromTimestamp && bike.date_stolen <= toTimestamp
        );
      }

      setBikes(result.bikes);
      setFilteredBikes(filteredResult);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [page, appliedFilters]);

  useEffect(() => {
    loadBikes();
  }, [loadBikes]);

  const handleSearch = () => {
    setPage(1);
    setAppliedFilters({ ...filters });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const totalPages = Math.ceil(total / PER_PAGE);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const isDateFilterActive = appliedFilters.dateFrom || appliedFilters.dateTo;

  return (
    <>
      {/* Filters Section */}
      <FiltersContainer>
        <FiltersTitle>
          <FilterIcon />
          Search & Filter
        </FiltersTitle>
        <FiltersGrid>
          <FilterGroup>
            <FilterLabel htmlFor="query">Search by title</FilterLabel>
            <Input
              id="query"
              type="text"
              placeholder="e.g., Trek, Mountain bike..."
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              onKeyPress={handleKeyPress}
            />
          </FilterGroup>
          <FilterGroup>
            <FilterLabel htmlFor="dateFrom">From date</FilterLabel>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            />
          </FilterGroup>
          <FilterGroup>
            <FilterLabel htmlFor="dateTo">To date</FilterLabel>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            />
          </FilterGroup>
          <SearchButton onClick={handleSearch}>
            <SearchIcon />
            Search
          </SearchButton>
        </FiltersGrid>
        {isDateFilterActive && (
          <DateFilterNotice>
            <WarningIcon />
            <span>
              <strong>Note:</strong> Date filtering is applied client-side due to API limitations. 
              Results shown are filtered from the current page only.
            </span>
          </DateFilterNotice>
        )}
      </FiltersContainer>

      {/* Stats Bar */}
      <StatsBar>
        <TotalCount>
          Found <strong>{total.toLocaleString()}</strong> stolen bikes in Munich area
          {isDateFilterActive && filteredBikes.length !== bikes.length && (
            <span> ({filteredBikes.length} shown after date filter)</span>
          )}
        </TotalCount>
        {!loading && !error && bikes.length > 0 && (
          <PageInfo>
            Page {page} of {totalPages}
          </PageInfo>
        )}
      </StatsBar>

      {/* Loading State */}
      {loading && (
        <>
          <LoadingContainer>
            <Spinner />
            <LoadingText>Loading stolen bike reports...</LoadingText>
          </LoadingContainer>
          <BikeGrid>
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonImage />
                <SkeletonContent>
                  <SkeletonLine $width="70%" />
                  <SkeletonLine $width="100%" />
                  <SkeletonLine $width="50%" />
                  <SkeletonLine $width="60%" />
                </SkeletonContent>
              </SkeletonCard>
            ))}
          </BikeGrid>
        </>
      )}

      {/* Error State */}
      {error && !loading && (
        <ErrorContainer>
          <ErrorIcon />
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={loadBikes}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      )}

      {/* Empty State */}
      {!loading && !error && filteredBikes.length === 0 && (
        <EmptyContainer>
          <EmptyIcon />
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyMessage>
            {appliedFilters.query || isDateFilterActive
              ? "Try adjusting your search filters to find more results."
              : "No stolen bikes have been reported in this area yet."}
          </EmptyMessage>
        </EmptyContainer>
      )}

      {/* Bike List */}
      {!loading && !error && filteredBikes.length > 0 && (
        <>
          <BikeGrid>
            {filteredBikes.map((bike, index) => (
              <BikeCard key={bike.id} $index={index}>
                <BikeImageContainer>
                  {bike.thumb || bike.large_img ? (
                    <BikeImage
                      src={bike.thumb || bike.large_img || ""}
                      alt={bike.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement?.querySelector(".placeholder")?.classList.remove("hidden");
                      }}
                    />
                  ) : (
                    <PlaceholderImage>
                      <PlaceholderBikeIcon />
                    </PlaceholderImage>
                  )}
                </BikeImageContainer>
                <BikeDetails>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <BikeTitle>
                      <a href={bike.url} target="_blank" rel="noopener noreferrer">
                        {bike.title}
                      </a>
                    </BikeTitle>
                    <StolenBadge>STOLEN</StolenBadge>
                  </div>
                  
                  {bike.description && (
                    <BikeDescription>{bike.description}</BikeDescription>
                  )}

                  <BikeMetaGrid>
                    <BikeMeta>
                      <CalendarIcon />
                      <div>
                        <MetaLabel>Stolen: </MetaLabel>
                        <MetaValue>{formatDate(bike.date_stolen)}</MetaValue>
                      </div>
                    </BikeMeta>
                    <BikeMeta>
                      <ClockIcon />
                      <div>
                        <MetaLabel>Reported: </MetaLabel>
                        <MetaValue>{formatDate(bike.date_stolen)}</MetaValue>
                      </div>
                    </BikeMeta>
                    <BikeMeta>
                      <LocationIcon />
                      <div>
                        <MetaLabel>Location: </MetaLabel>
                        <MetaValue>{bike.stolen_location || "Unknown"}</MetaValue>
                      </div>
                    </BikeMeta>
                    {bike.frame_colors.length > 0 && (
                      <BikeMeta>
                        <span style={{ width: 16, height: 16, flexShrink: 0 }}>🎨</span>
                        <div>
                          <MetaLabel>Colors: </MetaLabel>
                          <MetaValue>{bike.frame_colors.join(", ")}</MetaValue>
                        </div>
                      </BikeMeta>
                    )}
                  </BikeMetaGrid>
                </BikeDetails>
              </BikeCard>
            ))}
          </BikeGrid>

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationButton
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeftIcon />
              </PaginationButton>

              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <PaginationEllipsis key={`ellipsis-${i}`}>...</PaginationEllipsis>
                ) : (
                  <PaginationButton
                    key={p}
                    $active={page === p}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationButton>
                )
              )}

              <PaginationButton
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRightIcon />
              </PaginationButton>
            </PaginationContainer>
          )}
        </>
      )}
    </>
  );
}

