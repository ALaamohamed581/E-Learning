export type QueryString = {
  fields: string;
  page?: number;
  limit: number;
  skip: number;
  sort: any;
  queryStr: any;
};

export type paginatedData = {
  data: unknown;
  numberOfPages: number;
  page: number;
};
