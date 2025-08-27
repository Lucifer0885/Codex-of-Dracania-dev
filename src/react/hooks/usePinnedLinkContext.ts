import { useContext } from "react";
import { PinnedLinkContext } from "@context/PinnedLinkContext";

export const usePinnedLinkContext = () => useContext(PinnedLinkContext);