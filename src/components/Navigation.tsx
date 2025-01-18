import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Check if user has a theme preference stored
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    setIsDarkMode(storedTheme === "dark" || (!storedTheme && prefersDark));
    
    // Apply the initial theme
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    
    toast({
      title: `Switched to ${newDarkMode ? "dark" : "light"} mode`,
      duration: 2000,
    });
  };

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">GreenWatch</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive("/about")
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                About
              </Link>
              <Link
                to="/greenhouses"
                className={`${
                  isActive("/greenhouses")
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Greenhouses
              </Link>
              <Link
                to="/technologies"
                className={`${
                  isActive("/technologies")
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Technologies
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;