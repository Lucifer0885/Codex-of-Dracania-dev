export type BaseDifficulty = "normal" | "painful" | "excruciating" | "fatal" | "infernal" | "merciless" | "bloodshed";
export type PWEventDifficulty = "pw-infernal" | "pw-merciless" | "pw-bloodshed";
export type EventDifficulty<T> = {
  [K in BaseDifficulty]: T;
} & {
  [K in PWEventDifficulty]?: T;
};

export type ProgressBar = { level?: number; achievements?: number; progress: number };

export interface EventCalculatorResult {
  runs: number;
  drop: number;
}

export interface ProgressBarItem {
  page: number;
  progress: number;
  amount: number;
  name: string;
  icon: string;
}

export interface Event {
  id: string;
  name: string;
  image: string;
  description: string;
  progressBar: ProgressBar[];
  attirePercentBonus?: number;
  dropRates: EventDifficulty<number | number[]>;
  eventTips: string[];
  items: ProgressBarItem[];
}
