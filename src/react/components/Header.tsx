import { useState } from "react";
import { Link } from "react-router";
import * as Icon from "lucide-react";
import SideNav from "./SideNav";
import { usePinnedLinkContext } from "@hooks/usePinnedLinkContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pinnedLinks, removePinnedLink } = usePinnedLinkContext();

  return (
    <>
      <nav className="h-20 bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="src/react/assets/dso.png" alt="Logo" width={40} height={40} />
        </Link>

        <div className="mt-4">
          {pinnedLinks.length > 0 &&
            pinnedLinks.map((link, index) => {
              const LucideIcons = Icon[link.icon as keyof typeof Icon] as React.ComponentType<{
                size?: number;
                "aria-hidden"?: boolean;
                className?: string;
              }>;
              return (
                <div key={index} className="inline-block me-4">
                  <Link key={index} to={link.to} className="text-gray-300 hover:text-yellow-600">
                    {LucideIcons && <LucideIcons size={20} aria-hidden={true} className="inline-flex me-1" />}
                    {link.label}
                  </Link>
                  <Icon.Pin
                    className="inline-block ml-2 cursor-pointer text-red-500 transform rotate-45"
                    onClick={() => removePinnedLink(link)}
                  />
                </div>
              );
            })}
        </div>

        <div
          className="cursor-pointer hover:text-yellow-400"
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <Icon.Menu />
        </div>
      </nav>
      <SideNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
