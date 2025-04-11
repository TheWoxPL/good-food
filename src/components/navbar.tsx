import { useState } from 'react';
import { Input } from './ui/input';
import HamburgerMenuSVG from '@/assets/svgs/hamburger-menu.svg';
import { Sidebar } from './sidebar';

interface NavbarProps {
  onSearchChange?: (value: string) => void;
}

export const Navbar = ({ onSearchChange }: NavbarProps) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <div>
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
      />
      <div className="flex justify-between items-center fixed top-0 bg-gradient-to-r from-yellow-400 to-yellow-600 left-0 w-full">
        <img
          src={HamburgerMenuSVG}
          alt="Hamburger menu"
          className="w-11 h-11 ml-2 text-white cursor-pointer"
          onClick={() => setIsSidebarVisible(true)}
        />
        <Input
          placeholder="Search"
          className="w-100 bg-white m-2"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
    </div>
  );
};
