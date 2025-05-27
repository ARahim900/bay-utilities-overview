import React from 'react';
import { Activity, AlertTriangle, CheckCircle, Settings, TrendingUp, Droplets, Zap } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, KPICard, ChartWrapper, SectionHeader, StatusBadge } from '@/components/shared/UIComponents';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getChartColors } from '@/lib/theme';

const STPPlantDashboard: React.FC = () => {
  // Sample data for STP operations
  const kpiData = {
    influent: { value: 2850, trend: { value: '2.3%', direction: 'up' as const } },
    effluent: { value: 2745, trend: { value: '1.8%', direction: 'up' as const } },
    efficiency: { value: 96.3, trend: { value: '0.5%', direction: 'up' as const } },
    compliance: { value: 98.7, trend: { value: '0.2%', direction: 'down' as const } },
  };

  const dailyFlowData = [
    { day: 'Mon', influent: 2850, effluent: 2745 },
    { day: 'Tue', influent: 2920, effluent: 2810 },
    { day: 'Wed', influent: 2780, effluent: 2680 },
    { day: 'Thu', influent: 2950, effluent: 2840 },
    { day: 'Fri', influent: 3100, effluent: 2985 },
    { day: 'Sat', influent: 2650, effluent: 2555 },
    { day: 'Sun', influent: 2580, effluent: 2485 },
  ];

  const qualityParameters = [
    { parameter: 'BOD', value: 8.5, limit: 10, unit: 'mg/L', status: 'good' },
    { parameter: 'COD', value: 18.2, limit: 25, unit: 'mg/L', status: 'good' },
    { parameter: 'TSS', value: 12.1, limit: 15, unit: 'mg/L', status: 'warning' },
    { parameter: 'pH', value: 7.2, limit: '6.5-8.5', unit: '', status: 'good' },
    { parameter: 'DO', value: 6.8, limit: '>5', unit: 'mg/L', status: 'good' },
  ];

  const operationalAlerts = [
    { id: 1, type: 'warning', message: 'Clarifier 2 requires maintenance inspection', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Daily compliance report generated', time: '4 hours ago' },
    { id: 3, type: 'success', message: 'All pumps operating within normal parameters', time: '6 hours ago' },
  ];

  const chartColors = getChartColors();

  return (
    <MainLayout 
      title="STP Plant Operations" 
      subtitle="Sewage Treatment Plant monitoring and management"
    >
      <div className="space-y-6">
        <SectionHeader 
          title="Treatment Plant Overview"
          subtitle="Real-time monitoring of sewage treatment operations"
          action={
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
                <Settings size={16} />
                Plant Settings
              </button>
            </div>
          }
        />

        {/* System Status Alert */}
        <Card className="border-l-4 border-green-500 bg-green-50">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-600 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-green-800">System Status: Operational</h4>
              <p className="text-sm text-green-700 mt-1">
                All treatment processes running normally. Effluent quality within compliance limits.
                Last maintenance: 3 days ago. Next scheduled maintenance: 4 days.
              </p>
            </div>
          </div>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Daily Influent"
            value={kpiData.influent.value.toLocaleString()}
            unit="m³/day"
            icon={Droplets}
            trend={{
              value: kpiData.influent.trend.value,
              direction: kpiData.influent.trend.direction,
              description: "vs. yesterday"
            }}
            color="primary"
          />
          <KPICard
            title="Daily Effluent"
            value={kpiData.effluent.value.toLocaleString()}
            unit="m³/day"
            icon={Activity}
            trend={{
              value: kpiData.effluent.trend.value,
              direction: kpiData.effluent.trend.direction,
              description: "vs. yesterday"
            }}
            color="secondary"
          />
          <KPICard
            title="Treatment Efficiency"
            value={kpiData.efficiency.value}
            unit="%"
            icon={TrendingUp}
            trend={{
              value: kpiData.efficiency.trend.value,
              direction: kpiData.efficiency.trend.direction,
              description: "vs. yesterday"
            }}
            color="success"
          />
          <KPICard
            title="Compliance Rate"
            value={kpiData.compliance.value}
            unit="%"
            icon={CheckCircle}
            trend={{
              value: kpiData.compliance.trend.value,
              direction: kpiData.compliance.trend.direction,
              description: "vs. last week"
            }}
            color="warning"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWrapper
            title="Daily Flow Rates"
            subtitle="Influent vs Effluent (Current Week)"
            height="350px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} m³`, '']} />
                <Bar dataKey="influent" fill={chartColors[0]} name="Influent" />
                <Bar dataKey="effluent" fill={chartColors[1]} name="Effluent" />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>

          <ChartWrapper
            title="Treatment Efficiency Trend"
            subtitle="7-day efficiency monitoring"
            height="350px"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyFlowData.map((item, index) => ({
                ...item,
                efficiency: ((item.effluent / item.influent) * 100).toFixed(1)
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[94, 98]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke={chartColors[2]} 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        {/* Quality Parameters & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Quality Parameters</h3>
            <div className="space-y-4">
              {qualityParameters.map((param) => (
                <div key={param.parameter} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{param.parameter}</h4>
                    <p className="text-sm text-gray-600">Limit: {param.limit} {param.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {param.value} {param.unit}
                    </div>
                    <StatusBadge 
                      status={param.status === 'good' ? 'success' : param.status === 'warning' ? 'warning' : 'error'}
                    >
                      {param.status === 'good' ? 'Normal' : param.status === 'warning' ? 'Monitor' : 'Alert'}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Alerts</h3>
            <div className="space-y-3">
              {operationalAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {alert.type === 'warning' && <AlertTriangle className="text-yellow-600 mt-0.5" size={16} />}
                  {alert.type === 'info' && <Activity className="text-blue-600 mt-0.5" size={16} />}
                  {alert.type === 'success' && <CheckCircle className="text-green-600 mt-0.5" size={16} />}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all alerts →
              </button>
            </div>
          </Card>
        </div>

        {/* Process Overview */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Process Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Preliminary Treatment', status: 'operational', efficiency: '98%' },
              { name: 'Primary Clarification', status: 'operational', efficiency: '95%' },
              { name: 'Biological Treatment', status: 'operational', efficiency: '97%' },
              { name: 'Final Clarification', status: 'maintenance', efficiency: '92%' },
            ].map((process) => (
              <div key={process.name} className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{process.name}</h4>
                <StatusBadge 
                  status={process.status === 'operational' ? 'success' : 'warning'}
                  size="md"
                >
                  {process.status === 'operational' ? 'Operational' : 'Maintenance'}
                </StatusBadge>
                <p className="text-sm text-gray-600 mt-2">Efficiency: {process.efficiency}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default STPPlantDashboard;
