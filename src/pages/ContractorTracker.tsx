import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MetricCard } from '../components/shared/MetricCard';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ContractorTracker() {
  const contractorMetrics = [
    {
      title: "Active Contractors",
      value: "23",
      unit: "Teams",
      icon: Users,
      trend: "+3",
      isPositive: true,
    },
    {
      title: "Completed Projects",
      value: "47",
      unit: "This Month",
      icon: CheckCircle,
      trend: "+12.5%",
      isPositive: true,
    },
    {
      title: "Average Completion",
      value: "87",
      unit: "%",
      icon: Clock,
      trend: "+5.2%",
      isPositive: true,
    },
    {
      title: "Pending Reviews",
      value: "8",
      unit: "Projects",
      icon: AlertCircle,
      trend: "-2",
      isPositive: true,
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
    {
      id: "P005",
      contractor: "Utility Specialists Co",
      project: "Monthly Inspection Round",
      progress: 78,
      status: "on-track",
      deadline: "2025-06-10",
      priority: "medium"
    }
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
    <DashboardLayout title="Contractor Activity Tracker">
      <div className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contractorMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Summary */}
          <Card className="border-bay-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-bay-50 to-blue-50 border-b border-bay-100">
              <CardTitle className="text-bay-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-bay-600" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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
          <Card className="border-bay-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-bay-50 to-blue-50 border-b border-bay-100">
              <CardTitle className="text-bay-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-bay-600" />
                Resource Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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
          <Card className="border-bay-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-bay-50 to-blue-50 border-b border-bay-100">
              <CardTitle className="text-bay-800 flex items-center gap-2">
                <Clock className="h-5 w-5 text-bay-600" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
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
        <Card className="border-bay-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-bay-50 to-blue-50 border-b border-bay-100">
            <CardTitle className="text-bay-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-bay-600" />
              Active Projects Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-bay-100">
                  <TableHead className="text-bay-700">Project ID</TableHead>
                  <TableHead className="text-bay-700">Contractor</TableHead>
                  <TableHead className="text-bay-700">Project Description</TableHead>
                  <TableHead className="text-bay-700">Progress</TableHead>
                  <TableHead className="text-bay-700">Status</TableHead>
                  <TableHead className="text-bay-700">Priority</TableHead>
                  <TableHead className="text-bay-700">Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeProjects.map((project) => (
                  <TableRow key={project.id} className="border-bay-100">
                    <TableCell className="font-medium text-bay-800">{project.id}</TableCell>
                    <TableCell className="text-bay-600">{project.contractor}</TableCell>
                    <TableCell className="text-bay-600">{project.project}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{project.progress}%</span>
                        </div>
                        <Progress 
                          value={project.progress} 
                          className="h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell>{getPriorityBadge(project.priority)}</TableCell>
                    <TableCell className="text-bay-600">{project.deadline}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}