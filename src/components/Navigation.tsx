import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">BellCrop Protector</span>
            </div>
            <div className="flex sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Normal Menu */}
          <div className="hidden sm:flex sm:ml-6 sm:space-x-8">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "border-primary text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className={`${
                isActive("/about")
                  ? "border-primary text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              About
            </Link>
            <Link
              to="/greenhouses"
              className={`${
                isActive("/greenhouses")
                  ? "border-primary text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Greenhouses
            </Link>
            <Link
              to="/technologies"
              className={`${
                isActive("/technologies")
                  ? "border-primary text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Technologies
            </Link>
            <Link
              to="/mineral-monitor"
              className={`${
                isActive("/mineral-monitor")
                  ? "border-primary text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Mineral Monitor
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu, toggle visibility based on mobileMenuOpen */}
      <div
        className={`${mobileMenuOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`${
              isActive("/")
                ? "border-primary text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } block px-3 py-2 text-base font-medium`}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className={`${
              isActive("/about")
                ? "border-primary text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } block px-3 py-2 text-base font-medium`}
          >
            About
          </Link>
          <Link
            to="/greenhouses"
            className={`${
              isActive("/greenhouses")
                ? "border-primary text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } block px-3 py-2 text-base font-medium`}
          >
            Greenhouses
          </Link>
          <Link
            to="/technologies"
            className={`${
              isActive("/technologies")
                ? "border-primary text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } block px-3 py-2 text-base font-medium`}
          >
            Technologies
          </Link>
          <Link
            to="/mineral-monitor"
            className={`${
              isActive("/mineral-monitor")
                ? "border-primary text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } block px-3 py-2 text-base font-medium`}
          >
            Mineral Monitor
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;