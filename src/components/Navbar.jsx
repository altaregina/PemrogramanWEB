import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center border-b-2 border-blue-500">
      <h1 className="text-2xl font-bold text-red-500 neon-text">PEMROGRAMAN WEB</h1>
      <ul className="flex gap-6">
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li>
      <Link
        to={to}
        className={`${
          isActive
            ? "font-bold text-blue-400 neon-text"
            : "text-white hover:text-red-500 neon-text-hover"
        }`}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}