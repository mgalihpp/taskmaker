import { create } from "zustand";

type LeaveModalStore = {
  orgId?: string;
  isOpen: boolean;
  onOpen: (orgId: string) => void;
  onClose: () => void;
  set: (state: Partial<LeaveModalStore>) => void;
};

type DeleteModalStore = {
  orgId?: string;
  isOpen: boolean;
  onOpen: (orgId: string) => void;
  onClose: () => void;
  set: (state: Partial<LeaveModalStore>) => void;
};

export const useLeaveModal = create<LeaveModalStore>((set) => ({
  orgId: undefined,
  isOpen: false,
  onOpen: (orgId: string) => set({ isOpen: true, orgId }),
  onClose: () => set({ isOpen: false, orgId: undefined }),
  set: (state) => set(state),
}));

export const useDeleteModal = create<DeleteModalStore>((set) => ({
  orgId: undefined,
  isOpen: false,
  onOpen: (orgId: string) => set({ isOpen: true, orgId }),
  onClose: () => set({ isOpen: false, orgId: undefined }),
  set: (state) => set(state),
}));
