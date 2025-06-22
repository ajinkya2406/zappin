import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  TextField,
  Pagination,
  Stack
} from '@mui/material';

function DeliveryOnWayPage() {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      
      {/* Heading Section */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Delivery on the way
        </Typography>
        

        {/* Export + Search (Same Row) */}
        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small">Copy</Button>
            <Button variant="outlined" size="small">Excel</Button>
            <Button variant="outlined" size="small">CSV</Button>
            <Button variant="outlined" size="small">PDF</Button>
          </Stack>

          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ minWidth: '200px' }}
          />
        </Box>
      </Paper>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f15a29' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Order Number</TableCell>
              <TableCell sx={{ color: 'white' }}>Amount</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Items</TableCell>
              <TableCell sx={{ color: 'white' }}>Customer Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Delivery Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Delivery Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Delivery Boy</TableCell>
              <TableCell sx={{ color: 'white' }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sample Row */}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Select size="small" fullWidth defaultValue="">
                  <MenuItem value="">Delivery on the way</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select size="small" fullWidth defaultValue="">
                  <MenuItem value="">--Select--</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="success" size="small">
                  Invoice
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2">Showing 1 to 10 of 21 entries</Typography>
        <Pagination count={3} variant="outlined" shape="rounded" />
      </Box>
    </Box>
  );
}

export default DeliveryOnWayPage;
