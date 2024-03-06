import { create } from "zustand";

type ProModalStore = {
  isOpen: boolean;
  orgId: string | null;
  onOpen: () => void;
  onClose: () => void;
  set: (state: Partial<ProModalStore>) => void;
};

export const useProModal = create<ProModalStore>((set) => ({
  isOpen: false,
  orgId: null,
  set: (state) => set(state),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
