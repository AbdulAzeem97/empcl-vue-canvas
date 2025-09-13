import React from "react";

const WorkOrders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Work Orders</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage work orders and manufacturing tasks
        </p>
      </div>
      
      <div className="card-enterprise p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          Work order management features will be available in the next update.
        </p>
      </div>
    </div>
  );
};

export default WorkOrders;