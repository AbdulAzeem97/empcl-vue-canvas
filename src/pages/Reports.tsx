import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table";
import { StatsCard } from "@/components/ui/stats-card";
import { sampleInventoryTransactions, sampleInventoryItems, sampleWorkOrders } from "@/data/sampleData";

const Reports: React.FC = () => {
  // Consumption Report Data
  const consumptionData = sampleInventoryTransactions
    .filter(t => t.type === "ISSUE")
    .reduce((acc, transaction) => {
      const key = `${transaction.productCode}-${transaction.workOrderNumber || 'No WO'}`;
      if (!acc[key]) {
        acc[key] = {
          productCode: transaction.productCode,
          productName: transaction.productName,
          workOrderNumber: transaction.workOrderNumber || "No Work Order",
          totalQuantity: 0,
          step: transaction.step || "N/A",
          location: transaction.location,
        };
      }
      acc[key].totalQuantity += transaction.quantity;
      return acc;
    }, {} as Record<string, any>);

  const consumptionReportData = Object.values(consumptionData);

  // Stock Report Data  
  const stockReportData = sampleInventoryItems.map(item => ({
    ...item,
    valueAtCost: item.quantityOnHand * 25, // Assuming average cost
  }));

  const consumptionColumns: Column<any>[] = [
    { key: "productCode", header: "Product Code", sortable: true },
    { key: "productName", header: "Product Name", sortable: true },
    { key: "workOrderNumber", header: "Work Order", sortable: true },
    { key: "step", header: "Step", sortable: true },
    { key: "location", header: "Location", sortable: true },
    { 
      key: "totalQuantity", 
      header: "Total Consumed", 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{value.toFixed(2)}</span>
      )
    },
  ];

  const stockColumns: Column<any>[] = [
    { key: "productCode", header: "Product Code", sortable: true },
    { key: "productName", header: "Product Name", sortable: true },
    { key: "batchNo", header: "Batch No", sortable: true },
    { key: "location", header: "Location", sortable: true },
    { key: "quantityOnHand", header: "On Hand", sortable: true },
    { key: "availableQuantity", header: "Available", sortable: true },
    { key: "uomCode", header: "UOM", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === "AVAILABLE" ? "bg-emerald-100 text-emerald-800" :
          value === "LOW_STOCK" ? "bg-yellow-100 text-yellow-800" :
          value === "OUT_OF_STOCK" ? "bg-red-100 text-red-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {value.replace("_", " ")}
        </span>
      ),
    },
    { 
      key: "valueAtCost", 
      header: "Value (₹)", 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">₹{value.toLocaleString()}</span>
      )
    },
  ];

  const handleExport = (reportType: string) => {
    console.log(`Exporting ${reportType} report...`);
  };

  // Calculate stats
  const totalIssued = sampleInventoryTransactions
    .filter(t => t.type === "ISSUE")
    .reduce((sum, t) => sum + t.quantity, 0);
    
  const totalReceived = sampleInventoryTransactions
    .filter(t => t.type === "RECEIVE")
    .reduce((sum, t) => sum + t.quantity, 0);

  const activeWorkOrders = sampleWorkOrders.filter(wo => wo.status === "IN_PROGRESS").length;
  const totalStockValue = stockReportData.reduce((sum, item) => sum + item.valueAtCost, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive reports for production and inventory management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Issued"
          value={totalIssued.toString()}
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Received"
          value={totalReceived.toString()}
          icon={BarChart3}
        />
        <StatsCard
          title="Active Work Orders"
          value={activeWorkOrders.toString()}
          icon={BarChart3}
        />
        <StatsCard
          title="Stock Value"
          value={`₹${totalStockValue.toLocaleString()}`}
          icon={TrendingUp}
        />
      </div>

      <Tabs defaultValue="consumption" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="consumption">Consumption Report</TabsTrigger>
          <TabsTrigger value="stock">Stock Report</TabsTrigger>
        </TabsList>

        <TabsContent value="consumption" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Material Consumption Report</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => handleExport("consumption")}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={consumptionReportData}
                columns={consumptionColumns}
                searchPlaceholder="Search by product, work order, or location..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Stock Report</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => handleExport("stock")}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={stockReportData}
                columns={stockColumns}
                searchPlaceholder="Search by product, batch, or location..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;