import { NavLinks } from "@utils/links";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

type SideNavProps = {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
};

function SideNav({ isExpanded, setIsExpanded }: SideNavProps) {
  const [showExpandButton, setShowExpandButton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1600 && isExpanded) {
        setIsExpanded(false);
      }
      setShowExpandButton(windowWidth >= 1600);
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isExpanded, setIsExpanded]);
  return (
    <div
      className={[
        "flex flex-col p-4 border-r border-gray-700 transition-all duration-300 fixed min-h-screen",
        isExpanded ? "w-64" : "w-16",
      ].join(" ")}
    >
      <div>
        <div className="flex items-center pb-6 mb-2">
          <div className="flex items-center justify-center w-8 h-8">
            <img src="/src/react/assets/dso.png" alt="Logo" width={34} height={34} />
          </div>
          {isExpanded && (
            <span className="ml-3 text-md font-bold text-primary whitespace-nowrap overflow-hidden">
              Drakensang Utils
            </span>
          )}
        </div>
        <ul className="space-y-1">
          {NavLinks.map((link, index) => {
            const LucideIcon = Icons[link.icon as keyof typeof Icons] as React.ComponentType<{
              size?: number;
              "aria-hidden"?: boolean;
            }>;

            return (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    [
                      "flex items-center gap-3 px-1 py-3 text-white hover:text-primary rounded-lg transition-all duration-200 min-h-[44px]",
                      isExpanded && isActive && "bg-primary/20 text-primary",
                    ].join(" ")
                  }
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    {LucideIcon && <LucideIcon size={20} aria-hidden={true} />}
                  </div>
                  {isExpanded && <span className="whitespace-nowrap overflow-hidden">{link.label}</span>}
                </NavLink>
                {index < NavLinks.length - 1 && <div className="border-b border-gray-700 my-2" />}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8">
            <div className="rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2 w-8 h-8">
              <img src="/src/react/assets/discord-pfp.png" alt="Profile" className="w-full h-full rounded-full" />
            </div>
          </div>
          {isExpanded && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-white text-sm whitespace-nowrap">lucifer0885.</span>
              <span className="text-gray-400 text-xs whitespace-nowrap">Developer</span>
            </div>
          )}
        </div>
        {showExpandButton && (
          <div
            className="flex items-center justify-center w-8 h-8 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Icons.ChevronLeft className="w-4 h-4" /> : <Icons.ChevronRight className="w-4 h-4" />}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideNav;
