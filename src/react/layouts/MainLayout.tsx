import SideNav from "@components/SideNav";
import MaxWidthWrapper from "@layouts/MaxWidthWrapper";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      <SideNav />
      <MaxWidthWrapper>
        <div className="py-4">{children}</div>
      </MaxWidthWrapper>
    </div>
  );
}

export default MainLayout;
