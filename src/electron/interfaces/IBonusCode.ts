export interface IBonusCode {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  additionalInfo?: string;
  rewards: IBonusCodeRewards[];
}

export interface IBonusCodeRewards {
  name: string;
  icon: string;
  amount: number;
}

export interface IBonusCodeResponse {
  success: boolean;
  message: string;
  data: IBonusCode | null;
}

export interface IBonusCodesResponse {
  success: boolean;
  message: string;
  data: IBonusCode[];
}

export interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IBonusCodesPaginatedResponse {
  success: boolean;
  message: string;
  data: IBonusCode[];
  pagination: IPaginationMeta;
}

export interface GetBonusCodesParams {
  page?: number;
  limit?: number;
  sortBy?: "startDate" | "endDate" | "name" | "id";
  order?: "asc" | "desc";
}
