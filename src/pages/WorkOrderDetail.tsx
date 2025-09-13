import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Package, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkOrderStepper } from "@/components/WorkOrderStepper";
import { sampleWorkOrders, sampleWorkOrderSteps } from "@/data/sampleData";
import { WorkOrderStep } from "@/types";

const WorkOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const workOrder = sampleWorkOrders.find(wo => wo.id === id);
  const [steps, setSteps] = useState<WorkOrderStep[]>(
    sampleWorkOrderSteps.filter(step => step.workOrderId === id)
  );

  if (!workOrder) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Work Order Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested work order could not be found.</p>
          <Button onClick={() => navigate("/work-orders")}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Work Orders
          </Button>
        </div>
      </div>
    );
  }

  const handleStepComplete = (stepId: string, remarks?: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId
          ? {
              ...step,
              status: "COMPLETED" as const,
              endTime: new Date().toISOString(),
              completedBy: "Current User",
              remarks
            }
          : step
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/work-orders")}
          >
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{workOrder.number}</h1>
            <p className="text-muted-foreground mt-1">
              Work Order Details & Progress Tracking
            </p>
          </div>
        </div>
        <Badge className={`px-3 py-1 ${getStatusColor(workOrder.status)}`}>
          {workOrder.status.replace("_", " ")}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Work Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="font-medium">{workOrder.productName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium">{workOrder.quantity} units</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{workOrder.startDate}</p>
                  </div>
                </div>

                {workOrder.endDate && (
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Target End Date</p>
                      <p className="font-medium">{workOrder.endDate}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Step</p>
                    <p className="font-medium capitalize">{workOrder.currentStep.replace("_", " ")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <WorkOrderStepper
            workOrder={workOrder}
            steps={steps}
            onStepComplete={handleStepComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetail;