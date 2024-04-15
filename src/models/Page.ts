export class Page<T> {
  content!: T[];        // Array of items in the current page
  pageable!: Pageable;  // Metadata about the pagination settings
  totalPages!: number;  // Total number of pages
  totalElements!: number;  // Total number of items
  last!: boolean;       // Whether this is the last page
  first!: boolean;      // Whether this is the first page
  empty!: boolean;      // Whether the content array is empty
}

export class Pageable {
  sort!: Sort;
  offset!: number;
  pageNumber!: number;
  pageSize!: number;
  paged!: boolean;
  unpaged!: boolean;
}

export class Sort {
  sorted!: boolean;
  unsorted!: boolean;
  empty!: boolean;
}
