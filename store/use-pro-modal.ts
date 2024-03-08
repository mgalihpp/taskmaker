import { create } from "zustand";

type ProModalStore = {
  isOpen: boolean;
  orgId: string | null;
  onOpen: (orgId: string) => void;
  onClose: () => void;
  set: (state: Partial<ProModalStore>) => void;
};

export const useProModal = create<ProModalStore>((set) => ({
  isOpen: false,
  orgId: null,
  set: (state) => set(state),
  onOpen: (orgId: string) => set({ isOpen: true, orgId }),
  onClose: () => set({ isOpen: false }),
}));
