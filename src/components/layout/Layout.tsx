import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      {!user && <Footer />}
    </div>
  );
}
