import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { outletService } from '../../../services/api';
import { expenseService } from '../../../services/api';

const initialForm = {
  outlet: '',
  amount: '',
  type: '',
  date: '',
  note: '',
};

const expenseTypes = [
  'Food',
  'Utilities',
  'Maintenance',
  'Salary',
  'Other',
];

function AddExpensePage() {
  const [form, setForm] = useState(initialForm);
  const [outlets, setOutlets] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchOutlets() {
      try {
        const res = await outletService.getOutletLocations();
        setOutlets(res.data || res);
      } catch {
        setOutlets([]);
      }
    }
    fetchOutlets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm(initialForm);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await expenseService.addExpense({
        outlet: form.outlet,
        amount: form.amount,
        type: form.type,
        date: form.date,
        note: form.note,
      });
      setSuccess('Expense added successfully!');
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add expense.');
    }
  };

  return (
    <Box sx={{ background: '#f6f8fc', minHeight: '100vh', p: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 4, mb: 3 }}>
            <Typography variant="h5" fontWeight={700} color="#3f51b5" gutterBottom>
              Add Expense
            </Typography>
            <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: 3 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Outlet Location</InputLabel>
                    <Select
                      name="outlet"
                      value={form.outlet}
                      label="Outlet Location"
                      onChange={handleChange}
                    >
                      <MenuItem value="">-- Select Outlet Location --</MenuItem>
                      {outlets.map((outlet) => (
                        <MenuItem key={outlet._id} value={outlet._id}>{outlet.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    label="Expense Amount"
                    placeholder="Enter Expense Amount (only digits)"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Expense Type</InputLabel>
                    <Select
                      name="type"
                      value={form.type}
                      label="Expense Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="">-- Select Expense Type --</MenuItem>
                      {expenseTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    type="date"
                    label="Expense Date"
                    InputLabelProps={{ shrink: true }}
                    placeholder="dd-mm-yyyy"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    label="Note"
                    placeholder="Enter Note"
                    multiline
                    minRows={3}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ background: '#ff6a00', fontWeight: 700, px: 4, borderRadius: 2, boxShadow: 1, '&:hover': { background: '#ff8800' } }}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ background: '#616a6b', fontWeight: 700, px: 4, borderRadius: 2, boxShadow: 1 }}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </form>
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
            <Typography variant="h5" fontWeight={700} color="#3f51b5" gutterBottom>
              {/* Placeholder for future list or summary */}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddExpensePage; 