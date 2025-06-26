import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Grid } from '@mui/material';
import { expenseService } from '../../../services/api';
import { outletService } from '../../../services/api';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB');
}

function formatAmount(amount) {
  return `₹ ${amount}/-`;
}

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const data = await expenseService.getExpenses();
    setExpenses(data);
    setFiltered(data);
  };

  const handleDelete = async (id) => {
    // Optionally add a delete endpoint in backend and here
    // For now, just filter out
    setExpenses((prev) => prev.filter((e) => e._id !== id));
    setFiltered((prev) => prev.filter((e) => e._id !== id));
    // TODO: Call backend to delete
  };

  const handleFilter = () => {
    let filteredData = [...expenses];
    if (fromDate) filteredData = filteredData.filter(e => new Date(e.date) >= new Date(fromDate));
    if (toDate) filteredData = filteredData.filter(e => new Date(e.date) <= new Date(toDate));
    if (search) {
      const s = search.toLowerCase();
      filteredData = filteredData.filter(e =>
        (e.type && e.type.toLowerCase().includes(s)) ||
        (e.note && e.note.toLowerCase().includes(s)) ||
        (e.outlet && e.outlet.name && e.outlet.name.toLowerCase().includes(s))
      );
    }
    setFiltered(filteredData);
  };

  const totalExpense = filtered.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <Box sx={{ background: '#f6f8fc', minHeight: '100vh', p: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        List Of Expenses
      </Typography>
      <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              InputLabelProps={{ shrink: true }}
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="To Date"
              InputLabelProps={{ shrink: true }}
              value={toDate}
              onChange={e => setToDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              sx={{ background: '#ff6a00', fontWeight: 700, px: 4, borderRadius: 2, boxShadow: 1, '&:hover': { background: '#ff8800' } }}
              onClick={handleFilter}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyUp={e => { if (e.key === 'Enter') handleFilter(); }}
            />
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#ff6a00' }}>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Expense Date</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Expense Amount</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Expense Type</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Expense Note</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Outlet</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((e, idx) => (
              <TableRow key={e._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{formatDate(e.date)}</TableCell>
                <TableCell>{formatAmount(e.amount)}</TableCell>
                <TableCell>{e.type}</TableCell>
                <TableCell>{e.note}</TableCell>
                <TableCell>{e.outlet && e.outlet.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: 700 }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{formatAmount(totalExpense)}</TableCell>
              <TableCell colSpan={4} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ExpensesPage; 