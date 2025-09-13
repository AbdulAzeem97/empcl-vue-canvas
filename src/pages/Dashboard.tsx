import React from "react";
import { StatsCard } from "@/components/ui/stats-card";
import { Factory, Package, Wrench, Database } from "lucide-react";
import { sampleOEMs, sampleModels, sampleProducts, sampleWorkOrders } from "@/data/sampleData";

const Dashboard: React.FC = () => {
  const inProgressWorkOrders = sampleWorkOrders.filter(wo => wo.status === "IN_PROGRESS").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your ERP system metrics and key performance indicators
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total OEMs"
          value={sampleOEMs.length}
          change={{ value: "2", positive: true }}
          icon={Factory}
          color="primary"
        />
        <StatsCard
          title="Active Models"
          value={sampleModels.length}
          change={{ value: "3", positive: true }}
          icon={Database}
          color="success"
        />
        <StatsCard
          title="Products"
          value={sampleProducts.length}
          change={{ value: "12", positive: true }}
          icon={Package}
          color="warning"
        />
        <StatsCard
          title="Work Orders (Active)"
          value={inProgressWorkOrders}
          change={{ value: "1", positive: false }}
          icon={Wrench}
          color="destructive"
        />
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-enterprise p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm">New OEM "Mercedes" added</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm">Work Order WO-2024-004 created</span>
              <span className="text-xs text-muted-foreground">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm">Product "Steel Sheet" updated</span>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Model "C-Class" added</span>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
          </div>
        </div>

        <div className="card-enterprise p-6">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Connection</span>
              <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Backup</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Users</span>
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">System Uptime</span>
              <span className="text-sm font-medium">99.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;