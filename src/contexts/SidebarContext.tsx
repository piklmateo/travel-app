import { createContext, ReactNode, useContext, useState } from "react";

interface SidebarProviderProps {
  children: ReactNode;
}

interface SidebarContextType {
  handleCloseSidebar: () => void;
  isOpen: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleCloseSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        handleCloseSidebar,
        isOpen,
      }}
    >
      <div>{children}</div>
    </SidebarContext.Provider>
  );
};

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be within a SidebarProvider");
  }
  return context;
}

export { SidebarProvider, useSidebar };
