import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Zap, Activity, Users, ArrowRight } from 'lucide-react';
import { MUSCAT_BAY_THEME } from '@/lib/theme';
import { MuscatBayLogo } from '@/components/shared/Logo';
import { Card } from '@/components/shared/UIComponents';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
  stats?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon: Icon,
  path,
  color,
  stats
}) => {
  return (
    <Card hover className="h-full group">
      <Link to={path} className="block h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div 
              className="p-3 rounded-xl shadow-sm"
              style={{ backgroundColor: `${color}15`, color }}
            >
              <Icon size={28} />
            </div>
            <ArrowRight 
              size={20} 
              className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" 
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {description}
            </p>
          </div>

          {/* Stats */}
          {stats && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">{stats}</p>
            </div>
          )}

          {/* Bottom border accent */}
          <div 
            className="h-1 w-full rounded-b-xl mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ backgroundColor: color }}
          />
        </div>
      </Link>
    </Card>
  );
};

const LandingPage: React.FC = () => {
  const modules = [
    {
      title: 'Water Management',
      description: 'Monitor water supply, distribution, consumption patterns, and analyze water loss across various zones with real-time data tracking.',
      icon: Droplets,
      path: '/water',
      color: MUSCAT_BAY_THEME.colors.secondary[500],
      stats: 'Latest Update: 2 hours ago'
    },
    {
      title: 'Electricity System',
      description: 'Track power generation, distribution networks, consumption patterns, and system efficiency with comprehensive analytics.',
      icon: Zap,
      path: '/electricity',
      color: '#F59E0B',
      stats: 'Active Meters: 56 units'
    },
    {
      title: 'STP Plant Operations',
      description: 'Oversee sewage treatment plant operations, monitor effluent quality, and ensure environmental compliance standards.',
      icon: Activity,
      path: '/stp',
      color: '#10B981',
      stats: 'System Status: Operational'
    },
    {
      title: 'Contractor Tracker',
      description: 'Manage contractor activities, track project timelines, monitor performance metrics, and optimize resource allocation.',
      icon: Users,
      path: '/contractor',
      color: '#8B5CF6',
      stats: 'Active Projects: 8'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header 
        className="relative bg-gradient-to-r shadow-lg overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(135deg, ${MUSCAT_BAY_THEME.colors.primary[600]} 0%, ${MUSCAT_BAY_THEME.colors.primary[500]} 50%, ${MUSCAT_BAY_THEME.colors.secondary[500]} 100%)`
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='37' cy='37' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <MuscatBayLogo size="lg" variant="light" showText={true} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Integrated Operations Hub
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Comprehensive monitoring and management platform for Muscat Bay's 
              utilities infrastructure, operations, and contractor services.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              {[
                { label: 'Active Systems', value: '4' },
                { label: 'Data Points', value: '1,247' },
                { label: 'Uptime', value: '99.8%' },
                { label: 'Last Update', value: '2m ago' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            System Modules
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access and manage all operational systems from a unified dashboard. 
            Monitor performance, analyze data, and maintain optimal efficiency across all services.
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {modules.map((module, index) => (
            <ModuleCard key={index} {...module} />
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              System Overview
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                The Muscat Bay Integrated Operations Hub provides real-time monitoring 
                and management capabilities for all critical infrastructure systems. 
                Our platform ensures optimal performance through advanced analytics and 
                automated reporting.
              </p>
              <p>
                Key features include predictive maintenance alerts, resource optimization 
                recommendations, compliance tracking, and comprehensive reporting tools 
                designed for operational excellence.
              </p>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button 
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Generate Report</div>
                <div className="text-sm text-gray-600">Export system data</div>
              </button>
              <button 
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">System Health</div>
                <div className="text-sm text-gray-600">Check all systems</div>
              </button>
              <button 
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Settings</div>
                <div className="text-sm text-gray-600">Configure preferences</div>
              </button>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="bg-gradient-to-r text-white"
        style={{ 
          backgroundImage: `linear-gradient(135deg, ${MUSCAT_BAY_THEME.colors.primary[700]} 0%, ${MUSCAT_BAY_THEME.colors.primary[600]} 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <MuscatBayLogo size="sm" variant="light" showText={true} />
              <p className="mt-4 text-white/80 text-sm">
                Advanced infrastructure management for sustainable operations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/electricity" className="block text-white/80 hover:text-white transition-colors">
                  Electricity Dashboard
                </Link>
                <Link to="/water" className="block text-white/80 hover:text-white transition-colors">
                  Water Management
                </Link>
                <Link to="/stp" className="block text-white/80 hover:text-white transition-colors">
                  STP Operations
                </Link>
                <Link to="/contractor" className="block text-white/80 hover:text-white transition-colors">
                  Contractor Portal
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p>Operations: 24/7 Monitoring</p>
                <p>Support: business.hours@muscatbay.om</p>
                <p>Emergency: +968 1234 5678</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
            <p>&copy; {new Date().getFullYear()} Muscat Bay Integrated Systems. All rights reserved.</p>
            <p className="mt-1">Powered by MB Technology Division</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
