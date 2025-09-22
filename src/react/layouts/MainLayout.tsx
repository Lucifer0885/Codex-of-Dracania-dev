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
      <div className={`flex-1 ${isExpanded ? "ml-64" : "ml-20"} transition-all duration-300`}>
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </div>
    </div>
  );
}

export default MainLayout;
