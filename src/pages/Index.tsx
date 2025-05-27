import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Zap, TrendingUp, Users2, DollarSign, BarChart2, Filter, 
  CalendarDays, List, Sparkles, X, Building
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Card, KPICard, ChartWrapper, SectionHeader, FilterBar, StatusBadge 
} from '@/components/shared/UIComponents';
import { MUSCAT_BAY_THEME, getChartColors } from '@/lib/theme';

// OMR Conversion Rate
const OMR_PER_KWH = 0.025;

// Data parsing and processing (keeping existing logic)
const rawDataString = `SL:no.\tZone\tType \tMuscat Bay Number\tUnit Number (Muncipality) \tElectrical Meter Account  No\tNovember-24\tDecember-24\tJanuary-25\tFebruary-25\tMarch-25\tApril-25
1\tInfrastructure\tMC\tMC\tPumping Station 01 \tR52330\t1629\t1640\t1903\t2095\t3032\t3940
2\tInfrastructure\tMC\tMC\tPumping Station 03\tR52329\t0\t179\t32.5\t137.2\t130.7\t276.6
3\tInfrastructure\tMC\tMC\tPumping Station 04 \tR52327\t919\t921\t245.1\t869.5\t646.1\t984.9
4\tInfrastructure\tMC\tMC\tPumping Station 05 \tR52325\t2599\t1952\t2069\t2521\t2601\t3317
5\tInfrastructure\tMC\tMC\tLifting Station 02\tR52328\t0\t0\t0\t0\t0\t0
6\tInfrastructure\tMC\tMC\tLifting Station 03\tR52333\t91\t185\t28\t40\t58\t83
7\tInfrastructure\tMC\tMC\tLifting Station 04\tR52324\t686\t631\t701\t638\t572\t750.22
8\tInfrastructure\tMC\tMC\tLifting Station 05\tR52332\t2413\t2643\t2873\t3665\t3069\t4201.4
9\tInfrastructure\tMC\tMC\tIrrigation Tank 01\tR52324 (R52326)\t1432\t1268\t1689\t2214\t1718\t1663
10\tInfrastructure\tMC\tMC\tIrrigation Tank 02\tR52331\t974\t1026\t983\t1124\t1110\t1830
11\tInfrastructure\tMC\tMC\tIrrigation Tank 03\tR52323\t269\t417\t840\t1009\t845\t1205
12\tInfrastructure\tMC\tMC\tIrrigation Tank 04\tR53195\t212\t213\t39.7\t233.2\t234.9\t447.2
13\tInfrastructure\tMC\tMC\tActuator DB 01 (Z8)\tR53196\t34\t29\t7.3\t27.7\t24.4\t27.1
14\tInfrastructure\tMC\tMC\tActuator DB 02\tR51900\t232\t161\t33\t134\t138.5\t211
15\tInfrastructure\tMC\tMC\tActuator DB 03\tR51904\t220\t199\t55.7\t203.3\t196\t211.6
16\tInfrastructure\tMC\tMC\tActuator DB 04\tR51901\t172\t173\t186\t161\t227\t253
17\tInfrastructure\tMC\tMC\tActuator DB 05\tR51907\t18\t16\t4.2\t17.8\t14\t17.7
18\tInfrastructure\tMC\tMC\tActuator DB 06\tR51909\t49\t44\t47\t45\t38\t46.9
19\tInfrastructure\tMC\tMC\tStreet Light FP 01 (Z8)\tR53197\t3593\t3147\t787\t3228\t2663\t3230
20\tInfrastructure\tMC\tMC\tStreet Light FP 02\tR51906\t2361\t2258\t633\t2298\t1812\t2153
21\tInfrastructure\tMC\tMC\tStreet Light FP 03\tR51905\t2060\t1966\t1868\t1974\t1562\t1847
22\tInfrastructure\tMC\tMC\tStreet Light FP 04\tR51908\t2299\t1389\t325\t1406\t1401\t2412.9
23\tInfrastructure\tMC\tMC\tStreet Light FP 05\tR51902\t1477\t1121\t449\t2069.9\t1870.1\t3233
24\tInfrastructure\tMC\tMC\tBeachwell\tR51903\t24383\t37236\t38168\t18422\t40\t27749
25\tInfrastructure\tMC\tMC\tHelipad\tR52334\t0\t0\t0\t0\t0\t0
26\tCentral Park\tMC\tMC\tCentral Park\tR54672\t9604\t19032\t22819\t19974\t14190\t13846
27\tAncilary\tBuilding\tMC\tGuard House\tR53651\t1225\t814\t798\t936\t879\t1467
28\tAncilary\tBuilding\tMC\tSecurity Building\tR53649\t5702\t5131\t5559\t5417\t4504\t5978
29\tAncilary\tBuilding\tMC\tROP Building\tR53648\t3581\t2352\t2090\t2246\t1939\t3537
30\tZone 3\tSBJ Common Meter\tD 44\tApartment\tR53705\t1377\t764\t647\t657\t650\t1306
31\tZone 3\tSBJ Common Meter\tD 45\tApartment\tR53665\t1252\t841\t670\t556\t608\t1069
32\tZone 3\tSBJ Common Meter\tD 46\tApartment\tR53700\t1577\t890\t724\t690\t752\t1292
33\tZone 3\tSBJ Common Meter\tD 47\tApartment\tR53690\t1774\t1055\t887\t738\t792\t1545
34\tZone 3\tSBJ Common Meter\tD 48\tApartment\tR53666\t1046\t785\t826\t676\t683\t1092
35\tZone 3\tSBJ Common Meter\tD 49\tApartment\tR53715\t1608\t1068\t860\t837\t818\t984
36\tZone 3\tSBJ Common Meter\tD 50\tApartment\tR53672\t1102\t789\t765\t785\t707\t1331
37\tZone 3\tSBJ Common Meter\tD 51\tApartment\tR53657\t1855\t710\t661\t682\t642\t904
38\tZone 3\tSBJ Common Meter\tD 52\tApartment\tR53699\t1986\t1208\t979\t896\t952\t1651
39\tZone 3\tSBJ Common Meter\tD53\tApartment\tR54782\t1764\t968\t693\t732\t760\t1281
40\tZone 3\tSBJ Common Meter\tD54\tApartment\tR54793\t1777\t834\t681\t559\t531\t1042
41\tZone 3\tSBJ Common Meter\tD55\tApartment\tR54804\t1828\t1035\t677\t616\t719\t1417
42\tZone 3\tSBJ Common Meter\tD56\tApartment\tR54815\t1805\t937\t683\t731\t765\t1536
43\tZone 3\tSBJ Common Meter\tD57\tApartment\tR54826\t2262\t1332\t990\t846\t795\t1732
44\tZone 3\tSBJ Common Meter\tD58\tApartment\tR54836\t1534\t778\t593\t535\t594\t1415
45\tZone 3\tSBJ Common Meter\tD59\tApartment\tR54847\t1634\t998\t628\t582\t697\t1138
46\tZone 3\tSBJ Common Meter\tD60\tApartment\tR54858\t1275\t705\t674\t612\t679\t1069
47\tZone 3\tSBJ Common Meter\tD61\tApartment\tR54869\t1734\t977\t767\t800\t719\t1394
48\tZone 3\tSBJ Common Meter\tD 62\tApartment\tR53717\t1630\t957\t715\t677\t595\t800
49\tZone 3\tSBJ Common Meter\tD 74\tApartment\tR53675\t1303\t766\t639\t566\t463\t1079
50\tZone 3\tSBJ Common Meter\tD 75\tApartment\tR53668\t1169\t702\t475\t508\t554\t912
51\t\tSBJ Common Meter\t\tVillage Square\tR56628\t6229\t3695\t3304\t3335\t3383\t4415
52\tZone 3\tSBJ Common Meter\tFP-17\tZone-3 landscape light\tR54872\t0\t0\t0\t0\t0\t0
53\tZone 3\tSBJ Common Meter\tFP-21\tZone-3 landscape light\tR54873\t40\t48\t12.9\t56.6\t46.5\t55
54\tZone 3\tSBJ Common Meter\tFP-22\tZone-3 landscape light\tR54874\t6\t8\t0\t0\t0\t0
55\t\tSBJ Common Meter\t\tBank muscat\tMISSING_METER\t148\t72\t59\t98\t88\t163
56\t\tSBJ Common Meter\t\tCIF kitchen\tMISSING_METER\t16742\t15554\t16788\t16154\t14971\t18446`.trim();

