type MaxWidthWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
  return <div className={`min-h-screen max-w-5xl mx-auto px-4 ${className}`}>{children}</div>;
}

export default MaxWidthWrapper;
