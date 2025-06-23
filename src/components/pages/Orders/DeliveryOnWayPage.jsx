import React from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Button, TextField } from '@mui/material';

function DeliveryOnWayPage() {
  return (
    <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Paper sx={{ p: 3, maxWidth: '100%', mx: 'auto' }}>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          Delivery on the way
        </Typography>
        {/* Table Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Button variant="outlined" sx={{ mr: 1 }}>Copy</Button>
            <Button variant="outlined" sx={{ mr: 1 }}>Excel</Button>
            <Button variant="outlined" sx={{ mr: 1 }}>CSV</Button>
            <Button variant="outlined">PDF</Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box component="form" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1">Search:</Typography>
            <TextField size="small" variant="outlined" />
          </Box>
        </Box>
        {/* Table */}
        <Box sx={{ overflowX: 'auto', borderRadius: 2, border: '1px solid #eee' }}>
          <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1976d2' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Order Number</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Amount</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Total Items</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Customer Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Delivery Address</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Delivery Status</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700, borderRight: '1px solid #fff', borderBottom: '2px solid #fff' }}>Delivery Boy</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700, borderBottom: '2px solid #fff' }}>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                  <Box>2025061810261827</Box>
                  <Typography variant="caption" color="text.secondary">18-06-2025</Typography>
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>₹ 100/-</TableCell>
                <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>1</TableCell>
                <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>Sushant Gore</TableCell>
                <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>A1/12 Samrat Garden Pune solapur road Near lohiya udyan 411028</TableCell>
                <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                  <Select size="small" value="On the way" displayEmpty>
                    <MenuItem value="On the way">On the way</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                  <Select size="small" value="" displayEmpty>
                    <MenuItem value="">-- Select --</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #eee' }}>
                  <Button variant="contained" color="primary">Invoice</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        {/* Table Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2">Showing 1 to 1 of 1 entries</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" size="small" disabled>Previous</Button>
            <TextField size="small" value="1" sx={{ width: 40, mx: 1 }} inputProps={{ readOnly: true, style: { textAlign: 'center' } }} />
            <Button variant="outlined" size="small">Next</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default DeliveryOnWayPage; 