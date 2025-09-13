import React, { useState } from "react";
import { Package, TrendingUp, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { StatsCard } from "@/components/ui/stats-card";
import { MaterialIssueModal } from "@/components/modals/MaterialIssueModal";
import { MaterialReceiveModal } from "@/components/modals/MaterialReceiveModal";
import { sampleInventoryItems, sampleWorkOrders } from "@/data/sampleData";
import { InventoryItem } from "@/types";

const Inventory: React.FC = () => {
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const totalItems = sampleInventoryItems.length;
  const lowStockItems = sampleInventoryItems.filter(item => item.status === "LOW_STOCK").length;
  const outOfStockItems = sampleInventoryItems.filter(item => item.status === "OUT_OF_STOCK").length;
  const totalValue = sampleInventoryItems.reduce((sum, item) => sum + (item.quantityOnHand * 10), 0);

  const columns: Column<InventoryItem>[] = [
    { key: "productCode", header: "Product Code", sortable: true },
    { key: "productName", header: "Product Name", sortable: true },
    { key: "batchNo", header: "Batch No", sortable: true },
    { key: "location", header: "Location", sortable: true },
    { key: "quantityOnHand", header: "Qty On Hand", sortable: true },
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
  ];

  const handleIssue = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowIssueModal(true);
  };

  const handleReceive = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowReceiveModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor stock levels and manage material movements
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowReceiveModal(true)} className="flex items-center gap-2">
            <Plus size={16} />
            Receive Materials
          </Button>
          <Button variant="outline" onClick={() => setShowIssueModal(true)} className="flex items-center gap-2">
            <TrendingUp size={16} />
            Issue Materials
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Items"
          value={totalItems.toString()}
          icon={Package}
        />
        <StatsCard
          title="Total Value"
          value={`₹${totalValue.toLocaleString()}`}
          icon={TrendingUp}
        />
        <StatsCard
          title="Low Stock"
          value={lowStockItems.toString()}
          icon={AlertTriangle}
        />
        <StatsCard
          title="Out of Stock"
          value={outOfStockItems.toString()}
          icon={AlertTriangle}
        />
      </div>

      <DataTable
        data={sampleInventoryItems}
        columns={columns}
        searchPlaceholder="Search by product, location, or batch..."
        onEdit={handleReceive}
        onDelete={handleIssue}
      />

      {showIssueModal && (
        <MaterialIssueModal
          isOpen={showIssueModal}
          onClose={() => {
            setShowIssueModal(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
        />
      )}

      {showReceiveModal && (
        <MaterialReceiveModal
          isOpen={showReceiveModal}
          onClose={() => {
            setShowReceiveModal(false);
            setSelectedItem(null);
          }}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default Inventory;