import VisitorCounter from "../visitor-counter";

const Footer = () => {
  return (
    <footer className="!mt-auto flex flex-col items-center justify-center py-4">
      <div className="flex w-full flex-wrap items-center justify-center gap-2 text-center sm:justify-between">
        <span>&copy; {new Date().getFullYear()} Developed with 🩵 by Chahat Kesharwani</span>

        <div className="flex items-center gap-2">
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
