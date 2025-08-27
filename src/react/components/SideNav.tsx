import { NavLinks } from "@utils/links";
import { Link } from "react-router";
import * as Icons from "lucide-react";
import { useEffect } from "react";
import { usePinnedLinkContext } from "@hooks/usePinnedLinkContext";
import type { NavLink } from "@interfaces/general";

type SideNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SideNav({ isOpen, onClose }: SideNavProps) {
  const { pinnedLinks, addPinnedLink } = usePinnedLinkContext();
  // Close on escape key

  const checkIfMoreThanThreePinnedLinks = (link: NavLink) => {
    if (pinnedLinks.length >= 3) {
      return;
    }

    addPinnedLink(link);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="pt-4 flex flex-col justify-between h-full">
          <div>
            <div className="px-4 mt-3 mb-4 flex justify-end">
              <Icons.X onClick={onClose} className="cursor-pointer hover:text-yellow-400 self-end" />
            </div>
            <ul>
              {NavLinks.map((link) => {
                const LucideIcon = Icons[link.icon as keyof typeof Icons] as React.ComponentType<{
                  size?: number;
                  "aria-hidden"?: boolean;
                }>;

                return (
                  <li key={link.label} className="mb-1 flex justify-between items-center px-4 hover:bg-gray-700">
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 py-3 text-white hover:text-yellow-400 transition-colors duration-200"
                      onClick={onClose} // Close sidebar when navigating
                    >
                      {LucideIcon && <LucideIcon size={20} aria-hidden={true} />}
                      <span>{link.label}</span>
                    </Link>
                    <div>
                      <Icons.Pin
                        className="cursor-pointer hover:text-yellow-400 transform rotate-45 text-red-600"
                        onClick={() => checkIfMoreThanThreePinnedLinks(link)}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="px-4 py-4 flex bottom-0 gap-4">
            <div className="avatar">
              <div className="w-14 rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
                <img src="/src/react/assets/discord-pfp.png" />
              </div>
            </div>
            <div className="flex flex-col self-end">
              <span className="text-white">lucifer0885,</span>
              <span className="text-gray-400">Developer</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SideNav;
