import create from "zustand";
import { TLeaderboardCategory } from "../utils/interface";

interface ILeaderboardState {
  category: TLeaderboardCategory;
  setCategory: (category: TLeaderboardCategory) => void;
}
export const useLeaderboardStore = create<ILeaderboardState>((set) => ({
  category: "most_reviewed",
  setCategory: (category: TLeaderboardCategory) =>
    set((state) => ({ category: category })),
}));
