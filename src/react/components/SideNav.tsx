import { NavLinks } from "@utils/links";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useUser } from "@hooks/useUser";
import { AvatarImage } from "@components/AvatarImage";
import AppVersion from "@components/AppVersion";
import UpdateAvailable from "./UpdateAvailable";

type SideNavProps = {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
};

function SideNav({ isExpanded, setIsExpanded }: SideNavProps) {
  const [showExpandButton, setShowExpandButton] = useState(false);
  const { userInfo, loading, error } = useUser();

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1600 && isExpanded) {
        setIsExpanded(false);
      }
      setShowExpandButton(windowWidth >= 1600);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isExpanded, setIsExpanded]);

  return (
    <>
      <div
        className={["flex flex-col p-4 border-r border-gray-700 fixed min-h-screen", isExpanded ? "w-64" : "w-16"].join(
          " "
        )}
      >
        <div>
          <div className="flex items-center pb-6 mb-2">
            <div className="flex items-center justify-center">
              <img src="/src/react/assets/general/dso.png" alt="Logo" width={36} height={36} />
            </div>
            {isExpanded && (
              <span className="ml-3 text-md font-bold text-primary whitespace-nowrap overflow-hidden">
                Codex of Dracania
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
                        "flex items-center gap-3 px-1 py-3 text-white hover:text-primary rounded-lg min-h-[44px]",
                        isExpanded && isActive && "bg-primary/20 text-primary",
                      ].join(" ")
                    }
                  >
                    <div className="flex items-center justify-center">
                      {LucideIcon && <LucideIcon size={20} aria-hidden={true} />}
                    </div>
                    {isExpanded && <span className="text-sm whitespace-nowrap overflow-hidden">{link.label}</span>}
                  </NavLink>
                  {index < NavLinks.length - 1 && <div className="border-b border-gray-700 my-2" />}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <UpdateAvailable isExpanded={isExpanded} />
          <div className="flex items-center gap-3 mb-3 hover:cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8">
              <div className="rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
                <AvatarImage
                  path={userInfo?.avatars.find((avatar) => avatar.selected)?.path || "default"}
                  alt="Profile"
                  size="sm"
                />
              </div>
            </div>
            {isExpanded && (
              <div className="flex flex-col overflow-hidden">
                {loading ? (
                  <span className="text-gray-400 text-sm">Loading...</span>
                ) : error ? (
                  <span className="text-red-400 text-sm">Error loading user</span>
                ) : (
                  <>
                    <span className="text-white text-sm whitespace-nowrap">{userInfo?.name || "Unknown User"}</span>
                    <span className="text-gray-400 text-xs whitespace-nowrap capitalize">
                      {userInfo?.role || "player"}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
          <AppVersion isExpanded={isExpanded} />
        </div>
        {showExpandButton && (
          <div
            className="absolute top-4.5 right-0 z-9999 mr-[-12px] cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Icons.ChevronLeft className="w-6 h-6" /> : <Icons.ChevronRight className="w-6 h-6" />}
          </div>
        )}
      </div>
    </>
  );
}

export default SideNav;
