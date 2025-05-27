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
  ChevronLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

// Simple Card Components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-bay-200 shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-bay-100 bg-gradient-to-r from-bay-50 to-blue-50 ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-bay-800 ${className}`}>
    {children}
  </h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Simple Badge Component
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

// Simple Progress Component
const Progress: React.FC<{ value: number; className?: string }> = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full ${className}`}>
    <div 
      className="bg-bay-500 h-full rounded-full transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

// Simple MetricCard Component
interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ComponentType<any>;
  trend: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    description: string;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon: Icon, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-bay-100 rounded-lg">
            <Icon className="h-5 w-5 text-bay-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-bay-600">{title}</p>
            <div className="flex items-baseline space-x-1">
              <p className="text-2xl font-bold text-bay-800">{value}</p>
              <p className="text-sm text-bay-500">{unit}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center space-x-1 text-sm ${
            trend.direction === 'up' ? 'text-emerald-600' : 
            trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            <TrendingUp className={`h-4 w-4 ${trend.direction === 'down' ? 'rotate-180' : ''}`} />
            <span className="font-medium">{trend.value}</span>
          </div>
          <p className="text-xs text-bay-500">{trend.description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Navigation Items
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

export default function ContractorTracker() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const contractorMetrics = [
    {
      title: "Active Contractors",
      value: "23",
      unit: "Teams",
      icon: Users,
      trend: {
        value: "+3",
        direction: "up" as const,
        description: "vs. last month"
      },
    },
    {
      title: "Completed Projects",
      value: "47",
      unit: "This Month",
      icon: CheckCircle,
      trend: {
        value: "+12.5%",
        direction: "up" as const,
        description: "vs. last month"
      },
    },
    {
      title: "Average Completion",
      value: "87",
      unit: "%",
      icon: Clock,
      trend: {
        value: "+5.2%",
        direction: "up" as const,
        description: "vs. last month"
      },
    },
    {
      title: "Pending Reviews",
      value: "8",
      unit: "Projects",
      icon: AlertCircle,
      trend: {
        value: "-2",
        direction: "down" as const,
        description: "vs. last month"
      },
    },
  ];

  const activeProjects = [
    {
      id: "P001",
      contractor: "Bay Infrastructure Ltd",
      project: "Water Line Maintenance - Zone A",
      progress: 85,
      status: "on-track",
      deadline: "2025-06-15",
      priority: "high"
    },
    {
      id: "P002", 
      contractor: "ElectroTech Solutions",
      project: "Electrical Grid Upgrade - Sector 3",
      progress: 62,
      status: "delayed",
      deadline: "2025-07-20",
      priority: "medium"
    },
    {
      id: "P003",
      contractor: "Green Clean Services",
      project: "STP Equipment Maintenance",
      progress: 95,
      status: "on-track",
      deadline: "2025-06-01", 
      priority: "low"
    },
    {
      id: "P004",
      contractor: "Muscat Bay Contractors",
      project: "Emergency Pump Repair",
      progress: 30,
      status: "urgent",
      deadline: "2025-05-30",
      priority: "critical"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track': return <Badge className="bg-emerald-100 text-emerald-800">On Track</Badge>;
      case 'delayed': return <Badge className="bg-yellow-100 text-yellow-800">Delayed</Badge>;
      case 'urgent': return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return <Badge className="bg-red-500 text-white">Critical</Badge>;
      case 'high': return <Badge className="bg-orange-500 text-white">High</Badge>;
      case 'medium': return <Badge className="bg-blue-500 text-white">Medium</Badge>;
      case 'low': return <Badge className="bg-gray-500 text-white">Low</Badge>;
      default: return <Badge className="bg-gray-400 text-white">Unknown</Badge>;
    }
  };

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
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
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
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
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
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? "bg-bay-100 text-bay-800 shadow-sm border border-bay-200" 
                      : "text-bay-600 hover:bg-bay-50 hover:text-bay-700"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`h-5 w-5 transition-colors ${
                    isActive ? "text-bay-600" : "text-bay-500 group-hover:text-bay-600"
                  }`} />
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${
                      isActive ? "text-bay-800" : "text-bay-700"
                    }`}>
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
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2 text-sm text-bay-600">
                <Link to="/" className="hover:text-bay-800 transition-colors">
                  Dashboard
                </Link>
                <ChevronLeft className="h-4 w-4 rotate-180" />
                <span className="font-medium text-bay-800">Contractor Activity Tracker</span>
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
              <h1 className="text-3xl font-bold text-bay-800 mb-2">Contractor Activity Tracker</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-bay-500 to-blue-500 rounded-full" />
            </div>
            
            <div className="space-y-6">
              {/* Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contractorMetrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-bay-600" />
                      Performance Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-bay-600">On-Time Delivery</span>
                        <span className="font-semibold text-emerald-600">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-bay-600">Quality Rating</span>
                        <span className="font-semibold text-blue-600">4.2/5</span>
                      </div>
                      <Progress value={84} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-bay-600">Budget Compliance</span>
                        <span className="font-semibold text-emerald-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Resource Allocation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-bay-600" />
                      Resource Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-bay-100">
                        <span className="text-bay-600">Water Systems</span>
                        <span className="font-semibold">8 Teams</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-bay-100">
                        <span className="text-bay-600">Electrical</span>
                        <span className="font-semibold">6 Teams</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-bay-100">
                        <span className="text-bay-600">STP Plant</span>
                        <span className="font-semibold">4 Teams</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-bay-100">
                        <span className="text-bay-600">General Maintenance</span>
                        <span className="font-semibold">5 Teams</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-bay-600 font-medium">Total Active</span>
                        <span className="font-bold text-bay-800">23 Teams</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-bay-600" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                        <div>
                          <div className="font-medium text-red-800">Emergency Pump Repair</div>
                          <div className="text-sm text-red-600">May 30, 2025</div>
                        </div>
                        <Badge className="bg-red-500 text-white">2 Days</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div>
                          <div className="font-medium text-orange-800">STP Equipment Maintenance</div>
                          <div className="text-sm text-orange-600">Jun 01, 2025</div>
                        </div>
                        <Badge className="bg-orange-500 text-white">5 Days</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div>
                          <div className="font-medium text-yellow-800">Monthly Inspection</div>
                          <div className="text-sm text-yellow-600">Jun 10, 2025</div>
                        </div>
                        <Badge className="bg-yellow-500 text-white">14 Days</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Active Projects Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-bay-600" />
                    Active Projects Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-bay-100">
                          <th className="text-left py-3 px-4 font-medium text-bay-700">Project ID</th>
                          <th className="text-left py-3 px-4 font-medium text-bay-700">Contractor</th>
                          <th className="text-left py-3 px-4 font-medium text-bay-700">Project Description</th>
                          <th className="text-left py-3 px-4 font-medium text-bay-700">Progress</th>
                          <th className="text-left py-3 px-4 font-medium text-bay-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-bay-700">Priority</th>
                          <th className="text-left py-3 px-4 font-medium text-bay-700">Deadline</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeProjects.map((project) => (
                          <tr key={project.id} className="border-b border-bay-100 hover:bg-bay-50">
                            <td className="py-3 px-4 font-medium text-bay-800">{project.id}</td>
                            <td className="py-3 px-4 text-bay-600">{project.contractor}</td>
                            <td className="py-3 px-4 text-bay-600">{project.project}</td>
                            <td className="py-3 px-4">
                              <div className="space-y-1">
                                <span className="text-sm text-bay-600">{project.progress}%</span>
                                <Progress value={project.progress} className="h-2" />
                              </div>
                            </td>
                            <td className="py-3 px-4">{getStatusBadge(project.status)}</td>
                            <td className="py-3 px-4">{getPriorityBadge(project.priority)}</td>
                            <td className="py-3 px-4 text-bay-600">{project.deadline}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}