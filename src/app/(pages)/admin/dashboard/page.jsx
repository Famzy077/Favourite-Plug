'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductManagement } from "@/app/Components/admin/ProductManagement";
import { OrderManagement } from "@/app/Components/admin/OrderManagement";
import  UserManagement  from "../../../Components/admin/UserManagement";
import { DashboardOverview } from "../../../Components/admin/DashboardOverview";
import {
  BarChart2,
  Boxes,
  Users,
  ShoppingCart,
  Activity,
  ExternalLink,
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[80vh] max-h-fit">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="overview" className="w-full p-4">
        <TabsList className="grid w-full gap-3 max-sm:grid-cols-1 h-fit grid-cols-3 p-2 border border-zinc-300">
          <TabsTrigger className={'p-6 border border-blue-600 text-blue-600'} value="overview"> <BarChart2 className="w-4 h-4" /> Overview</TabsTrigger>
          <TabsTrigger className={'p-6 border border-blue-600 text-blue-600'} value="products"> <Boxes className="w-4 h-4" /> Manage Products</TabsTrigger>
          <TabsTrigger className={'p-6 border border-blue-600 text-blue-600'} value="orders"> <ShoppingCart className="w-4 h-4" /> Manage Orders</TabsTrigger>
          <TabsTrigger className={'p-6 border border-blue-600 text-blue-600'} value="users"> <Users className="w-4 h-4" /> Manage Users</TabsTrigger>
        </TabsList>
        <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="block mt-4 p-6 bg-green-100 border-green-300 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-green-700">View Visitor Analytics</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-800" >Open Google Analytics ↗</p>
        </a>
        
        <TabsContent value="overview" className="mt-6">
          <DashboardOverview />
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <ProductManagement />
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <OrderManagement />
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}