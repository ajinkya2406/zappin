import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Fade } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

function DeliveryBoysPage() {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewUser, setViewUser] = useState(null);

  const fetchDeliveryBoys = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users?role=Delivery Boy');
      const data = await res.json();
      setDeliveryBoys(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch delivery boys');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDeliveryBoys(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      setDeliveryBoys((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)', minHeight: '100vh' }}>
      <Fade in={true} timeout={700}>
        <Paper sx={{ p: 3, boxShadow: 6, borderRadius: 4, background: 'rgba(255,255,255,0.97)' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5', fontWeight: 700, textAlign: 'center', mb: 3, letterSpacing: 1 }}>
            List Of Delivery Boys
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Table sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Fullname</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Mobile</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>View</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>
              ) : deliveryBoys.length === 0 ? (
                <TableRow><TableCell colSpan={5}>No delivery boys found</TableCell></TableRow>
              ) : deliveryBoys.map((user, idx) => (
                <Fade in={true} timeout={400 + idx * 60} key={user._id}>
                  <TableRow hover sx={{ transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3, background: '#e3f2fd' } }}>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <IconButton color="success" onClick={() => setViewUser(user)}><VisibilityIcon /></IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(user._id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                </Fade>
              ))}
            </TableBody>
          </Table>
          <Dialog open={!!viewUser} onClose={() => setViewUser(null)}>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
              {viewUser && (
                <Box>
                  <Typography><b>Full Name:</b> {viewUser.fullName}</Typography>
                  <Typography><b>Mobile:</b> {viewUser.mobile}</Typography>
                  <Typography><b>Email:</b> {viewUser.email}</Typography>
                  <Typography><b>Status:</b> {viewUser.status}</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewUser(null)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Fade>
    </Box>
  );
}

export default DeliveryBoysPage; 