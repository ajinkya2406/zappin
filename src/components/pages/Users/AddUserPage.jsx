import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Alert, Fade } from '@mui/material';

const initialState = {
  role: 'Customer',
  fullName: '',
  mobile: '',
  email: '',
  flat: '',
  building: '',
  street: '',
  landmark: '',
  pincode: '',
  adhar: '',
  adharFile: null,
  passportPhoto: null,
  status: 'Active',
};

function AddUserPage() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClear = () => setForm(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');
    setShowSuccess(false);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        setSuccess('User successfully submitted!');
        setShowSuccess(true);
        handleClear();
      } else {
        const result = await res.json();
        setError(result.error || 'Failed to submit user.');
      }
    } catch (err) {
      setError('Failed to submit user.');
    } finally {
      setSubmitting(false);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)', minHeight: '100vh' }}>
      <Fade in={true} timeout={700}>
        <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto', boxShadow: 6, borderRadius: 4, background: 'rgba(255,255,255,0.95)' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5', fontWeight: 700, textAlign: 'center', mb: 3, letterSpacing: 1 }}>
            Add New User
          </Typography>
          {success && <Fade in={showSuccess}><Alert severity="success" sx={{ mb: 2, fontWeight: 600, fontSize: 16 }}>{success}</Alert></Fade>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" sx={{ mt: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <InputLabel>Select Role</InputLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <FormControl fullWidth>
                  <Select name="role" value={form.role} onChange={handleChange}>
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Delivery Boy">Delivery Boy</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}><InputLabel>Full Name</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="fullName" value={form.fullName} onChange={handleChange} fullWidth placeholder="Enter full name" sx={{ bgcolor: '#f3f6fd', borderRadius: 2 }} /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Mobile Number</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="mobile" value={form.mobile} onChange={handleChange} fullWidth placeholder="Enter Mobile Number" /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Email</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="email" value={form.email} onChange={handleChange} fullWidth placeholder="Enter email address" /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Flat No./Bungalow No.</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="flat" value={form.flat} onChange={handleChange} fullWidth placeholder="Enter Flat No./Bungalow No." /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Building Name</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="building" value={form.building} onChange={handleChange} fullWidth placeholder="Enter Building Name" /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Street Name/Lane No.</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="street" value={form.street} onChange={handleChange} fullWidth placeholder="Enter Street Name/Lane No." /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Landmark</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="landmark" value={form.landmark} onChange={handleChange} fullWidth placeholder="Enter Landmark" /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Pincode</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="pincode" value={form.pincode} onChange={handleChange} fullWidth placeholder="Enter Pincode" /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Adhar Number</InputLabel></Grid>
              <Grid item xs={12} sm={9}><TextField name="adhar" value={form.adhar} onChange={handleChange} fullWidth placeholder="Enter Adhar Number" /></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Adhar Card copy</InputLabel></Grid>
              <Grid item xs={12} sm={9}><Button variant="outlined" component="label" fullWidth>Choose File<input type="file" name="adharFile" hidden onChange={handleChange} /></Button></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Passport Size Photo</InputLabel></Grid>
              <Grid item xs={12} sm={9}><Button variant="outlined" component="label" fullWidth>Choose File<input type="file" name="passportPhoto" hidden onChange={handleChange} /></Button></Grid>
              <Grid item xs={12} sm={3}><InputLabel>Active Status</InputLabel></Grid>
              <Grid item xs={12} sm={9}>
                <FormControl fullWidth>
                  <Select name="status" value={form.status} onChange={handleChange}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="caption" color="textSecondary">Note: If user is inactive, user cant login to app</Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary" sx={{ mr: 2, px: 4, py: 1.5, fontWeight: 600, fontSize: 16, borderRadius: 3, boxShadow: 3, transition: 'transform 0.2s', '&:active': { transform: 'scale(0.97)' } }} disabled={submitting}>Submit</Button>
                <Button type="button" variant="contained" color="secondary" onClick={handleClear} disabled={submitting} sx={{ px: 4, py: 1.5, fontWeight: 600, fontSize: 16, borderRadius: 3, boxShadow: 3, transition: 'transform 0.2s', '&:active': { transform: 'scale(0.97)' } }}>Clear</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

export default AddUserPage; 