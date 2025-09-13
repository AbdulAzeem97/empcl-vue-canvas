import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Database, 
  Package, 
  Factory, 
  ShoppingCart, 
  Wrench, 
  FileText 
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Database, label: "Master Data", path: "/master-data" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: Factory, label: "Production", path: "/production" },
  { icon: ShoppingCart, label: "Purchase Orders", path: "/purchase-orders" },
  { icon: Wrench, label: "Work Orders", path: "/work-orders" },
  { icon: FileText, label: "Reports", path: "/reports" },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="h-full bg-sidebar text-sidebar-foreground w-64 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-sidebar-muted/20">
        <h1 className="text-xl font-bold">EMPCL ERP</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-muted/20 hover:text-sidebar-foreground"
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};