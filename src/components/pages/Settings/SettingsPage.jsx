import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Alert } from '@mui/material';
import { settingsService } from '../../../services/api';

function SettingsPage() {
  const [form, setForm] = useState({
    username: '',
    firmName: '',
    firmMobile: '',
    firmEmail: '',
    firmAddress: '',
    oldPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data } = await settingsService.getSettings();
        setForm(prev => ({ ...prev, ...data }));
      } catch (err) {
        setError('Failed to load settings.');
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await settingsService.updateSettings(form);
      setSuccess('Settings updated successfully!');
      setForm(prev => ({ ...prev, oldPassword: '', newPassword: '' }));
    } catch (err) {
      setError('Failed to update settings.');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Settings
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Typography>Firm Name</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth name="firmName" value={form.firmName} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography>Firm Mobile</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth name="firmMobile" value={form.firmMobile} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography>Firm Email</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth name="firmEmail" value={form.firmEmail} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography>Firm Address</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth name="firmAddress" value={form.firmAddress} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}><Typography variant="h6" sx={{ mt: 2 }}>Change Credentials</Typography></Grid>
            <Grid item xs={12} sm={3}><Typography>Username</Typography></Grid>
            <Grid item xs={12} sm={9}><TextField fullWidth name="username" value={form.username} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={3}><Typography>Old Password</Typography></Grid>
            <Grid item xs={12} sm={9}><TextField fullWidth type="password" name="oldPassword" value={form.oldPassword} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={3}><Typography>New Password</Typography></Grid>
            <Grid item xs={12} sm={9}><TextField fullWidth type="password" name="newPassword" value={form.newPassword} onChange={handleChange} /></Grid>

            <Grid item xs={12} sm={9} sx={{ mt: 2, ml: 'auto' }}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
              <Button type="submit" variant="contained" sx={{ background: '#ff6b00', fontWeight: 700 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default SettingsPage; 