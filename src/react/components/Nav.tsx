import { Link } from "react-router";

function Nav() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <Link to="/">
        <img src="src/react/assets/dso.png" alt="Logo" width={40} height={40} />
        <h1 className="text-lg font-bold">My App</h1>
      </Link>
    </nav>
  );
}

export default Nav;
