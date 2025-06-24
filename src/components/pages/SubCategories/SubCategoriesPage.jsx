import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Paper, Typography, TextField, Button, Table, TableContainer,
  TableHead, TableBody, TableRow, TableCell, IconButton, Select, MenuItem,
  FormControl, InputLabel, CircularProgress, Alert, Fade
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { subCategoryService, categoryService } from '../../../services/api';

const API_URL = 'http://localhost:5000';

function SubCategoriesPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: '', image: null });
  const [editMode, setEditMode] = useState(false);
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subCategoriesRes, categoriesRes] = await Promise.all([
        subCategoryService.getSubCategories(),
        categoryService.getAllCategories(),
      ]);
      setSubCategories(subCategoriesRes.data);
      setCategories(categoriesRes);
    } catch (err) {
      setError('Failed to fetch data.');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', image: null });
    setEditMode(false);
    setCurrentSubCategoryId(null);
    setError('');
    setSuccess('');
    document.getElementById('sub-category-image-input').value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.name.trim() || !formData.category) {
      setError('Please fill out all required fields.');
      return;
    }
    const data = new FormData();
    data.append('name', formData.name.trim());
    data.append('category', formData.category);
    if (formData.image) data.append('image', formData.image);
    setLoading(true);
    try {
      if (editMode) {
        await subCategoryService.updateSubCategory(currentSubCategoryId, data);
        setSuccess('Sub-category updated successfully!');
      } else {
        if (!formData.image) {
          setError('Image is required for new sub-categories.');
          setLoading(false);
          return;
        }
        await subCategoryService.createSubCategory(data);
        setSuccess('Sub-category created successfully!');
      }
      await fetchData();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save sub-category.');
    }
    setLoading(false);
  };

  const handleEdit = (sub) => {
    setEditMode(true);
    setCurrentSubCategoryId(sub._id);
    setFormData({ name: sub.name, category: sub.category._id, image: null });
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sub-category?')) {
      setLoading(true);
      setError('');
      try {
        await subCategoryService.deleteSubCategory(id);
        setSuccess('Sub-category deleted successfully!');
        await fetchData();
      } catch (err) {
        setError('Failed to delete sub-category.');
      }
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f4f6f8', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#232b7c', mb: 2 }}>Add Sub-Category</Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>-- Select Category --</InputLabel>
                <Select name="category" value={formData.category} onChange={handleInputChange} label="-- Select Category --">
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField name="name" fullWidth label="Enter Sub-Category Name" value={formData.name} onChange={handleInputChange} sx={{ mb: 2, bgcolor: '#f3f6fd', borderRadius: 2 }} />
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Sub-Category Image</Typography>
              <input id="sub-category-image-input" type="file" onChange={handleFileChange} style={{ display: 'block', marginBottom: '16px' }} />
              <Button type="submit" variant="contained" fullWidth size="large" sx={{ background: '#ff6b00', fontWeight: 700, borderRadius: 2, boxShadow: 1, '&:hover': { background: '#ff8800' } }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : (editMode ? 'Update' : 'Submit')}
              </Button>
              {editMode && (
                <Button onClick={resetForm} variant="outlined" fullWidth size="large" sx={{ mt: 1, borderRadius: 2 }} disabled={loading}>
                  Cancel
                </Button>
              )}
            </form>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#232b7c', mb: 2 }}>List of Sub-Categories</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 12px 0 rgba(0,0,0,0.08)' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{
                    background: 'linear-gradient(90deg, #232b7c 0%, #2196f3 100%)',
                    '& .MuiTableCell-root': {
                      color: 'white',
                      fontWeight: 'bold',
                      border: 'none',
                      py: 2,
                    }
                  }}>
                    <TableCell>Image</TableCell>
                    <TableCell>Sub-Category Name</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={4} align="center"><CircularProgress /></TableCell></TableRow>
                  ) : (
                    subCategories.map((sub, index) => (
                      <Fade in={true} timeout={300 * (index + 1)} key={sub._id}>
                        <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>
                            <img src={`${API_URL}/${sub.image}`} alt={sub.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '8px' }}/>
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{sub.name}</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{sub.category?.name}</TableCell>
                          <TableCell align="center">
                            <IconButton color="success" onClick={() => handleEdit(sub)}><Edit /></IconButton>
                            <IconButton color="error" onClick={() => handleDelete(sub._id)}><Delete /></IconButton>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))
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

export default SubCategoriesPage; 