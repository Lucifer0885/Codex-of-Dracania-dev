export interface IBonusCode {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  additionalInfo?: string;
  active: boolean;
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
