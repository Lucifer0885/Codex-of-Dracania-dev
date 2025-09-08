import { NavLinks } from "@utils/links";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Modal from "./Modal";
import { useUser } from "@hooks/useUser";
import { AvatarImage } from "./AvatarImage";

type SideNavProps = {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
};

function userModalBody() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-300">
        The side navigation is currently collapsed due to the smaller window size. You can expand it by clicking the
        button at the bottom.
      </p>
    </div>
  );
}

function SideNav({ isExpanded, setIsExpanded }: SideNavProps) {
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { userInfo, loading, error } = useUser();

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

  function handleUserUpdate() {
    // Placeholder for user update logic
    console.log("User update action triggered");
  }

  return (
    <>
      <div
        className={[
          "flex flex-col p-4 border-r border-gray-700 transition-all duration-300 fixed min-h-screen",
          isExpanded ? "w-64" : "w-16",
        ].join(" ")}
      >
        <div>
          <div className="flex items-center pb-6 mb-2">
            <div className="flex items-center justify-center w-8 h-8">
              <img src="/src/react/assets/general/dso.png" alt="Logo" width={34} height={34} />
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
          <div className="flex items-center gap-3 mb-3 hover:cursor-pointer" onClick={() => setIsUserModalOpen(true)}>
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
      <Modal
        id="side-nav-info-modal"
        title="Side Navigation"
        body={userModalBody()}
        confirmButtonText="Update"
        confirmAction={handleUserUpdate}
        isOpen={isUserModalOpen}
        setIsOpen={setIsUserModalOpen}
      />
    </>
  );
}

export default SideNav;
