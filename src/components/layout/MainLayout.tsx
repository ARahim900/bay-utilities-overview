import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Zap,
  Droplets,
  Activity,
  Users,
  Menu,
  X
} from 'lucide-react';
import { MUSCAT_BAY_THEME } from '@/lib/theme';
import { MuscatBayLogo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  title?: string;
  subtitle?: string;
}

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ElementType;
  path: string;
  badge?: string;
}

const navigation: NavigationItem[] = [
  { id: 'home', name: 'Home', icon: Home, path: '/' },
  { id: 'electricity', name: 'Electricity System', icon: Zap, path: '/electricity' },
  { id: 'water', name: 'Water Analysis', icon: Droplets, path: '/water' },
  { id: 'stp', name: 'STP Plant', icon: Activity, path: '/stp' },
  { id: 'contractor', name: 'Contractor Tracker', icon: Users, path: '/contractor' },
];

const Sidebar: React.FC<{
  isCollapsed: boolean;
  onToggle: () => void;
  currentPath: string;
}> = ({ isCollapsed, onToggle, currentPath }) => {
  return (
    <div 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } min-h-screen transition-all duration-300 ease-in-out shadow-xl relative z-30`}
      style={{ backgroundColor: MUSCAT_BAY_THEME.colors.primary[700] }}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-primary-600">
        <div className="flex items-center justify-between">
          <div className={`${isCollapsed ? 'hidden' : 'block'}`}>
            <MuscatBayLogo size="sm" variant="light" showText={!isCollapsed} />
          </div>
          {isCollapsed && (
            <div className="mx-auto">
              <MuscatBayLogo size="sm" variant="light" showText={false} />
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded-lg text-white hover:bg-primary-600 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || 
            (item.path !== '/' && currentPath.startsWith(item.path));
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-primary-600 hover:text-white'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <span className="font-medium">{item.name}</span>
              )}
              {!isCollapsed && item.badge && (
                <span className="ml-auto px-2 py-1 text-xs bg-secondary-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: MUSCAT_BAY_THEME.colors.primary[800],
              borderColor: MUSCAT_BAY_THEME.colors.primary[600]
            }}
          >
            <p className="text-sm text-gray-300 text-center mb-3">
              Operations Hub
            </p>
            <button 
              className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors text-white hover:bg-primary-600"
              style={{ backgroundColor: MUSCAT_BAY_THEME.colors.primary[500] }}
            >
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Header: React.FC<{
  title?: string;
  subtitle?: string;
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}> = ({ title, subtitle, onMenuToggle, showMenuButton = false }) => {
  return (
    <header 
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20"
      style={{ height: MUSCAT_BAY_THEME.layout.headerHeight }}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {showMenuButton && (
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <Menu size={20} />
              </button>
            )}
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {title || 'Operations Dashboard'}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Settings size={20} />
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <img
                src={`https://placehold.co/32x32/${MUSCAT_BAY_THEME.colors.primary[500].substring(1)}/FFFFFF?text=MB`}
                alt="User"
                className="w-8 h-8 rounded-full border-2"
                style={{ borderColor: MUSCAT_BAY_THEME.colors.primary[300] }}
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const MainLayout: React.FC<LayoutProps> = ({ 
  children, 
  showSidebar = true, 
  title, 
  subtitle 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <>
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar 
              isCollapsed={sidebarCollapsed}
              onToggle={toggleSidebar}
              currentPath={location.pathname}
            />
          </div>

          {/* Mobile Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="relative h-full">
              <Sidebar 
                isCollapsed={false}
                onToggle={() => {}}
                currentPath={location.pathname}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-white hover:bg-primary-600 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={title}
          subtitle={subtitle}
          onMenuToggle={toggleMobileMenu}
          showMenuButton={showSidebar}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
