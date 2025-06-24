import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Fade } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function OutletsPage() {
  // Outlet Locations
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');
  // Pincode Assignments
  const [assignments, setAssignments] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [pincode, setPincode] = useState('');
  // UI
  const [loading, setLoading] = useState(false);

  // Fetch locations and assignments
  const fetchLocations = async () => {
    const res = await fetch('/api/outlets/locations');
    setLocations(await res.json());
  };
  const fetchAssignments = async () => {
    const res = await fetch('/api/outlets/pincodes');
    setAssignments(await res.json());
  };
  useEffect(() => {
    fetchLocations();
    fetchAssignments();
  }, []);

  // Add new location
  const handleAddLocation = async (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;
    setLoading(true);
    await fetch('/api/outlets/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newLocation })
    });
    setNewLocation('');
    fetchLocations();
    setLoading(false);
  };

  // Assign pincode
  const handleAssignPincode = async (e) => {
    e.preventDefault();
    if (!selectedOutlet || !pincode.trim()) return;
    setLoading(true);
    await fetch('/api/outlets/pincodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ outlet: selectedOutlet, pincode })
    });
    setSelectedOutlet('');
    setPincode('');
    fetchAssignments();
    setLoading(false);
  };

  // Delete location
  const handleDeleteLocation = async (id) => {
    if (!window.confirm('Delete this location?')) return;
    await fetch(`/api/outlets/locations/${id}`, { method: 'DELETE' });
    fetchLocations();
  };

  // Delete pincode assignment
  const handleDeleteAssignment = async (id) => {
    if (!window.confirm('Delete this pincode assignment?')) return;
    await fetch(`/api/outlets/pincodes/${id}`, { method: 'DELETE' });
    fetchAssignments();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: '#f4f6fa', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Fade in={true} timeout={700}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#3f51b5', mb: 2 }}>Add Outlet Location</Typography>
              <form onSubmit={handleAddLocation}>
                <TextField
                  label="Outlet Location Name"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  fullWidth
                  sx={{ mb: 2, bgcolor: '#f3f6fd', borderRadius: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ fontWeight: 600, py: 1.2, borderRadius: 2 }}>Add Location</Button>
              </form>
            </Paper>
          </Fade>
          <Fade in={true} timeout={900}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 4, mt: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#3f51b5', mb: 2 }}>Assign Pincode to Outlet</Typography>
              <form onSubmit={handleAssignPincode}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Outlet Location</InputLabel>
                  <Select
                    value={selectedOutlet}
                    onChange={e => setSelectedOutlet(e.target.value)}
                    label="Outlet Location"
                  >
                    <MenuItem value="">-- Select Outlet Location --</MenuItem>
                    {locations.map(loc => (
                      <MenuItem key={loc._id} value={loc._id}>{loc.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Assign Delivery Pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  fullWidth
                  sx={{ mb: 2, bgcolor: '#f3f6fd', borderRadius: 2 }}
                />
                <Button type="submit" variant="contained" color="warning" fullWidth disabled={loading} sx={{ fontWeight: 600, py: 1.2, borderRadius: 2 }}>Submit</Button>
              </form>
            </Paper>
          </Fade>
        </Grid>
        <Grid item xs={12} md={8}>
          <Fade in={true} timeout={1000}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#3f51b5', mb: 2 }}>List of Pincodes</Typography>
              <Table sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
                <TableHead>
                  <TableRow sx={{ background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)' }}>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Outlet Location</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Assigned Pincode</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.length === 0 ? (
                    <TableRow><TableCell colSpan={3}>No assignments found</TableCell></TableRow>
                  ) : assignments.map((row, idx) => (
                    <Fade in={true} timeout={400 + idx * 60} key={row._id}>
                      <TableRow hover sx={{ transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3, background: '#e3f2fd' } }}>
                        <TableCell>{row.outlet?.name || ''}</TableCell>
                        <TableCell>{row.pincode}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => handleDeleteAssignment(row._id)}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OutletsPage; 