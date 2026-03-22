import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

export default function PageShell() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <main className="pb-20 pt-[88px] sm:pt-[96px]">
        <Outlet />
      </main>
    </div>
  );
}
