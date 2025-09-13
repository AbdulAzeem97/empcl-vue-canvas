import React from "react";

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-2">
          Generate comprehensive reports and analytics
        </p>
      </div>
      
      <div className="card-enterprise p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          Reporting and analytics features will be available in the next update.
        </p>
      </div>
    </div>
  );
};

export default Reports;