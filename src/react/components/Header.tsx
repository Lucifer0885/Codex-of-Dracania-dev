import { useState } from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import type { NavLink } from "@interfaces/general";
import SideNav from "./SideNav";

function Header() {
  const [pinned] = useState<NavLink[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="h-20 bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="src/react/assets/dso.png" alt="Logo" width={40} height={40} />
          <h1 className="text-2xl text-yellow-600">Drakensang Utilities</h1>
        </Link>

        <div className="mt-4">
          {pinned.length > 0 &&
            pinned.map((link, index) => (
              <Link key={index} to={link.to} className="text-gray-300 hover:text-white">
                {link.label}
              </Link>
            ))}
        </div>

        <div
          className="cursor-pointer hover:text-yellow-400"
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <Menu />
        </div>
      </nav>
      <SideNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
