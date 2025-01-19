import React from 'react';
import { LayoutDashboard, BarChart2, Brain, LineChart, Zap } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ icon, label, active }: NavItemProps) => (
  <li className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
    <span className={`${active ? 'text-blue-600' : 'text-gray-600'}`}>{icon}</span>
    <span className={`${active ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{label}</span>
  </li>
);

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r bg-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">AceMemory</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<BarChart2 size={20} />} label="Performance" />
          <NavItem icon={<Brain size={20} />} label="Mastery" />
          <NavItem icon={<LineChart size={20} />} label="Analytics" />
          <NavItem icon={<Zap size={20} />} label="Progress" />
        </ul>
      </nav>
    </div>
  );
}