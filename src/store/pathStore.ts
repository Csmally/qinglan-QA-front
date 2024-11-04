import { create } from "zustand";

interface PathStoreType {
  pathData: RouterItemType[]; // 类型化 pathData
  setPathData: (pathData: RouterItemType[]) => void; // 类型化 setPathData
}

const usePathStore = create<PathStoreType>((set) => ({
  pathData: [],
  setPathData: (pathData) => set({ pathData }),
}));

export default usePathStore;
