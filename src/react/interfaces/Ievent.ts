export type BaseDifficulty = "normal" | "painful" | "excruciating" | "fatal" | "infernal" | "merciless" | "bloodshed";
export type PWEventDifficulty = "pw-infernal" | "pw-merciless" | "pw-bloodshed";
export type EventDifficulty<T> = {
  [K in BaseDifficulty]: T;
} & {
  [K in PWEventDifficulty]?: T;
};

export type ProgressBar = { level?: number; achievements?: number; progress: number };

export interface GameEvent {
  progressBar: ProgressBar[];
  attirePercentBonus?: number;
  dropRates: EventDifficulty<number | number[]>;
}

export interface EventCalculatorResult {
  runs: number;
  drop: number;
}
