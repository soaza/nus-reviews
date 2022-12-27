import create from "zustand";
import { TLeaderboardCategory } from "../utils/interface";

interface ILeaderboardState {
  category: TLeaderboardCategory;
  setCategory: (category: TLeaderboardCategory) => void;
  maxRows: number;
  setMaxRows: (rows: number) => void;
  incrementMaxRows: () => void;
}
export const useLeaderboardStore = create<ILeaderboardState>((set) => ({
  // CATEGORY
  category: "most_reviewed",
  setCategory: (category: TLeaderboardCategory) =>
    set((state) => ({ category: category })),

  // ROWS
  maxRows: 10,
  setMaxRows: (rows: number) => set((state) => ({ maxRows: rows })),
  incrementMaxRows: () => set((state) => ({ maxRows: state.maxRows + 10 })),
}));
