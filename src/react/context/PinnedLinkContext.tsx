import { createContext, useState, type ReactNode } from "react";
import type { NavLink } from "@interfaces/Igeneral";

interface PinnedLinkContext {
  pinnedLinks: NavLink[];
  addPinnedLink: (link: NavLink) => void;
  removePinnedLink: (link: NavLink) => void;
}

export const PinnedLinkContext = createContext<PinnedLinkContext>({
  pinnedLinks: [],
  addPinnedLink: () => {},
  removePinnedLink: () => {},
});

export const PinnedLinkProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedLinks, setPinnedLinks] = useState<NavLink[]>(
    localStorage.getItem("pinnedLinks") ? JSON.parse(localStorage.getItem("pinnedLinks")!) : []
  );

  const addPinnedLink = (link: NavLink) => {
    setPinnedLinks((prev) => (prev.includes(link) ? prev : [...prev, link]));
    localStorage.setItem("pinnedLinks", JSON.stringify([...pinnedLinks, link]));
  };

  const removePinnedLink = (link: NavLink) => {
    setPinnedLinks((prev) => prev.filter((l) => l !== link));
    localStorage.setItem("pinnedLinks", JSON.stringify(pinnedLinks.filter((l) => l !== link)));
  };

  return (
    <PinnedLinkContext.Provider value={{ pinnedLinks, addPinnedLink, removePinnedLink }}>
      {children}
    </PinnedLinkContext.Provider>
  );
};
