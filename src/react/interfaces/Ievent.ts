export type BaseDifficulty = "normal" | "painful" | "excruciating" | "fatal" | "infernal" | "merciless" | "bloodshed";
export type PWEventDifficulty = "pw-infernal" | "pw-merciless" | "pw-bloodshed";
export type EventDifficulty<T> = {
  [K in BaseDifficulty]: T;
} & {
  [K in PWEventDifficulty]?: T;
};

export interface GameEvent {
  progressBar: number;
  attirePercentBonus?: number;
  dropRates: EventDifficulty<number | number[]>;
}
