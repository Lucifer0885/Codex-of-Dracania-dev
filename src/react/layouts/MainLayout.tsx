import SideNav from "@components/SideNav";
import MaxWidthWrapper from "@layouts/MaxWidthWrapper";
import { useState } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="flex bg-base-200 text-base-content">
      <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <MaxWidthWrapper className="self-center">
        <div className={`py-4 transition-all duration-300`}>{children}</div>
      </MaxWidthWrapper>
    </div>
  );
}

export default MainLayout;