const extractCategory = (unitName: string) => {
  if (!unitName) return 'Other';
  const lowerUnitName = unitName.toLowerCase();
  if (lowerUnitName.includes('pumping station')) return 'Pumping Station';
  if (lowerUnitName.includes('lifting station')) return 'Lifting Station';
  if (lowerUnitName.includes('street light')) return 'Street Light';
  if (lowerUnitName.includes('irrigation tank')) return 'Irrigation Tank';
  if (lowerUnitName.includes('actuator db')) return 'Actuator DB';
  if (lowerUnitName.includes('apartment')) return 'Apartment';
  if (lowerUnitName.includes('guard house') || lowerUnitName.includes('security building') || lowerUnitName.includes('rop building')) return 'Ancillary Building';
  if (lowerUnitName.includes('central park')) return 'Central Park';
  if (lowerUnitName.includes('village square')) return 'Village Square';
  if (lowerUnitName.includes('bank muscat')) return 'Commercial (Bank)';
  if (lowerUnitName.includes('cif kitchen')) return 'Commercial (Kitchen)';
  if (lowerUnitName.includes('landscape light')) return 'Landscape Light';
  if (lowerUnitName.includes('beachwell')) return 'Beachwell';
  if (lowerUnitName.includes('helipad')) return 'Helipad';
  return 'Other';
};

