import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Avatar, Grid } from '@mui/material';
import { offerService } from '../../../services/api';
import dayjs from 'dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import { keyframes } from '@mui/system';

const initialForm = {
  code: '',
  percentage: '',
  description: '',
  expiryDate: '',
  status: 'active',
  image: null,
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

function OffersPage() {
  const [form, setForm] = useState(initialForm);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editOfferId, setEditOfferId] = useState(null);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const data = await offerService.getAllOffers();
      setOffers(data);
    } catch (err) {
      setError('Failed to fetch offers');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = () => {
    const offer = offers.find((o) => o._id === selectedOfferId);
    if (offer) {
      setForm({
        code: offer.code,
        percentage: offer.percentage,
        description: offer.description,
        expiryDate: offer.expiryDate ? offer.expiryDate.slice(0, 10) : '',
        status: offer.status,
        image: null,
      });
      setEditMode(true);
      setEditOfferId(offer._id);
    }
    handleMenuClose();
  };

  const handleCancelEdit = () => {
    setForm(initialForm);
    setEditMode(false);
    setEditOfferId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    try {
      if (editMode && editOfferId) {
        await offerService.updateOffer(editOfferId, formData);
        handleCancelEdit();
      } else {
        await offerService.createOffer(formData);
        setForm(initialForm);
      }
      fetchOffers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save offer');
    }
  };

  const handleMenuClick = (event, offerId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOfferId(offerId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOfferId(null);
  };

  const handleDelete = async () => {
    if (!selectedOfferId) return;
    try {
      await offerService.deleteOffer(selectedOfferId);
      fetchOffers();
      handleMenuClose();
    } catch (err) {
      setError('Failed to delete offer');
    }
  };

  return (
    <Box sx={{ background: '#f6f8fc', minHeight: '100vh', p: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 4, mb: 3 }}>
            <Typography variant="h5" fontWeight={700} color="#283593" gutterBottom>
              {editMode ? 'Edit Offer' : 'Add New Offer'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Enter Coupon Code"
                name="code"
                value={form.code}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  label="Enter Percentage"
                  name="percentage"
                  value={form.percentage}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  margin="normal"
                  required
                />
                <Typography>%</Typography>
              </Box>
              <TextField
                label="Enter Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Expiry Date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={form.status}
                  label="Status"
                  onChange={handleChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 1, mb: 2 }}
                fullWidth
              >
                Upload Offer Photo
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              {form.image && <Typography variant="body2">{form.image.name}</Typography>}
              {error && <Typography color="error">{error}</Typography>}
              {editMode && (
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, background: '#ff6a00', color: '#fff', fontWeight: 700, '&:hover': { background: '#ff8c1a' } }}
                disabled={loading}
              >
                {editMode ? 'UPDATE' : 'SUBMIT'}
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 4 }}>
            <Typography variant="h5" fontWeight={700} color="#283593" gutterBottom>
              List of Offers
            </Typography>
            <TableContainer
              sx={{
                borderRadius: 3,
                boxShadow: 6,
                mt: 2,
                animation: `${fadeIn} 0.7s ease`,
                background: '#fff',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ background: 'linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)' }}>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Image</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Coupon Code</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Percentage</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Description</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Expiry</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer._id}>
                      <TableCell>
                        {offer.image ? (
                          <Avatar
                            variant="rounded"
                            src={offer.image.startsWith('uploads') ? `/${offer.image}` : offer.image}
                            sx={{ width: 80, height: 60 }}
                            alt={offer.code}
                          />
                        ) : (
                          <Box sx={{ width: 80, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#eee', color: '#888', fontSize: 12 }}>
                            IMAGE NOT AVAILABLE
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>{offer.code}</TableCell>
                      <TableCell>{offer.percentage}%</TableCell>
                      <TableCell>{offer.description}</TableCell>
                      <TableCell>{offer.status}</TableCell>
                      <TableCell sx={{ color: dayjs(offer.expiryDate).isBefore(dayjs()) ? 'red' : undefined }}>
                        Expiry: {dayjs(offer.expiryDate).format('MMMM Do, YYYY')}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<MoreVertIcon />}
                          onClick={(e) => handleMenuClick(e, offer._id)}
                        >
                          Action
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && selectedOfferId === offer._id}
                          onClose={handleMenuClose}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                          <MenuItem onClick={handleEdit}>Edit Offer</MenuItem>
                          <MenuItem onClick={handleDelete}>Delete Offer</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {offers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No offers found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OffersPage; 