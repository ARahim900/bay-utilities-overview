import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ComposedChart
} from 'recharts';
import {
  Droplets, TrendingUp, TrendingDown, AlertTriangle,
  Filter, Download, Share2, RefreshCw, Database,
  CalendarDays, MapPin, HelpCircle, X
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Card, KPICard, ChartWrapper, SectionHeader, FilterBar, StatusBadge 
} from '@/components/shared/UIComponents';
import { MUSCAT_BAY_THEME, getChartColors } from '@/lib/theme';

// Water Analysis Dashboard Component
const WaterAnalysisDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMonth, setSelectedMonth] = useState('Apr-2025');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [showHelp, setShowHelp] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample KPI data
  const kpiData = {
    bulkSupply: { value: 46039, change: 31.8, trend: 'warning' as const },
    zoneConsumption: { value: 29810, change: -30.6, trend: 'good' as const },
    individualMeters: { value: 23202, change: -35.3, trend: 'good' as const },
    stage1Loss: { value: 16229, change: 301.8, trend: 'critical' as const },
    stage2Loss: { value: 6608, change: -6.5, trend: 'good' as const },
    totalLoss: { value: 22837, change: 2266.1, trend: 'critical' as const },
  };

  // Sample chart data
  const monthlyConsumptionData = [
    { name: 'Jan', L1: 32803, L2: 28076, L3: 26599 },
    { name: 'Feb', L1: 27996, L2: 25060, L3: 23011 },
    { name: 'Mar', L1: 23860, L2: 23914, L3: 20534 },
    { name: 'Apr', L1: 31869, L2: 29411, L3: 24679 },
    { name: 'May', L1: 30737, L2: 28952, L3: 24774 },
    { name: 'Jun', L1: 41953, L2: 28942, L3: 23400 },
    { name: 'Jul', L1: 35166, L2: 34635, L3: 24957 },
    { name: 'Aug', L1: 35420, L2: 30994, L3: 23111 },
    { name: 'Sep', L1: 41341, L2: 34896, L3: 26667 },
    { name: 'Oct', L1: 31519, L2: 31298, L3: 23414 },
    { name: 'Nov', L1: 35290, L2: 33078, L3: 25166 },
    { name: 'Dec', L1: 36733, L2: 50499, L3: 41304 },
    { name: 'Jan', L1: 32580, L2: 53378, L3: 43529 },
    { name: 'Feb', L1: 44043, L2: 40961, L3: 32679 },
    { name: 'Mar', L1: 34915, L2: 42949, L3: 35882 },
    { name: 'Apr', L1: 46039, L2: 29810, L3: 23202 }
  ];

  const zoneDistributionData = [
    { name: 'Zone FM', value: 1880, lossPercentage: 25.3 },
    { name: 'Zone 03A', value: 4041, lossPercentage: 78.9 },
    { name: 'Zone 03B', value: 2157, lossPercentage: 66.6 },
    { name: 'Zone 05', value: 3737, lossPercentage: 59.5 },
    { name: 'Zone 08', value: 3203, lossPercentage: 70.2 },
    { name: 'Village Square', value: 11, lossPercentage: 38.5 }
  ];

  const lossTypeData = [
    { type: 'Physical Leakage', value: 12000, percentage: 52.5 },
    { type: 'Unauthorized Consumption', value: 5000, percentage: 21.9 },
    { type: 'Unbilled Authorized', value: 3000, percentage: 13.1 },
    { type: 'Administrative Losses', value: 2837, percentage: 12.4 },
  ];

  // Sample customer data
  const customerData = [
    { id: '4300008', customer: 'Habib Ismail Ali Al Suwaid', zone: 'Zone 03B', consumption: 14 },
    { id: '4300009', customer: 'Leopold Julian Zentner & Erica Kalobwe', zone: 'Zone 03B', consumption: 48 },
    { id: '4300020', customer: 'Wahibah R H Al Mulla', zone: 'Zone 03B', consumption: 3 },
    { id: '4300025', customer: 'Britta Stefanie Gerdes & Dr. Barbara Ungeheuer', zone: 'Zone 03B', consumption: 23 },
    { id: '4300029', customer: 'Al Fadhal Mohamed Ahmed Al Harthy', zone: 'Zone 03B', consumption: 0 },
    { id: '4300065', customer: 'Fahad Al-Hamdani', zone: 'Zone FM', consumption: 25 },
    { id: '4300066', customer: 'Sara Al-Balushi', zone: 'Zone FM', consumption: 18 },
    { id: '4300067', customer: 'Ahmed Al-Saidi', zone: 'Zone 03A', consumption: 30 },
    { id: '4300068', customer: 'Fatima Al-Riyami', zone: 'Zone 03A', consumption: 55 },
    { id: '4300069', customer: 'Khalid Al-Hajri', zone: 'Zone 05', consumption: 12 },
    { id: '4300070', customer: 'Aisha Al-Hashmi', zone: 'Zone 05', consumption: 7 },
    { id: '4300071', customer: 'Sultan Al-Amri', zone: 'Zone 08', consumption: 40 },
    { id: '4300072', customer: 'Noora Al-Hinai', zone: 'Zone 08', consumption: 22 },
  ];

  // Filter customer data
  const filteredCustomers = useMemo(() => {
    let filtered = customerData;
    
    if (selectedZone !== 'All Zones') {
      filtered = filtered.filter(customer => customer.zone === selectedZone);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedZone, searchTerm]);

  // Tab navigation component
  const TabNavigation: React.FC = () => {
    const tabs = [
      { id: 'overview', name: 'Overview', icon: Droplets },
      { id: 'group-details', name: 'Group Details', icon: Database },
      { id: 'loss-details', name: 'Loss Analysis', icon: AlertTriangle },
    ];

    return (
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${isActive 
                      ? 'border-secondary-500 text-secondary-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon size={16} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    );
  };

  // Help Modal
  const HelpModal: React.FC = () => {
    if (!showHelp) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <HelpCircle className="text-secondary-600" size={24} />
              Water Dashboard Help
            </h3>
            <button 
              onClick={() => setShowHelp(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Overview Tab</h4>
              <p>Provides high-level summary of water consumption with KPIs, trends, and loss analysis.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Group Details Tab</h4>
              <p>Shows detailed consumption analysis for specific zones with customer breakdown.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Loss Details Tab</h4>
              <p>Focuses on water loss analysis with breakdowns by type and zone.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Terms</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium">L1 (Main Bulk Supply):</span> Total water supplied to system</li>
                <li><span className="font-medium">L2 (Zone Bulk Meters):</span> Water measured at zone entry</li>
                <li><span className="font-medium">L3 (Individual Meters):</span> Water measured at customer level</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  // Overview Tab Content
  const OverviewContent: React.FC = () => {
    const chartColors = getChartColors();

    return (
      <div className="space-y-6">
        {/* Summary Alert */}
        <Card className="border-l-4 border-red-500 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Critical Loss Issues Detected</h4>
              <p className="text-sm text-red-700 mt-1">
                System shows high water loss rate of 49.6% in April 2025. Zone 03A has the highest loss at 78.9%.
                Immediate investigation recommended for transmission and distribution networks.
              </p>
            </div>
          </div>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KPICard
            title="L1 (Total Bulk Supply)"
            value={kpiData.bulkSupply.value.toLocaleString()}
            unit="units"
            icon={Database}
            trend={{
              value: `${kpiData.bulkSupply.change}%`,
              direction: kpiData.bulkSupply.change > 0 ? "up" : "down",
              description: "vs. previous month"
            }}
            color={kpiData.bulkSupply.trend === 'warning' ? 'warning' : 'primary'}
          />
          <KPICard
            title="L2 (Zone Consumption)"
            value={kpiData.zoneConsumption.value.toLocaleString()}
            unit="units"
            icon={Droplets}
            trend={{
              value: `${Math.abs(kpiData.zoneConsumption.change)}%`,
              direction: kpiData.zoneConsumption.change > 0 ? "up" : "down",
              description: "vs. previous month"
            }}
            color={kpiData.zoneConsumption.trend === 'good' ? 'success' : 'primary'}
          />
          <KPICard
            title="Stage 1 Loss (L1-L2)"
            value={kpiData.stage1Loss.value.toLocaleString()}
            unit="units"
            icon={TrendingUp}
            trend={{
              value: `${kpiData.stage1Loss.change}%`,
              direction: "up",
              description: "CRITICAL INCREASE"
            }}
            color="error"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWrapper
            title="Monthly Consumption Trends"
            subtitle="L1, L2, and L3 consumption patterns"
            height="350px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="L1" stroke={chartColors[0]} strokeWidth={3} name="L1 (Main Bulk)" />
                <Line type="monotone" dataKey="L2" stroke={chartColors[1]} strokeWidth={2} name="L2 (Zone Bulk)" />
                <Line type="monotone" dataKey="L3" stroke={chartColors[2]} strokeWidth={2} name="L3 (Individual)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <ChartWrapper
            title="Zone Distribution"
            subtitle={`Consumption for ${selectedMonth}`}
            height="350px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={zoneDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {zoneDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        <ChartWrapper
          title="Loss Percentage by Zone"
          subtitle="Identify high-risk zones requiring attention"
          height="300px"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zoneDistributionData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}%`, 'Loss Percentage']} />
              <Bar dataKey="lossPercentage" name="Loss %">
                {zoneDistributionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.lossPercentage > 70 ? '#EF4444' :
                      entry.lossPercentage > 50 ? '#F59E0B' :
                      entry.lossPercentage > 30 ? '#FBBF24' : '#10B981'
                    } 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>
    );
  };

  // Group Details Tab Content
  const GroupDetailsContent: React.FC = () => {
    return (
      <div className="space-y-6">
        {/* Zone Summary */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Zone Analysis Summary</h3>
            <StatusBadge status="info">
              {selectedZone === 'All Zones' ? 'All Zones' : selectedZone}
            </StatusBadge>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loss %</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {zoneDistributionData.map((zone) => (
                  <tr key={zone.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {zone.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {zone.value.toLocaleString()} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              zone.lossPercentage > 70 ? 'bg-red-500' :
                              zone.lossPercentage > 50 ? 'bg-yellow-500' :
                              zone.lossPercentage > 30 ? 'bg-yellow-400' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, zone.lossPercentage)}%` }}
                          />
                        </div>
                        <span className="font-medium">{zone.lossPercentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge 
                        status={
                          zone.lossPercentage > 70 ? 'error' :
                          zone.lossPercentage > 50 ? 'warning' :
                          zone.lossPercentage > 25 ? 'warning' : 'success'
                        }
                      >
                        {zone.lossPercentage > 70 ? 'Critical' :
                         zone.lossPercentage > 50 ? 'High Risk' :
                         zone.lossPercentage > 25 ? 'Moderate' : 'Normal'}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Customer Details */}
        <Card>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <StatusBadge status="info">{customer.zone}</StatusBadge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3" style={{ minWidth: '60px' }}>
                          <div
                            className={`h-2 rounded-full ${
                              customer.consumption > 40 ? 'bg-red-500' :
                              customer.consumption > 20 ? 'bg-yellow-500' :
                              customer.consumption > 0 ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            style={{ width: `${Math.min(100, (customer.consumption / 50) * 100)}%` }}
                          />
                        </div>
                        <span className="font-medium">{customer.consumption} units</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No customers found matching your criteria.
            </div>
          )}
        </Card>
      </div>
    );
  };

  // Loss Details Tab Content
  const LossDetailsContent: React.FC = () => {
    const chartColors = getChartColors();

    return (
      <div className="space-y-6">
        {/* Critical Issues Alert */}
        <Card className="border-l-4 border-red-500 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Loss Analysis Summary</h4>
              <div className="text-sm text-red-700 mt-1 space-y-1">
                <p>• Zone 03A shows critical loss rate of 78.9% - requires immediate investigation</p>
                <p>• Zone 03B maintains high loss of 66.6% - scheduled for repair</p>
                <p>• Zone 08 increased from 26.4% to 70.2% - anomaly detected</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Loss Type Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWrapper
            title="Loss Breakdown by Type"
            subtitle={`Total loss analysis for ${selectedMonth}`}
            height="350px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lossTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                >
                  {lossTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} units`, 'Loss Volume']} />
              </PieChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loss Type Details</h3>
            <div className="space-y-4">
              {lossTypeData.map((item, index) => (
                <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: chartColors[index % chartColors.length] }}
                    />
                    <span className="font-medium text-gray-900">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{item.value.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* High Risk Zones */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">High Risk Zones Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {zoneDistributionData
              .filter(zone => zone.lossPercentage > 50)
              .sort((a, b) => b.lossPercentage - a.lossPercentage)
              .map((zone) => (
                <div key={zone.name} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-red-800">{zone.name}</h4>
                    <StatusBadge status="error">Critical</StatusBadge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-700">Loss Percentage:</span>
                      <span className="font-semibold text-red-800">{zone.lossPercentage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-700">Consumption:</span>
                      <span className="font-semibold text-red-800">{zone.value.toLocaleString()} units</span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-red-600"
                        style={{ width: `${Math.min(100, zone.lossPercentage)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'group-details':
        return <GroupDetailsContent />;
      case 'loss-details':
        return <LossDetailsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <MainLayout 
      title="Water Management Dashboard" 
      subtitle="Monitor water distribution, consumption, and loss analysis"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <SectionHeader 
            title="Water Analysis"
            subtitle="Comprehensive water system monitoring and analysis"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HelpCircle size={16} />
              Help
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation />

        {/* Filters */}
        <FilterBar
          filters={[
            {
              id: 'month',
              label: 'Month',
              value: selectedMonth,
              options: [
                { label: 'Apr 2025', value: 'Apr-2025' },
                { label: 'Mar 2025', value: 'Mar-2025' },
                { label: 'Feb 2025', value: 'Feb-2025' },
                { label: 'Jan 2025', value: 'Jan-2025' },
              ],
              onChange: setSelectedMonth,
              icon: CalendarDays
            },
            {
              id: 'year',
              label: 'Year',
              value: selectedYear,
              options: [
                { label: '2025', value: '2025' },
                { label: '2024', value: '2024' },
              ],
              onChange: setSelectedYear,
              icon: CalendarDays
            },
            {
              id: 'zone',
              label: 'Zone',
              value: selectedZone,
              options: [
                { label: 'All Zones', value: 'All Zones' },
                { label: 'Zone FM', value: 'Zone FM' },
                { label: 'Zone 03A', value: 'Zone 03A' },
                { label: 'Zone 03B', value: 'Zone 03B' },
                { label: 'Zone 05', value: 'Zone 05' },
                { label: 'Zone 08', value: 'Zone 08' },
                { label: 'Village Square', value: 'Village Square' },
              ],
              onChange: setSelectedZone,
              icon: MapPin
            }
          ]}
          onReset={() => {
            setSelectedMonth('Apr-2025');
            setSelectedYear('2025');
            setSelectedZone('All Zones');
          }}
          actions={
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 size={16} />
              Share
            </button>
          }
        />

        {/* Tab Content */}
        {renderTabContent()}

        {/* Help Modal */}
        <HelpModal />
      </div>
    </MainLayout>
  );
};

export default WaterAnalysisDashboard;
