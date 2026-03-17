import type { ReactNode } from "react";

interface FundraiserLayoutProps {
  main: ReactNode;
  sidebar: ReactNode;
}

export default function FundraiserLayout({ main, sidebar }: FundraiserLayoutProps) {
  return (
    <div className="gfm-shell grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-10">
      <div className="min-w-0">{main}</div>
      <div className="lg:sticky lg:top-[104px] lg:self-start">{sidebar}</div>
    </div>
  );
}
