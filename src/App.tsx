import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageShell from "@/components/layout/PageShell";

const FundraiserPage = lazy(() => import("@/pages/FundraiserPage"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

export default function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route
          index
          element={<Navigate to="/f/realtime-alerts-for-wildfire-safety-r5jkk" replace />}
        />
        <Route
          path="f/:slug"
          element={
            <Suspense
              fallback={<div className="py-12 text-center text-muted-foreground">Loading...</div>}
            >
              <FundraiserPage />
            </Suspense>
          }
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
