export interface Macro {
  name: string;
  description: string;
  keybind: string;
  type: "default" | "custom";
  execute: () => Promise<void>;
}
