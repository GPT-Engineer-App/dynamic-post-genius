import { Home, FileText } from "lucide-react";
import Index from "./pages/Index.jsx";
import Post from "./pages/Post.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Post",
    to: "/post",
    icon: <FileText className="h-4 w-4" />,
    page: <Post />,
  },
];
