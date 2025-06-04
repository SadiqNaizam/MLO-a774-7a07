import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, Library, ListMusic, Mic2, Search, Radio } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

// Define navigation items
const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/library', label: 'Your Library', icon: Library },
  { type: 'divider', key: 'div1'},
  { href: '/playlist/123', label: 'My Playlist', icon: ListMusic }, // Example playlist link
  { href: '/artist/456', label: 'Favorite Artist', icon: Mic2 }, // Example artist link
  { href: '/radio', label: 'Radio', icon: Radio }, // Example link
];

interface NavigationMenuProps {
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  console.log("Rendering NavigationMenu");
  const location = useLocation();

  return (
    <nav className={cn("bg-neutral-900 text-neutral-300 p-4 space-y-2 w-64 h-full flex flex-col", className)}>
      <div className="mb-4">
        <Link to="/" className="text-2xl font-bold text-white hover:text-green-500 transition-colors">
          MusicApp {/* Placeholder Logo/Brand */}
        </Link>
      </div>
      <ul className="space-y-1 flex-grow">
        {navItems.map((item, index) => {
          if (item.type === 'divider') {
            return <hr key={item.key || `divider-${index}`} className="border-neutral-700 my-2" />;
          }
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 p-2 rounded-md hover:bg-neutral-800 hover:text-white transition-colors",
                  isActive ? "bg-neutral-700 text-white font-semibold" : "text-neutral-400"
                )}
              >
                {Icon && <Icon className="h-5 w-5" />}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto text-xs text-neutral-500">
        {/* Potentially user profile quick access or settings */}
        <p>© {new Date().getFullYear()} MusicApp</p>
      </div>
    </nav>
  );
};

export default NavigationMenu;