export function isValidKeybind(keybind: string): boolean {
  if (!keybind || typeof keybind !== "string") {
    return false;
  }

  const validPattern =
    /^(Ctrl\+|Alt\+|Shift\+|CmdOrCtrl\+)*(F[1-9]|F1[0-2]|[A-Z]|[0-9]|Space|Tab|Enter|Escape|Up|Down|Left|Right)$/i;
  return validPattern.test(keybind);
}

export function normalizeKeybind(keybind: string): string {
  return keybind
    .split("+")
    .map((part) => part.trim())
    .map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("+");
}

export function areKeybindsEqual(keybind1: string, keybind2: string): boolean {
  return normalizeKeybind(keybind1) === normalizeKeybind(keybind2);
}

export function findKeybindConflicts(macros: Array<{ id: string; name: string; keybinding?: string }>): Array<{
  keybind: string;
  conflictingMacros: Array<{ id: string; name: string }>;
}> {
  const keybindMap = new Map<string, Array<{ id: string; name: string }>>();

  for (const macro of macros) {
    if (macro.keybinding) {
      const normalizedKeybind = normalizeKeybind(macro.keybinding);
      if (!keybindMap.has(normalizedKeybind)) {
        keybindMap.set(normalizedKeybind, []);
      }
      keybindMap.get(normalizedKeybind)!.push({ id: macro.id, name: macro.name });
    }
  }

  const conflicts: Array<{
    keybind: string;
    conflictingMacros: Array<{ id: string; name: string }>;
  }> = [];

  for (const [keybind, macros] of keybindMap.entries()) {
    if (macros.length > 1) {
      conflicts.push({
        keybind,
        conflictingMacros: macros,
      });
    }
  }

  return conflicts;
}

export function suggestAlternativeKeybinds(requestedKeybind: string, existingKeybinds: string[]): string[] {
  const suggestions: string[] = [];
  const normalized = normalizeKeybind(requestedKeybind);

  const fKeyMatch = normalized.match(/^(.*?)F(\d+)$/);
  if (fKeyMatch) {
    const prefix = fKeyMatch[1];
    const keyNumber = parseInt(fKeyMatch[2]);

    for (let i = 1; i <= 12; i++) {
      if (i !== keyNumber) {
        const suggestion = `${prefix}F${i}`;
        if (!existingKeybinds.some((kb) => areKeybindsEqual(kb, suggestion))) {
          suggestions.push(suggestion);
          if (suggestions.length >= 3) break;
        }
      }
    }
  }

  const modifiers = ["Ctrl+", "Alt+", "Shift+"];
  for (const modifier of modifiers) {
    if (!normalized.includes(modifier.replace("+", ""))) {
      const suggestion = modifier + normalized;
      if (!existingKeybinds.some((kb) => areKeybindsEqual(kb, suggestion))) {
        suggestions.push(suggestion);
        if (suggestions.length >= 5) break;
      }
    }
  }

  return suggestions.slice(0, 5);
}
