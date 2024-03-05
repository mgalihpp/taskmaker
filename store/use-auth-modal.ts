import { create } from "zustand";

type AuthModalStore = {
  open: boolean;
  toggleOpen: () => void;
  set: (state: Partial<AuthModalStore>) => void;
};

export const useAuthModal = create<AuthModalStore>((set) => ({
  open: false,
  toggleOpen: () => set((state) => ({ open: !state.open })),
  set: (state) => set(state),
}));
