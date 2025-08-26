import Nav from "@components/Nav";
import MaxWidthWrapper from "@layouts/MaxWidthWrapper";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Nav />
      <MaxWidthWrapper>
        {children}
      </MaxWidthWrapper>
    </div>
  );
}

export default MainLayout;
