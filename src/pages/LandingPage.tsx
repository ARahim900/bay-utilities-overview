
import React from 'react';
import { Droplets, Zap, Activity, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header */}
      <header className="text-white shadow-lg" style={{ backgroundColor: '#4E4456' }}>
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center justify-center font-bold text-white text-2xl shadow-md"
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #8B7A94 0%, #A596AD 100%)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              MB
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Muscat Bay</h1>
              <p className="text-lg text-gray-200">Integrated Systems Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-10 text-center" style={{ color: '#4E4456' }}>
          Welcome to the Muscat Bay Operations Hub
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Water Management Card */}
          <Link 
            to="/water" 
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
            style={{ borderLeft: '4px solid #3B82F6' }}
          >
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <Droplets className="h-10 w-10 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold" style={{ color: '#4E4456' }}>Water Management</h3>
              </div>
              <p className="text-gray-600 text-sm">Monitor water supply, distribution, consumption, and analyze water loss across various zones.</p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <span className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Access Water Dashboard →</span>
            </div>
          </Link>

          {/* Electricity System Card */}
          <Link 
            to="/electricity" 
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
            style={{ borderLeft: '4px solid #F59E0B' }}
          >
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <Zap className="h-10 w-10 text-amber-500 mr-3" />
                <h3 className="text-xl font-semibold" style={{ color: '#4E4456' }}>Electricity System</h3>
              </div>
              <p className="text-gray-600 text-sm">Track power generation, distribution networks, consumption patterns, and system efficiency.</p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <span className="text-amber-600 font-medium hover:text-amber-700 transition-colors">View Electricity Data →</span>
            </div>
          </Link>

          {/* STP Plant Card */}
          <Link 
            to="/stp" 
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
            style={{ borderLeft: '4px solid #10B981' }}
          >
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <Activity className="h-10 w-10 text-emerald-500 mr-3" />
                <h3 className="text-xl font-semibold" style={{ color: '#4E4456' }}>STP Plant</h3>
              </div>
              <p className="text-gray-600 text-sm">Oversee sewage treatment plant operations, effluent quality, and environmental compliance.</p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <span className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">Monitor STP Plant →</span>
            </div>
          </Link>

          {/* Contractor Tracker Card */}
          <Link 
            to="/contractor" 
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
            style={{ borderLeft: '4px solid #6366F1' }}
          >
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <Users className="h-10 w-10 text-indigo-500 mr-3" />
                <h3 className="text-xl font-semibold" style={{ color: '#4E4456' }}>Contractor Tracker</h3>
              </div>
              <p className="text-gray-600 text-sm">Manage contractor activities, project timelines, performance metrics, and resource allocation.</p>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <span className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">Track Contractors →</span>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-white text-center py-6 mt-12" style={{ backgroundColor: '#4E4456' }}>
        <p>&copy; {new Date().getFullYear()} Muscat Bay Integrated Systems. All rights reserved.</p>
        <p className="text-sm text-gray-300">Powered by MB Technology Division</p>
      </footer>
    </div>
  );
};

export default LandingPage;
