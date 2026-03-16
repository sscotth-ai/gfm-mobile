import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PageShell from "@/components/layout/PageShell";

const FundraiserPage = lazy(() => import("@/pages/FundraiserPage"));

function ProfileStub() {
  const { username } = useParams();
  return <div>Profile coming soon {username}</div>;
}

function CommunityStub() {
  const { slug } = useParams();
  return <div>Community coming soon {slug}</div>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route
          index
          element={
            <Navigate to="/f/realtime-alerts-for-wildfire-safety-r5jkk" replace />
          }
        />
        <Route
          path="f/:slug"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FundraiserPage />
            </Suspense>
          }
        />
        <Route path="u/:username" element={<ProfileStub />} />
        <Route path="communities/:slug" element={<CommunityStub />} />
      </Route>
    </Routes>
  );
}
