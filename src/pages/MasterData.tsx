import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, Column } from "@/components/ui/data-table";
import { OEMModal } from "@/components/modals/OEMModal";
import { OEM, Model, UOM, Product } from "@/types";
import { sampleOEMs, sampleModels, sampleUOMs, sampleProducts } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

const MasterData: React.FC = () => {
  const { toast } = useToast();
  
  // State for data
  const [oems, setOEMs] = useState<OEM[]>(sampleOEMs);
  const [models, setModels] = useState<Model[]>(sampleModels);
  const [uoms, setUOMs] = useState<UOM[]>(sampleUOMs);
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  // Modal states
  const [oemModalOpen, setOEMModalOpen] = useState(false);
  const [editingOEM, setEditingOEM] = useState<OEM | null>(null);

  // OEM Table Columns
  const oemColumns: Column<OEM>[] = [
    { key: "name", header: "OEM Name", sortable: true },
    { key: "createdAt", header: "Created At", sortable: true },
  ];

  // Model Table Columns
  const modelColumns: Column<Model>[] = [
    { key: "name", header: "Model Name", sortable: true },
    { key: "year", header: "Year", sortable: true },
    { key: "oemName", header: "OEM", sortable: true },
    { key: "createdAt", header: "Created At", sortable: true },
  ];

  // UOM Table Columns
  const uomColumns: Column<UOM>[] = [
    { key: "code", header: "Code", sortable: true },
    { key: "name", header: "Name", sortable: true },
    { key: "createdAt", header: "Created At", sortable: true },
  ];

  // Product Table Columns
  const productColumns: Column<Product>[] = [
    { key: "code", header: "Product Code", sortable: true },
    { key: "partName", header: "Part Name", sortable: true },
    { key: "oemName", header: "OEM", sortable: true },
    { key: "modelName", header: "Model", sortable: true },
    { key: "uomCode", header: "UOM", sortable: true },
    { 
      key: "standardCost", 
      header: "Standard Cost", 
      sortable: true,
      render: (value) => value ? `$${value.toFixed(2)}` : "-"
    },
    { key: "category", header: "Category", sortable: true },
  ];

  // Handlers
  const handleSaveOEM = (oemData: Omit<OEM, "id" | "createdAt">) => {
    if (editingOEM) {
      // Update existing OEM
      setOEMs(prev => prev.map(oem => 
        oem.id === editingOEM.id 
          ? { ...oem, ...oemData }
          : oem
      ));
      toast({
        title: "Success",
        description: "OEM updated successfully",
      });
    } else {
      // Add new OEM
      const newOEM: OEM = {
        id: String(Date.now()),
        ...oemData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setOEMs(prev => [newOEM, ...prev]);
      toast({
        title: "Success",
        description: "OEM added successfully",
      });
    }
    setEditingOEM(null);
  };

  const handleEditOEM = (oem: OEM) => {
    setEditingOEM(oem);
    setOEMModalOpen(true);
  };

  const handleDeleteOEM = (oem: OEM) => {
    setOEMs(prev => prev.filter(o => o.id !== oem.id));
    toast({
      title: "Success",
      description: "OEM deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Master Data</h1>
        <p className="text-muted-foreground mt-2">
          Manage your core business data including OEMs, Models, Units of Measure, and Products
        </p>
      </div>

      <Tabs defaultValue="oem" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="oem">OEM</TabsTrigger>
          <TabsTrigger value="model">Model</TabsTrigger>
          <TabsTrigger value="uom">UOM</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
        </TabsList>

        <TabsContent value="oem" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Original Equipment Manufacturers</h2>
            <Button onClick={() => setOEMModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add OEM
            </Button>
          </div>
          
          <DataTable
            data={oems}
            columns={oemColumns}
            onEdit={handleEditOEM}
            onDelete={handleDeleteOEM}
            searchPlaceholder="Search OEMs..."
          />
        </TabsContent>

        <TabsContent value="model" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Vehicle Models</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Model
            </Button>
          </div>
          
          <DataTable
            data={models}
            columns={modelColumns}
            searchPlaceholder="Search models..."
          />
        </TabsContent>

        <TabsContent value="uom" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Units of Measure</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add UOM
            </Button>
          </div>
          
          <DataTable
            data={uoms}
            columns={uomColumns}
            searchPlaceholder="Search UOMs..."
          />
        </TabsContent>

        <TabsContent value="product" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Products</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
          
          <DataTable
            data={products}
            columns={productColumns}
            searchPlaceholder="Search products..."
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <OEMModal
        isOpen={oemModalOpen}
        onClose={() => {
          setOEMModalOpen(false);
          setEditingOEM(null);
        }}
        onSave={handleSaveOEM}
        editingOEM={editingOEM}
      />
    </div>
  );
};

export default MasterData;