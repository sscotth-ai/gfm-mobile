import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

export default function PageShell() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6 pt-22">
        <Outlet />
      </main>
    </div>
  );
}
