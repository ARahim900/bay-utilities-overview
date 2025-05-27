import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MetricCard } from '../components/shared/MetricCard';
import { Droplets, AlertTriangle, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function STPPlant() {
  const treatmentMetrics = [
    {
      title: "Influent Flow",
      value: "2,450",
      unit: "m³/day",
      icon: Droplets,
      trend: {
        value: "+5.2%",
        direction: "up" as const,
        description: "vs. last month"
      },
    },
    {
      title: "Treatment Efficiency",
      value: "96.8",
      unit: "%",
      icon: TrendingUp,
      trend: {
        value: "+2.1%",
        direction: "up" as const,
        description: "vs. last month"
      },
    },
    {
      title: "BOD Removal",
      value: "98.2",
      unit: "%",
      icon: Zap,
      trend: {
        value: "+1.5%",
        direction: "up" as const,
        description: "vs. last month"
      },
    },
    {
      title: "System Alerts",
      value: "3",
      unit: "Active",
      icon: AlertTriangle,
      trend: {
        value: "-2",
        direction: "down" as const,
        description: "vs. last month"
      },
    },
  ];

  const treatmentStages = [
    { name: "Primary Treatment", efficiency: 45, status: "optimal" },
    { name: "Secondary Treatment", efficiency: 92, status: "optimal" },
    { name: "Tertiary Treatment", efficiency: 88, status: "good" },
    { name: "Disinfection", efficiency: 95, status: "optimal" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal': return <Badge className="bg-emerald-100 text-emerald-800">Optimal</Badge>;
      case 'good': return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
      case 'warning': return <Badge className="bg-orange-100 text-orange-800">Warning</Badge>;
      default: return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    }
  };

  return (
    <DashboardLayout title="STP Plant Management">
      <div className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatmentMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Treatment Stages */}
          <Card className="border-bay-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-bay-50 to-blue-50 border-b border-bay-100">
              <CardTitle className="text-bay-800 flex items-center gap-2">
                <Droplets className="h-5 w-5 text-bay-600" />
                Treatment Process Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {treatmentStages.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-bay-700">{stage.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{stage.efficiency}%</span>
                        {getStatusBadge(stage.status)}
                      </div>
                    </div>
                    <Progress 
                      value={stage.efficiency} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Effluent Quality */}
          <Card className="border-bay-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-bay-50 to-blue-50 border-b border-bay-100">
              <CardTitle className="text-bay-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-bay-600" />
                Effluent Quality Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-bay-100">
                  <span className="text-bay-600">pH Level</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">7.2</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Normal</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-bay-100">
                  <span className="text-bay-600">BOD (mg/L)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">8.5</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Excellent</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-bay-100">
                  <span className="text-bay-600">COD (mg/L)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">32.1</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Good</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-bay-100">
                  <span className="text-bay-600">TSS (mg/L)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">12.3</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Normal</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-bay-600">Turbidity (NTU)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">2.8</span>
                    <Badge className="bg-emerald-100 text-emerald-800">Excellent</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Compliance */}
        <Card className="border-bay-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-bay-50 to-blue-50 border-b border-bay-100">
            <CardTitle className="text-bay-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-bay-600" />
              Environmental Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600 mb-2">98.5%</div>
                <div className="text-emerald-700 font-medium">Compliance Rate</div>
                <div className="text-sm text-emerald-600 mt-1">Last 30 days</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">15</div>
                <div className="text-blue-700 font-medium">Days to Inspection</div>
                <div className="text-sm text-blue-600 mt-1">Next scheduled</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600 mb-2">2</div>
                <div className="text-orange-700 font-medium">Pending Actions</div>
                <div className="text-sm text-orange-600 mt-1">Requires attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}