const parseData = (rawData: string) => {
  const lines = rawData.split('\n');
  const headerLine = lines[0].split('\t').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthsHeader = headerLine.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const unitName = values[4]?.trim() || 'N/A';
    const entry = {
      id: parseInt(values[0], 10) || index + 1,
      slNo: parseInt(values[0], 10) || index + 1,
      zone: values[1]?.trim() || 'N/A',
      type: values[2]?.trim() || 'N/A',
      muscatBayNumber: values[3]?.trim() || 'N/A',
      unitName: unitName,
      category: extractCategory(unitName),
      meterAccountNo: values[5]?.trim() || 'N/A',
      consumption: {} as Record<string, number>,
      totalConsumption: 0
    };
    
    let currentOverallTotal = 0;
    monthsHeader.forEach((month, i) => {
      const consumptionValue = parseFloat(values[6 + i]);
      entry.consumption[month] = isNaN(consumptionValue) ? 0 : consumptionValue;
      if (!isNaN(consumptionValue)) {
        currentOverallTotal += consumptionValue;
      }
    });
    entry.totalConsumption = parseFloat(currentOverallTotal.toFixed(2));
    return entry;
  });
};

const initialElectricityData = parseData(rawDataString);
const availableMonths = Object.keys(initialElectricityData[0].consumption);

// Sub-navigation component
interface SubNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SubNavigation: React.FC<SubNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart2 },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
    { id: 'analytics', name: 'Analytics', icon: BarChart2 },
    { id: 'unit-details', name: 'Unit Details', icon: List },
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
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${isActive 
                    ? 'border-primary-500 text-primary-600' 
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

// AI Analysis Modal
interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  isLoading: boolean;
}

