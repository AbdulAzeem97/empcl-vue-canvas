import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Settings, PlayCircle, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { StatsCard } from "@/components/ui/stats-card";
import { sampleWorkOrders } from "@/data/sampleData";
import { WorkOrder } from "@/types";

const Production: React.FC = () => {
  const navigate = useNavigate();

  const activeOrders = sampleWorkOrders.filter(wo => wo.status === "IN_PROGRESS");
  const pendingOrders = sampleWorkOrders.filter(wo => wo.status === "PENDING");
  const completedToday = sampleWorkOrders.filter(wo => 
    wo.status === "COMPLETED" && 
    new Date(wo.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const columns: Column<WorkOrder>[] = [
    { key: "number", header: "WO Number", sortable: true },
    { key: "productName", header: "Product", sortable: true },
    { key: "quantity", header: "Quantity", sortable: true },
    {
      key: "currentStep",
      header: "Current Step",
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value.replace("_", " ")}
        </span>
      ),
    },
    {
      key: "progress",
      header: "Progress",
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">{value}%</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === "COMPLETED" ? "bg-emerald-100 text-emerald-800" :
          value === "IN_PROGRESS" ? "bg-blue-100 text-blue-800" :
          value === "PENDING" ? "bg-yellow-100 text-yellow-800" :
          "bg-red-100 text-red-800"
        }`}>
          {value.replace("_", " ")}
        </span>
      ),
    },
  ];

  const handleViewWorkOrder = (workOrder: WorkOrder) => {
    navigate(`/work-orders/${workOrder.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Production Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage production processes and schedules
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/work-orders")} className="flex items-center gap-2">
            <Settings size={16} />
            Manage Work Orders
          </Button>
          <Button onClick={() => navigate("/work-orders")} className="flex items-center gap-2">
            <Plus size={16} />
            New Work Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Orders"
          value={activeOrders.length.toString()}
          icon={PlayCircle}
        />
        <StatsCard
          title="Pending Orders"
          value={pendingOrders.length.toString()}
          icon={PauseCircle}
        />
        <StatsCard
          title="Completed Today"
          value={completedToday.toString()}
          icon={PlayCircle}
        />
        <StatsCard
          title="Total Orders"
          value={sampleWorkOrders.length.toString()}
          icon={Settings}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active Production Orders</h2>
          <Button variant="outline" onClick={() => navigate("/work-orders")}>
            View All Orders
          </Button>
        </div>
        
        <DataTable
          data={activeOrders}
          columns={columns}
          searchPlaceholder="Search by work order or product..."
          onEdit={handleViewWorkOrder}
        />
      </div>
    </div>
  );
};

export default Production;