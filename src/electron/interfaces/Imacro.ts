export type MacroAction = "mouse-action" | "keyboard-action" | "wait";

export type MacroType = "default" | "custom";

export interface MacroStep {
  id: string;
  type: MacroAction;
  action: string;
  value: string;
  wait: number;
}

export interface Macro {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  onRepeat: boolean;
  repeat: number;
  type: MacroType;
  keybinding?: string;
  actions: MacroStep[];
}
