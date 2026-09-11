export const DEFAULT_PAGE_SIZE = 10;

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function paginateCandidates<T>(
  items: readonly T[],
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE,
): PaginatedResult<T> {
  const safePageSize = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE;
  const total = items.length;
  const totalPages = Math.ceil(total / safePageSize);
  const start = (page - 1) * safePageSize;
  const pageItems = start >= total || start < 0 ? [] : items.slice(start, start + safePageSize);

  return {
    items: pageItems,
    page,
    pageSize: safePageSize,
    total,
    totalPages,
  };
}
