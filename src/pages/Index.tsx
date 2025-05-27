import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Zap, TrendingUp, Users2, DollarSign, BarChart2, Filter, 
  CalendarDays, List, Sparkles, X, Building
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { 
  Card, KPICard, ChartWrapper, SectionHeader, FilterBar, StatusBadge 
} from '@/components/shared/UIComponents';
import { MUSCAT_BAY_THEME, getChartColors } from '@/lib/theme';

// OMR Conversion Rate
const OMR_PER_KWH = 0.025;

// Data parsing and processing (keeping existing logic)
const rawDataString = `SL:no.	Zone	Type 	Muscat Bay Number	Unit Number (Muncipality) 	Electrical Meter Account  No	November-24	December-24	January-25	February-25	March-25	April-25
1	Infrastructure	MC	MC	Pumping Station 01 	R52330	1629	1640	1903	2095	3032	3940
2	Infrastructure	MC	MC	Pumping Station 03	R52329	0	179	32.5	137.2	130.7	276.6
3	Infrastructure	MC	MC	Pumping Station 04 	R52327	919	921	245.1	869.5	646.1	984.9
4	Infrastructure	MC	MC	Pumping Station 05 	R52325	2599	1952	2069	2521	2601	3317
5	Infrastructure	MC	MC	Lifting Station 02	R52328	0	0	0	0	0	0
6	Infrastructure	MC	MC	Lifting Station 03	R52333	91	185	28	40	58	83
7	Infrastructure	MC	MC	Lifting Station 04	R52324	686	631	701	638	572	750.22
8	Infrastructure	MC	MC	Lifting Station 05	R52332	2413	2643	2873	3665	3069	4201.4
9	Infrastructure	MC	MC	Irrigation Tank 01	R52324 (R52326)	1432	1268	1689	2214	1718	1663
10	Infrastructure	MC	MC	Irrigation Tank 02	R52331	974	1026	983	1124	1110	1830
11	Infrastructure	MC	MC	Irrigation Tank 03	R52323	269	417	840	1009	845	1205
12	Infrastructure	MC	MC	Irrigation Tank 04	R53195	212	213	39.7	233.2	234.9	447.2
13	Infrastructure	MC	MC	Actuator DB 01 (Z8)	R53196	34	29	7.3	27.7	24.4	27.1
14	Infrastructure	MC	MC	Actuator DB 02	R51900	232	161	33	134	138.5	211
15	Infrastructure	MC	MC	Actuator DB 03	R51904	220	199	55.7	203.3	196	211.6
16	Infrastructure	MC	MC	Actuator DB 04	R51901	172	173	186	161	227	253
17	Infrastructure	MC	MC	Actuator DB 05	R51907	18	16	4.2	17.8	14	17.7
18	Infrastructure	MC	MC	Actuator DB 06	R51909	49	44	47	45	38	46.9
19	Infrastructure	MC	MC	Street Light FP 01 (Z8)	R53197	3593	3147	787	3228	2663	3230
20	Infrastructure	MC	MC	Street Light FP 02	R51906	2361	2258	633	2298	1812	2153
21	Infrastructure	MC	MC	Street Light FP 03	R51905	2060	1966	1868	1974	1562	1847
22	Infrastructure	MC	MC	Street Light FP 04	R51908	2299	1389	325	1406	1401	2412.9
23	Infrastructure	MC	MC	Street Light FP 05	R51902	1477	1121	449	2069.9	1870.1	3233
24	Infrastructure	MC	MC	Beachwell	R51903	24383	37236	38168	18422	40	27749
25	Infrastructure	MC	MC	Helipad	R52334	0	0	0	0	0	0
26	Central Park	MC	MC	Central Park	R54672	9604	19032	22819	19974	14190	13846
27	Ancilary	Building	MC	Guard House	R53651	1225	814	798	936	879	1467
28	Ancilary	Building	MC	Security Building	R53649	5702	5131	5559	5417	4504	5978
29	Ancilary	Building	MC	ROP Building	R53648	3581	2352	2090	2246	1939	3537
30	Zone 3	SBJ Common Meter	D 44	Apartment	R53705	1377	764	647	657	650	1306
31	Zone 3	SBJ Common Meter	D 45	Apartment	R53665	1252	841	670	556	608	1069
32	Zone 3	SBJ Common Meter	D 46	Apartment	R53700	1577	890	724	690	752	1292
33	Zone 3	SBJ Common Meter	D 47	Apartment	R53690	1774	1055	887	738	792	1545
34	Zone 3	SBJ Common Meter	D 48	Apartment	R53666	1046	785	826	676	683	1092
35	Zone 3	SBJ Common Meter	D 49	Apartment	R53715	1608	1068	860	837	818	984
36	Zone 3	SBJ Common Meter	D 50	Apartment	R53672	1102	789	765	785	707	1331
37	Zone 3	SBJ Common Meter	D 51	Apartment	R53657	1855	710	661	682	642	904
38	Zone 3	SBJ Common Meter	D 52	Apartment	R53699	1986	1208	979	896	952	1651
39	Zone 3	SBJ Common Meter	D53	Apartment	R54782	1764	968	693	732	760	1281
40	Zone 3	SBJ Common Meter	D54	Apartment	R54793	1777	834	681	559	531	1042
41	Zone 3	SBJ Common Meter	D55	Apartment	R54804	1828	1035	677	616	719	1417
42	Zone 3	SBJ Common Meter	D56	Apartment	R54815	1805	937	683	731	765	1536
43	Zone 3	SBJ Common Meter	D57	Apartment	R54826	2262	1332	990	846	795	1732
44	Zone 3	SBJ Common Meter	D58	Apartment	R54836	1534	778	593	535	594	1415
45	Zone 3	SBJ Common Meter	D59	Apartment	R54847	1634	998	628	582	697	1138
46	Zone 3	SBJ Common Meter	D60	Apartment	R54858	1275	705	674	612	679	1069
47	Zone 3	SBJ Common Meter	D61	Apartment	R54869	1734	977	767	800	719	1394
48	Zone 3	SBJ Common Meter	D 62	Apartment	R53717	1630	957	715	677	595	800
49	Zone 3	SBJ Common Meter	D 74	Apartment	R53675	1303	766	639	566	463	1079
50	Zone 3	SBJ Common Meter	D 75	Apartment	R53668	1169	702	475	508	554	912
51		SBJ Common Meter		Village Square	R56628	6229	3695	3304	3335	3383	4415
52	Zone 3	SBJ Common Meter	FP-17	Zone-3 landscape light	R54872	0	0	0	0	0	0
53	Zone 3	SBJ Common Meter	FP-21	Zone-3 landscape light	R54873	40	48	12.9	56.6	46.5	55
54	Zone 3	SBJ Common Meter	FP-22	Zone-3 landscape light	R54874	6	8	0	0	0	0
55		SBJ Common Meter		Bank muscat	MISSING_METER	148	72	59	98	88	163
56		SBJ Common Meter		CIF kitchen	MISSING_METER	16742	15554	16788	16154	14971	18446`.trim();

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
                    ? 'border-bay-500 text-bay-600' 
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
              <Sparkles className="text-bay-600" size={24} />
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bay-600 mx-auto mb-4"></div>
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
            className="w-full py-2 px-4 bg-bay-600 hover:bg-bay-700 text-white rounded-lg transition-colors"
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
                <Building className="text-bay-600" size={20} />
                <label className="text-sm font-medium text-gray-700">Select Unit:</label>
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bay-500 focus:border-bay-500 outline-none"
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
    <DashboardLayout title="Electricity System">
      <div className="space-y-6">
        {/* AI Analysis Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-bay-800">Power Management Dashboard</h2>
            <p className="text-bay-600 text-sm">Monitor power consumption and system performance</p>
          </div>
          <button
            onClick={handleAIAnalysis}
            className="flex items-center gap-2 px-4 py-2 bg-bay-600 hover:bg-bay-700 text-white rounded-lg transition-colors"
          >
            <Sparkles size={16} />
            AI Analysis
          </button>
        </div>

        {/* Sub Navigation */}
        <SubNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Filters */}
        {activeTab === 'dashboard' && (
          <div className="flex flex-wrap gap-4 p-4 bg-bay-50 rounded-lg border border-bay-200">
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-bay-300 rounded-lg focus:ring-2 focus:ring-bay-500"
            >
              <option value="All Months">All Months</option>
              {availableMonths.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-bay-300 rounded-lg focus:ring-2 focus:ring-bay-500"
            >
              <option value="All Categories">All Categories</option>
              {distinctCategories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
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
    </DashboardLayout>
  );
};

export default ElectricityDashboard;