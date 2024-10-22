import { FetchRouterItemType } from "@/common/types/commonTypes";
import { create } from "zustand";

interface PathStoreType {
  pathData: FetchRouterItemType[]; // 类型化 pathData
  setPathData: (pathData: FetchRouterItemType[]) => void; // 类型化 setPathData
}

const usePathStore = create<PathStoreType>((set) => ({
  pathData: [],
  setPathData: (pathData) => set({ pathData }),
}));

export default usePathStore;
