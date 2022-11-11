export type responseStatus = "success" | "error";

export type DocQueryResponse<S> = {
  status: responseStatus;
  errorMessage?: string;
  item?: S;
};

export type ListQueryResponse<S> = {
  status: responseStatus;
  errorMessage: string;
  list: S[];
  lastDoc?: any;
  isEmpty?: boolean;
};

export type MutationResponse = {
  status: responseStatus;
  errorMessage: string;
  successMessage: string;
  data?: any;
};
