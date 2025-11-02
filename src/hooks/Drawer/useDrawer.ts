// hooks/Drawer/useDrawer.ts
import { create } from 'zustand';

interface DrawerState {
  isDrawerVisible: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isDrawerVisible: false,
  openDrawer: () => set({ isDrawerVisible: true }),
  closeDrawer: () => set({ isDrawerVisible: false }),
}));
