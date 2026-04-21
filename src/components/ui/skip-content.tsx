const SkipContent = () => {
  return (
    <a
      href="#main-content"
      className="el-focus-styles container pointer-events-none fixed inset-x-0 top-1 z-50 rounded-sm border bg-background p-3 text-center text-ring opacity-0 transition-opacity duration-500 ease-in-out focus-visible:pointer-events-auto focus-visible:opacity-100"
    >
      Skip to main content
    </a>
  );
};

export default SkipContent;
