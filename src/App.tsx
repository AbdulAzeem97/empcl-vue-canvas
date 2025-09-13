import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MasterData from "./pages/MasterData";
import Inventory from "./pages/Inventory";
import InventoryTransactions from "./pages/InventoryTransactions";
import Production from "./pages/Production";
import PurchaseOrders from "./pages/PurchaseOrders";
import WorkOrders from "./pages/WorkOrders";
import WorkOrderDetail from "./pages/WorkOrderDetail";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/master-data" element={<MasterData />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/transactions" element={<InventoryTransactions />} />
            <Route path="/production" element={<Production />} />
            <Route path="/purchase-orders" element={<PurchaseOrders />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/work-orders/:id" element={<WorkOrderDetail />} />
            <Route path="/reports" element={<Reports />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
