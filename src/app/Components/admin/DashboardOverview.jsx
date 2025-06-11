'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Users, Package, TrendingUp } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa';

const fetchDashboardStats = async () => {
  const token = localStorage.getItem('authToken');
  const url = "https://favorite-server-0.onrender.com";
  const res = await axios.get(`${url}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const DashboardOverview = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) return <div>Loading stats...</div>;
  if (error) return <div>Failed to load stats.</div>;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Total Users</p>
          <Users className="h-5 w-5 text-blue-500" />
        </div>
        <p className="mt-2 text-3xl font-bold">{stats.totalUsers}</p>
      </div>
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Total Products</p>
          <Package className="h-5 w-5 text-blue-500" />
        </div>
        <p className="mt-2 text-3xl font-bold">{stats.totalProducts}</p>
      </div>
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">New Users (Last 30d)</p>
          <TrendingUp className="h-5 w-5 text-blue-500" />
        </div>
        <p className="mt-2 text-3xl font-bold">{stats.userGrowthLast30Days}</p>
      </div>
    </div>
  );
};