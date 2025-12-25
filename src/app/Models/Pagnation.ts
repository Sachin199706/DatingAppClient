export interface Pagination  {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export class PaginatedResult<T>  {
    items?: T;
    metadata?: Pagination;
}