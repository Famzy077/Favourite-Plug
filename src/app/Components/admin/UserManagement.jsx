'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const url = "https://favorite-server-0.onrender.com";
const fetchUsers = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${url}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.data;
};

const UserManagement = () => {
    const queryClient = useQueryClient();
    const { data: users, isLoading, error } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
    
    const toggleBlockMutation = useMutation({
        mutationFn: (userId) => {
            const token = localStorage.getItem('authToken');
            return axios.put(`${url}/api/admin/users/${userId}/toggle-block`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && <TableRow><TableCell colSpan="4">Loading users...</TableCell></TableRow>}
                    {error && <TableRow><TableCell colSpan="4" className="text-red-500">Failed to load users</TableCell></TableRow>}
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={user.isBlocked ? 'destructive' : 'outline'}>
                                    {user.isBlocked ? 'Blocked' : 'Active'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => toggleBlockMutation.mutate(user.id)}
                                >
                                    {user.isBlocked ? 'Unblock' : 'Block'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
export default UserManagement