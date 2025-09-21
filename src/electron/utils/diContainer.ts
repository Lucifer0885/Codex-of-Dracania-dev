export interface ServiceContainer {
  get<T>(serviceKey: string): T;
  register<T>(serviceKey: string, factory: () => T): void;
  registerSingleton<T>(serviceKey: string, factory: () => T): void;
}

class DIContainer implements ServiceContainer {
  private services = new Map<string, () => unknown>();
  private singletons = new Map<string, unknown>();
  private singletonFactories = new Map<string, () => unknown>();

  register<T>(serviceKey: string, factory: () => T): void {
    this.services.set(serviceKey, factory);
  }

  registerSingleton<T>(serviceKey: string, factory: () => T): void {
    this.singletonFactories.set(serviceKey, factory);
  }

  get<T>(serviceKey: string): T {
    if (this.singletons.has(serviceKey)) {
      return this.singletons.get(serviceKey) as T;
    }

    if (this.singletonFactories.has(serviceKey)) {
      const factory = this.singletonFactories.get(serviceKey)!;
      const instance = factory();
      this.singletons.set(serviceKey, instance);
      return instance as T;
    }

    if (this.services.has(serviceKey)) {
      const factory = this.services.get(serviceKey)!;
      return factory() as T;
    }

    throw new Error(`Service '${serviceKey}' not found in container`);
  }

  clear(): void {
    this.services.clear();
    this.singletons.clear();
    this.singletonFactories.clear();
  }
}

export const SERVICE_KEYS = {
  MACRO_MANAGER: "MacroManager",
  KEYBINDING_MANAGER: "KeybindingManager",
  CONFIG_SERVICE: "ConfigService",
} as const;

export const container = new DIContainer();
