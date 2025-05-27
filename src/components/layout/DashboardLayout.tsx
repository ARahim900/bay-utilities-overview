import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Droplets, 
  Zap, 
  Settings, 
  Users, 
  Menu, 
  X,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
}

const navigationItems = [
  {
    title: 'Dashboard Overview',
    href: '/',
    icon: Home,
    description: 'System overview and main dashboard'
  },
  {
    title: 'Electricity System',
    href: '/electricity', 
    icon: Zap,
    description: 'Power generation and distribution'
  },
  {
    title: 'Water Management',
    href: '/water',
    icon: Droplets,
    description: 'Water supply and consumption analysis'
  },
  {
    title: 'STP Plant',
    href: '/stp',
    icon: Settings,
    description: 'Sewage treatment plant operations'
  },
  {
    title: 'Contractor Tracker',
    href: '/contractor',
    icon: Users,
    description: 'Contractor activity management'
  },
];

export function DashboardLayout({ title, children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-bay-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-bay-100 bg-gradient-to-r from-bay-50 to-blue-50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-bay-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-bay-800">Bay Utilities</h1>
                <p className="text-xs text-bay-600">Management System</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-bay-100 text-bay-800 shadow-sm border border-bay-200" 
                      : "text-bay-600 hover:bg-bay-50 hover:text-bay-700"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-bay-600" : "text-bay-500 group-hover:text-bay-600"
                  )} />
                  <div className="flex-1">
                    <div className={cn(
                      "font-medium text-sm",
                      isActive ? "text-bay-800" : "text-bay-700"
                    )}>
                      {item.title}
                    </div>
                    <div className="text-xs text-bay-500 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-bay-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-bay-100">
            <div className="text-xs text-bay-500 text-center">
              © 2025 Muscat Bay Utilities
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top navigation bar */}
        <header className="bg-white shadow-sm border-b border-bay-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-2 text-sm text-bay-600">
                <Link to="/" className="hover:text-bay-800 transition-colors">
                  Dashboard
                </Link>
                <ChevronLeft className="h-4 w-4 rotate-180" />
                <span className="font-medium text-bay-800">{title}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-bay-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-bay-800 mb-2">{title}</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-bay-500 to-blue-500 rounded-full" />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}