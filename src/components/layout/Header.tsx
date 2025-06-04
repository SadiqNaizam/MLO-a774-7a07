import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input'; // Assuming search might be here
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search as SearchIcon, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  // Props to control visibility of elements, e.g., search bar for certain pages
  showSearch?: boolean;
  onSearchChange?: (query: string) => void;
  userName?: string;
  userAvatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = true,
  onSearchChange,
  userName = "User",
  userAvatarUrl
}) => {
  console.log("Rendering Header");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  return (
    <header className="bg-neutral-800/70 backdrop-blur-md text-white p-4 flex items-center justify-between sticky top-0 z-40 h-16">
      <div className="flex items-center gap-2">
        {/* Navigation Arrows (optional, depends on main layout structure) */}
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {showSearch && (
        <div className="relative flex-grow max-w-md mx-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <Input
            type="search"
            placeholder="Search for songs, artists, albums..."
            className="bg-neutral-700 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-green-500"
            onChange={handleSearch}
          />
        </div>
      )}

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50">
          <Bell className="h-5 w-5" />
        </Button>
        <Link to="/profile"> {/* Example link */}
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatarUrl || "https://github.com/shadcn.png"} alt={userName} />
            <AvatarFallback>{userName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;