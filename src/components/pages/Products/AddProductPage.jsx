import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import { categoryService, subCategoryService, outletService, productService, offerService } from '../../../services/api';

function AddProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: '',
    subCategory: '',
    productType: 'VEG',
    productName: '',
    productCode: '',
    strikedPrice: '',
    displayPrice: '',
    availableInOutlet: '',
    productSequence: '',
    productDescription: '',
    offerAvailable: '',
    recommended: 'Yes',
    addLink: '',
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const cats = await categoryService.getAllCategories();
      setCategories(cats);
      const subs = await subCategoryService.getSubCategories();
      setSubCategories(subs.data || subs);
      const outletRes = await outletService.getOutletLocations();
      setOutlets(outletRes.data || outletRes);
      const offersData = await offerService.getAllOffers();
      setOffers(offersData.filter(o => o.status === 'active'));
    }

    if (id) {
      setIsEditMode(true);
      productService.getProductById(id)
        .then(data => {
          setForm({
            category: data.category || '',
            subCategory: data.subCategory || '',
            productType: data.productType || 'VEG',
            productName: data.productName || '',
            productCode: data.productCode || '',
            strikedPrice: data.strikedPrice || '',
            displayPrice: data.displayPrice || '',
            availableInOutlet: data.availableInOutlet || '',
            productSequence: data.productSequence || '',
            productDescription: data.productDescription || '',
            offerAvailable: data.offerAvailable || '',
            recommended: data.recommended || 'Yes',
            addLink: data.addLink || '',
          });
        })
        .catch(err => setError('Failed to fetch product details.'));
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'category') {
      setForm((prev) => ({ ...prev, subCategory: '' }));
    }
  };

  // Filter subcategories by selected category
  const filteredSubCategories = form.category
    ? subCategories.filter((sub) => {
        if (sub.category && typeof sub.category === 'object') {
          return sub.category._id === form.category;
        }
        return sub.category === form.category;
      })
    : subCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      if (isEditMode) {
        await productService.updateProduct(id, form);
        setSuccess('Product updated successfully!');
        setTimeout(() => navigate('/products'), 1500);
      } else {
        await productService.createProduct(form);
        setSuccess('Product added successfully!');
        // Reset form if needed
        setForm({
          category: '',
          subCategory: '',
          productType: 'VEG',
          productName: '',
          productCode: '',
          strikedPrice: '',
          displayPrice: '',
          availableInOutlet: '',
          productSequence: '',
          productDescription: '',
          offerAvailable: '',
          recommended: 'Yes',
          addLink: '',
        });
      }
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'add'} product.`);
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {isEditMode ? 'Edit Product' : 'Add Product'}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={form.category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value="">-- Select Category --</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sub-Category</InputLabel>
                <Select
                  name="subCategory"
                  value={form.subCategory}
                  label="Sub-Category"
                  onChange={handleChange}
                >
                  <MenuItem value="">-- Select Sub-Category --</MenuItem>
                  {filteredSubCategories.map((sub) => (
                    <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Type"
                name="productType"
                value={form.productType}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Name"
                name="productName"
                value={form.productName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Code"
                name="productCode"
                value={form.productCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Striked Price (Rs.)"
                name="strikedPrice"
                value={form.strikedPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Display Price (Rs.)"
                name="displayPrice"
                value={form.displayPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Available in Outlet</InputLabel>
                <Select
                  name="availableInOutlet"
                  value={form.availableInOutlet}
                  label="Available in Outlet"
                  onChange={handleChange}
                >
                  <MenuItem value="">-- Select Outlet --</MenuItem>
                  {outlets.map((outlet) => (
                    <MenuItem key={outlet._id} value={outlet._id}>{outlet.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Sequence"
                name="productSequence"
                value={form.productSequence}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Description"
                name="productDescription"
                value={form.productDescription}
                onChange={handleChange}
                multiline
                minRows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Offer Available</InputLabel>
                <Select
                  name="offerAvailable"
                  value={form.offerAvailable}
                  label="Offer Available"
                  onChange={handleChange}
                >
                  <MenuItem value="">-- No Offer --</MenuItem>
                  {offers.map((offer) => (
                    <MenuItem key={offer._id} value={offer.code}>{offer.code} ({offer.percentage}%)</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Recommended?</InputLabel>
                <Select
                  name="recommended"
                  value={form.recommended}
                  label="Recommended?"
                  onChange={handleChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Add Link"
                name="addLink"
                value={form.addLink}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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

export default AddProductPage; 