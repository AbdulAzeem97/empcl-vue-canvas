import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { StatsCard } from "@/components/ui/stats-card";
import { CreateWorkOrderModal } from "@/components/modals/CreateWorkOrderModal";
import { sampleWorkOrders } from "@/data/sampleData";
import { WorkOrder } from "@/types";

const WorkOrders: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const pendingOrders = sampleWorkOrders.filter(wo => wo.status === "PENDING").length;
  const inProgressOrders = sampleWorkOrders.filter(wo => wo.status === "IN_PROGRESS").length;
  const completedOrders = sampleWorkOrders.filter(wo => wo.status === "COMPLETED").length;
  const totalOrders = sampleWorkOrders.length;

  const columns: Column<WorkOrder>[] = [
    { key: "number", header: "WO Number", sortable: true },
    { key: "productName", header: "Product", sortable: true },
    { key: "quantity", header: "Quantity", sortable: true },
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
    { key: "startDate", header: "Start Date", sortable: true },
    { key: "endDate", header: "End Date", sortable: true },
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
  ];

  const handleViewDetails = (workOrder: WorkOrder) => {
    navigate(`/work-orders/${workOrder.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Work Orders</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage work orders and manufacturing tasks
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Create Work Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={totalOrders.toString()}
          icon={Clock}
        />
        <StatsCard
          title="Pending"
          value={pendingOrders.toString()}
          icon={Clock}
        />
        <StatsCard
          title="In Progress"
          value={inProgressOrders.toString()}
          icon={ArrowRight}
        />
        <StatsCard
          title="Completed"
          value={completedOrders.toString()}
          icon={CheckCircle}
        />
      </div>

      <DataTable
        data={sampleWorkOrders}
        columns={columns}
        searchPlaceholder="Search by work order number or product..."
        onEdit={handleViewDetails}
      />

      {showCreateModal && (
        <CreateWorkOrderModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default WorkOrders;