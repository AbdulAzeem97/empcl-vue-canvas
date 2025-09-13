import React from "react";

const PurchaseOrders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Purchase Orders</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage purchase orders with suppliers
        </p>
      </div>
      
      <div className="card-enterprise p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          Purchase order management features will be available in the next update.
        </p>
      </div>
    </div>
  );
};

export default PurchaseOrders;