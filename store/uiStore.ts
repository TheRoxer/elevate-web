/**
 * Global UI State Store using Zustand
 *
 * This store manages client-side UI state that needs to be shared across components.
 * Uses persist middleware to save certain state to localStorage.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  // Sidebar state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // Mobile menu state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  // Order filters
  orderFilters: {
    status?: string;
    searchQuery?: string;
  };
  setOrderFilters: (filters: UIState["orderFilters"]) => void;
  clearOrderFilters: () => void;

  // Modal state
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Mobile menu
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

      // Filters
      orderFilters: {},
      setOrderFilters: (filters) => set({ orderFilters: filters }),
      clearOrderFilters: () => set({ orderFilters: {} }),

      // Modals
      activeModal: null,
      openModal: (modalId) => set({ activeModal: modalId }),
      closeModal: () => set({ activeModal: null }),
    }),
    {
      name: "elevate-ui-storage",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        // Only persist what should survive page refresh
      }),
    }
  )
);
