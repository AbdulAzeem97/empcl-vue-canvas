import React from "react";

const Production: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Production</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and manage production processes and schedules
        </p>
      </div>
      
      <div className="card-enterprise p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          Production management features will be available in the next update.
        </p>
      </div>
    </div>
  );
};

export default Production;