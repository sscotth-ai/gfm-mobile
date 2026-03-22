import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageShell from "@/components/layout/PageShell";

const FundraiserPage = lazy(() => import("@/pages/FundraiserPage"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

export default function App() {
  return (
    <Routes>
      {/* Immersive fundraiser — rendered outside PageShell */}
      <Route
        path="fundraiser/:slug"
        element={
          <Suspense
            fallback={
              <div className="flex h-dvh items-center justify-center bg-[#050505]">
                <div className="size-8 animate-spin rounded-full border-2 border-[#0df29e] border-t-transparent" />
              </div>
            }
          >
            <FundraiserPage />
          </Suspense>
        }
      />

      <Route element={<PageShell />}>
        <Route
          index
          element={<Navigate to="/fundraiser/realtime-alerts-for-wildfire-safety-r5jkk" replace />}
        />
        <Route
          path="communities/:slug"
          element={
            <Suspense
              fallback={<div className="py-12 text-center text-muted-foreground">Loading...</div>}
            >
              <CommunityPage />
            </Suspense>
          }
        />
        <Route
          path="u/:username"
          element={
            <Suspense
              fallback={<div className="py-12 text-center text-muted-foreground">Loading...</div>}
            >
              <ProfilePage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
