import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-background"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
            3
          </span>
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
            <User size={18} className="text-primary-foreground" />
          </div>
          <div className="text-sm">
            <div className="font-medium">Admin User</div>
            <div className="text-muted-foreground">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
};