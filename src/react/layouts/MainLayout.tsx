import Header from "@components/Header";
import MaxWidthWrapper from "@layouts/MaxWidthWrapper";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </div>
  );
}

export default MainLayout;
