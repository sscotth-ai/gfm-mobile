import type { ReactNode } from "react";

interface FundraiserLayoutProps {
  main: ReactNode;
  sidebar: ReactNode;
}

export default function FundraiserLayout({
  main,
  sidebar,
}: FundraiserLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">{main}</div>
      <div className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-20 lg:self-start">
        {sidebar}
      </div>
    </div>
  );
}
