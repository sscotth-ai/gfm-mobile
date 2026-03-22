import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

export default function PageShell() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <main className="pb-20 pt-[64px] md:pt-[88px]">
        <Outlet />
      </main>
    </div>
  );
}
