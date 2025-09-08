import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContext {
  loading: boolean;
  error: string | null;
  userInfo: UserInfo | null;
  setUser: (user: UserInfo) => void;
  updateUserField: <K extends keyof UserInfo>(field: K, value: UserInfo[K]) => Promise<void>;
  initUser: () => Promise<void>;
  clearError: () => void;
  // Avatar management functions
  addAvatar: (path: string) => Promise<void>;
  removeAvatar: (path: string) => Promise<void>;
  selectAvatar: (path: string) => Promise<void>;
  getSelectedAvatar: () => { path: string; selected: boolean } | undefined;
}

const UserContext = createContext<UserContext | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateUserInfo = (user: UserInfo): boolean => {
    try {
      // Check required fields
      if (!user.name || typeof user.name !== "string") return false;
      if (!user.role || !["player", "developer", "contributor"].includes(user.role)) return false;
      if (!user.avatars || !Array.isArray(user.avatars) || user.avatars.length === 0) return false;

      const selectedAvatars = user.avatars.filter((avatar) => avatar.selected);
      if (selectedAvatars.length !== 1) return false;

      for (const avatar of user.avatars) {
        if (!avatar.path || typeof avatar.path !== "string") return false;
        if (typeof avatar.selected !== "boolean") return false;
      }

      if (!user.inventory || typeof user.inventory !== "object") return false;
      if (!user.inventory.layout || typeof user.inventory.layout !== "object") return false;
      if (!user.inventory.lockedSlots || !Array.isArray(user.inventory.lockedSlots)) return false;

      if (!user.macros || typeof user.macros !== "object") return false;

      return true;
    } catch {
      return false;
    }
  };

  const initUser = useCallback(async () => {
    if (userInfo) return;

    setLoading(true);
    setError(null);
    try {
      const config = await window.electron.getConfig();
      console.log("Loaded config:", config);

      if (!validateUserInfo(config.user)) {
        throw new Error("Invalid user configuration structure");
      }

      setUserInfo(config.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load user info";
      setError(errorMessage);
      console.error("Error initializing user:", errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  const setUser = async (user: UserInfo) => {
    if (!validateUserInfo(user)) {
      setError("Invalid user data provided");
      return;
    }

    try {
      setError(null);
      setUserInfo(user);
      await window.electron.updateUserConfig(user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update user info";
      setError(errorMessage);
      console.error("Error updating user:", errorMessage);
    }
  };

  const updateUserField = async <K extends keyof UserInfo>(field: K, value: UserInfo[K]): Promise<void> => {
    if (!userInfo) {
      setError("No user data available to update");
      return;
    }

    const updatedUser = { ...userInfo, [field]: value };
    await setUser(updatedUser);
  };

  const clearError = () => {
    setError(null);
  };

  const getSelectedAvatar = () => {
    return userInfo?.avatars.find((avatar) => avatar.selected);
  };

  const addAvatar = async (path: string) => {
    if (!userInfo) {
      setError("No user data available to update");
      return;
    }

    const existingAvatar = userInfo.avatars.find((avatar) => avatar.path === path);
    if (existingAvatar) {
      setError("Avatar with this path already exists");
      return;
    }

    const isFirstAvatar = userInfo.avatars.length === 0;
    const updatedAvatars = [...userInfo.avatars, { path, selected: isFirstAvatar }];
    await updateUserField("avatars", updatedAvatars);
  };

  const removeAvatar = async (path: string) => {
    if (!userInfo) {
      setError("No user data available to update");
      return;
    }

    const avatarToRemove = userInfo.avatars.find((avatar) => avatar.path === path);
    if (!avatarToRemove) {
      setError("Avatar not found");
      return;
    }

    const updatedAvatars = userInfo.avatars.filter((avatar) => avatar.path !== path);

    if (avatarToRemove.selected && updatedAvatars.length > 0) {
      updatedAvatars[0].selected = true;
    }

    await updateUserField("avatars", updatedAvatars);
  };

  const selectAvatar = async (path: string) => {
    if (!userInfo) {
      setError("No user data available to update");
      return;
    }

    const updatedAvatars = userInfo.avatars.map((avatar) => ({
      ...avatar,
      selected: avatar.path === path,
    }));

    await updateUserField("avatars", updatedAvatars);
  };

  useEffect(() => {
    initUser();
  }, [initUser]);

  const contextValue: UserContext = {
    loading,
    error,
    userInfo,
    initUser,
    setUser,
    updateUserField,
    clearError,
    addAvatar,
    removeAvatar,
    selectAvatar,
    getSelectedAvatar,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export { UserContext };
