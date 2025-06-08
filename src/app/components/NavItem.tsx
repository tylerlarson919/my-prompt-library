import React from 'react';

interface NavItemProps {
    text: string;
    onClick: () => void;
    isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ text, onClick, isActive }) => (
    <button
        onClick={onClick}
        className={`w-full text-left p-2 transition-colors duration-200 flex items-center border-l-2 ${isActive ? 'text-white border-white' : 'text-zinc-500 border-transparent hover:text-white'}`}
    >
        <span className={`ml-4 transition-colors duration-200 text-lg ${isActive ? 'font-semibold' : 'font-normal'}`}>{text}</span>
    </button>
);

export default NavItem;