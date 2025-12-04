import React from 'react';
import { Plus, MessageSquare, Settings, LayoutGrid, Clock } from 'lucide-react';

interface SidebarProps {
  onNewChat: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewChat, isOpen }) => {
  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        flex flex-col
      `}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-medium text-gray-900 tracking-tight">
          <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          <span>Lumina</span>
        </div>
      </div>

      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center space-x-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium shadow-sm group"
        >
          <Plus size={16} className="text-gray-500 group-hover:text-gray-900" />
          <span>New Thread</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Recent</h3>
          <div className="space-y-1">
            {/* Mock History Items */}
            <HistoryItem label="Project Architecture" active />
            <HistoryItem label="React Performance" />
            <HistoryItem label="Tailwind Configuration" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Workspaces</h3>
          <div className="space-y-1">
             <NavItem icon={<LayoutGrid size={16} />} label="Engineering" />
             <NavItem icon={<Clock size={16} />} label="Updates" />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium w-full px-2 py-1.5 rounded-md hover:bg-gray-50">
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

const HistoryItem: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <button
    className={`
      w-full text-left px-2 py-1.5 rounded-md text-sm truncate transition-colors flex items-center space-x-2
      ${active ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
    `}
  >
    <MessageSquare size={14} className={active ? 'text-gray-900' : 'text-gray-400'} />
    <span className="truncate">{label}</span>
  </button>
);

const NavItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="w-full text-left px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center space-x-2">
    <span className="text-gray-400 group-hover:text-gray-600">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Sidebar;
