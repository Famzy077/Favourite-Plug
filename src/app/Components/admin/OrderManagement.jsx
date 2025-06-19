/*
* =================================================================
* STEP 1: CREATE THE NEW ORDER MANAGEMENT COMPONENT
* =================================================================
* Create a new file at: app/components/admin/OrderManagement.jsx
*/

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from 'react-hot-toast';

const API_URL = "https://favorite-server-0.onrender.com";

// --- Data Fetching Function ---
const fetchAllOrders = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.data;
};

// --- Main Order Management Component ---
export const OrderManagement = () => {
    const queryClient = useQueryClient();

    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['adminOrders'],
        queryFn: fetchAllOrders,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ orderId, status }) => {
            const token = localStorage.getItem('authToken');
            return axios.put(`${API_URL}/api/orders/${orderId}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
            toast.success("Order status updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update status.");
        }
    });

    const handleStatusChange = (orderId, newStatus) => {
        updateStatusMutation.mutate({ orderId, status: newStatus });
    };
    
    // Function to determine the color of the status badge
    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'PENDING':
                return 'default'; // Blue/Default
            case 'SHIPPED':
                return 'secondary'; // Gray/Secondary
            case 'DELIVERED':
                return 'outline'; // Or you can create a 'success' variant
            case 'CANCELLED':
                return 'destructive'; // Red
            default:
                return 'outline';
        }
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-[60vh]'>
                <FaSpinner size={32} className="animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Failed to load orders.</div>;
    }

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-mono text-xs">#{order.id.slice(-8)}</TableCell>
                            <TableCell className="font-medium">{order.customerName}</TableCell>
                            <TableCell>₦{order.totalAmount.toLocaleString()}</TableCell>
                            <TableCell>
                                {/* --- THE FIX IS HERE --- */}
                                {/* We add a safety check `?.` before calling .replace() */}
                                {/* This prevents the crash if paymentMethod is null or undefined */}
                                <Badge variant="outline">{order.paymentMethod?.replace('_', ' ') || 'N/A'}</Badge>
                            </TableCell>
                            <TableCell>
                                <Select
                                    defaultValue={order.status}
                                    onValueChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                                >
                                    <SelectTrigger className={`w-[120px] focus:ring-0 ${
                                        order.status === 'PENDING' ? 'bg-yellow-100 border-yellow-400' :
                                        order.status === 'SHIPPED' ? 'bg-blue-100 border-blue-400' :
                                        order.status === 'DELIVERED' ? 'bg-green-100 border-green-400' :
                                        'bg-red-100 border-red-400'
                                    }`}>
                                        <SelectValue placeholder="Set status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