const AIAnalysisModal: React.FC<AIModalProps> = ({ isOpen, onClose, analysis, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="text-primary-600" size={24} />
              AI Consumption Analysis
            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing consumption patterns...</p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-700">
                {analysis || 'No analysis available.'}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ElectricityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMonth, setSelectedMonth] = useState('April-25');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedUnitId, setSelectedUnitId] = useState(initialElectricityData[0]?.id.toString() || '');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  // Get distinct categories
  const distinctCategories = useMemo(() => 
    [...new Set(initialElectricityData.map(d => d.category))].sort(), 
    []
  );

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return initialElectricityData.filter(item => {
      const categoryMatch = selectedCategory === 'All Categories' || item.category === selectedCategory;
      return categoryMatch;
    });
  }, [selectedCategory]);

  // Calculate KPIs
  const kpiData = useMemo(() => {
    const data = selectedMonth === 'All Months' 
      ? filteredData 
      : filteredData.map(item => ({
          ...item,
          totalConsumption: item.consumption[selectedMonth] || 0
        }));

    const totalConsumption = data.reduce((acc, curr) => acc + curr.totalConsumption, 0);
    const totalCost = totalConsumption * OMR_PER_KWH;
    const avgConsumption = data.length > 0 ? totalConsumption / data.length : 0;
    const activeMeters = data.filter(d => 
      d.meterAccountNo !== 'N/A' && 
      d.meterAccountNo !== 'MISSING_METER' && 
      d.totalConsumption > 0
    ).length;

    return {
      totalConsumption,
      totalCost,
      avgConsumption,
      activeMeters
    };
  }, [filteredData, selectedMonth]);

  // Chart data
  const monthlyTrendData = useMemo(() => {
    return availableMonths.map(month => {
      const total = filteredData.reduce((acc, curr) => acc + (curr.consumption[month] || 0), 0);
      return {
        name: month.replace('-24', '').replace('-25', ''),
        total: parseFloat(total.toFixed(2))
      };
    });
  }, [filteredData]);

  const consumptionByTypeData = useMemo(() => {
    const typeData: Record<string, number> = {};
    const dataToUse = selectedMonth === 'All Months' 
      ? filteredData 
      : filteredData.map(item => ({
          ...item,
          totalConsumption: item.consumption[selectedMonth] || 0
        }));

    dataToUse.forEach(d => {
      typeData[d.type] = (typeData[d.type] || 0) + d.totalConsumption;
    });

    return Object.entries(typeData)
      .map(([name, value]) => ({ name, value: parseFloat((value as number).toFixed(2)) }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [filteredData, selectedMonth]);

  const topConsumersData = useMemo(() => {
    const dataToUse = selectedMonth === 'All Months' 
      ? filteredData 
      : filteredData.map(item => ({
          ...item,
          totalConsumption: item.consumption[selectedMonth] || 0
        }));

    return dataToUse
      .sort((a, b) => b.totalConsumption - a.totalConsumption)
      .filter(d => d.totalConsumption > 0)
      .slice(0, 7)
      .map(d => ({
        name: d.unitName.length > 25 ? d.unitName.substring(0, 25) + '...' : d.unitName,
        consumption: d.totalConsumption
      }));
  }, [filteredData, selectedMonth]);

  // Handle AI Analysis
  const handleAIAnalysis = async () => {
    setIsAIModalOpen(true);
    setIsAILoading(true);
    setAiAnalysis('');

    // Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      const analysis = `Based on the consumption data analysis for ${selectedMonth}:

Key Findings:
• Total consumption: ${kpiData.totalConsumption.toLocaleString()} kWh
• Estimated cost: ${kpiData.totalCost.toFixed(2)} OMR
• Active meters: ${kpiData.activeMeters} units

Consumption Patterns:
• Beachwell facility shows highest consumption at ${topConsumersData[0]?.consumption?.toLocaleString() || 'N/A'} kWh
• Infrastructure category dominates overall consumption
• ${selectedCategory === 'All Categories' ? 'All categories' : selectedCategory} consumption analysis completed

Recommendations:
• Monitor high-consumption units for efficiency opportunities
• Consider load balancing for peak consumption periods
• Review meter readings for accuracy validation`;

      setAiAnalysis(analysis);
      setIsAILoading(false);
    }, 2000);
  };

  const renderTabContent = () => {
    const chartColors = getChartColors();

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Total Consumption"
                value={kpiData.totalConsumption.toLocaleString()}
                unit="kWh"
                icon={Zap}
                trend={{
                  value: "5.2%",
                  direction: "up",
                  description: "vs. previous month"
                }}
                color="primary"
              />
              <KPICard
                title="Estimated Cost"
                value={kpiData.totalCost.toFixed(2)}
                unit="OMR"
                icon={DollarSign}
                trend={{
                  value: "3.1%",
                  direction: "down",
                  description: "vs. previous month"
                }}
                color="success"
              />
              <KPICard
                title="Avg. Consumption"
                value={Math.round(kpiData.avgConsumption).toLocaleString()}
                unit="kWh/unit"
                icon={BarChart2}
                trend={{
                  value: "2.3%",
                  direction: "neutral",
                  description: "vs. previous month"
                }}
                color="secondary"
              />
              <KPICard
                title="Active Meters"
                value={kpiData.activeMeters}
                unit="units"
                icon={Users2}
                trend={{
                  value: "100%",
                  direction: "up",
                  description: "operational"
                }}
                color="warning"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChartWrapper
                  title="Monthly Consumption Trend"
                  subtitle={`Category: ${selectedCategory}`}
                  height="350px"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrendData}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors[0]} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={chartColors[0]} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        stroke={chartColors[0]} 
                        fillOpacity={1} 
                        fill="url(#colorTotal)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>

              <ChartWrapper
                title="Consumption by Type"
                subtitle={`For ${selectedMonth}`}
                height="350px"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={consumptionByTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {consumptionByTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} kWh`, 'Consumption']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            <ChartWrapper
              title="Top 7 Consumers"
              subtitle={`For ${selectedMonth}`}
              height="350px"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topConsumersData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={200} />
                  <Tooltip formatter={(value) => [`${value} kWh`, 'Consumption']} />
                  <Bar dataKey="consumption" fill={chartColors[1]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>
        );

      case 'unit-details':
        const selectedUnit = initialElectricityData.find(u => u.id.toString() === selectedUnitId);
        const unitMonthlyData = selectedUnit ? availableMonths.map(month => ({
          month: month.replace('-24', '').replace('-25', ''),
          consumption: selectedUnit.consumption[month] || 0
        })) : [];

        return (
          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-4 mb-4">
                <Building className="text-primary-600" size={20} />
                <label className="text-sm font-medium text-gray-700">Select Unit:</label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  {initialElectricityData.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.unitName} ({unit.meterAccountNo})
                    </option>
                  ))}
                </select>
              </div>
            </Card>

            {selectedUnit && (
              <>
                <KPICard
                  title={selectedUnit.unitName}
                  value={selectedUnit.totalConsumption.toLocaleString()}
                  unit="kWh"
                  icon={Zap}
                  trend={{
                    value: `Meter: ${selectedUnit.meterAccountNo}`,
                    direction: "neutral",
                    description: `Category: ${selectedUnit.category}`
                  }}
                  color="primary"
                  size="lg"
                />

                <ChartWrapper
                  title={`Monthly Consumption: ${selectedUnit.unitName}`}
                  subtitle="All available months"
                  height="400px"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={unitMonthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} kWh`, 'Consumption']} />
                      <Bar dataKey="consumption" fill={chartColors[0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </>
            )}
          </div>
        );

      default:
        return (
          <Card className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View
            </h3>
            <p className="text-gray-600">This section is under development.</p>
          </Card>
        );
    }
  };

  return (
    <MainLayout 
      title="Electricity System Dashboard" 
      subtitle="Monitor power consumption and system performance"
    >
      <div className="space-y-6">
        {/* AI Analysis Button */}
        <div className="flex justify-between items-center">
          <SectionHeader 
            title="Power Management"
            subtitle="Real-time electricity monitoring and analytics"
          />
          <button
            onClick={handleAIAnalysis}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Sparkles size={16} />
            AI Analysis
          </button>
        </div>

        {/* Sub Navigation */}
        <SubNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Filters */}
        {activeTab === 'dashboard' && (
          <FilterBar
            filters={[
              {
                id: 'month',
                label: 'Month',
                value: selectedMonth,
                options: [
                  { label: 'All Months', value: 'All Months' },
                  ...availableMonths.map(m => ({ label: m, value: m }))
                ],
                onChange: setSelectedMonth,
                icon: CalendarDays
              },
              {
                id: 'category',
                label: 'Category',
                value: selectedCategory,
                options: [
                  { label: 'All Categories', value: 'All Categories' },
                  ...distinctCategories.map(c => ({ label: c, value: c }))
                ],
                onChange: setSelectedCategory,
                icon: Filter
              }
            ]}
            onReset={() => {
              setSelectedMonth('All Months');
              setSelectedCategory('All Categories');
            }}
          />
        )}

        {/* Tab Content */}
        {renderTabContent()}

        {/* AI Analysis Modal */}
        <AIAnalysisModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          analysis={aiAnalysis}
          isLoading={isAILoading}
        />
      </div>
    </MainLayout>
  );
};

export default ElectricityDashboard;
