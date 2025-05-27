
import React from 'react';
import { Combine, Activity, BarChart3, Settings } from 'lucide-react';

const STPPlant = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center">
          <div className="flex justify-center mb-6">
            <div className="p-6 rounded-full bg-emerald-100">
              <Combine size={64} className="text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">STP Plant Monitoring</h1>
          <p className="text-lg text-slate-600 mb-8">
            Sewage Treatment Plant operations and environmental monitoring system
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <Activity size={32} className="text-emerald-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Plant Operations</h3>
              <p className="text-sm text-slate-600">Real-time monitoring of treatment processes</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <BarChart3 size={32} className="text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Performance Metrics</h3>
              <p className="text-sm text-slate-600">Track efficiency and output quality</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <Settings size={32} className="text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">System Controls</h3>
              <p className="text-sm text-slate-600">Manage plant settings and configurations</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-lg">
            <p className="text-slate-500 text-sm">
              This module is ready for content integration. Add your STP plant monitoring components, controls, and data here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STPPlant;
