import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Select, MenuItem, IconButton, Tooltip, CircularProgress, Alert, Modal, Grid, TableContainer } from '@mui/material';
import { productService } from '../../../services/api';
import { Edit, Delete, AddAPhoto, Visibility } from '@mui/icons-material';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:5000';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ViewProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        setProducts(products.filter((p) => p._id !== productId));
      } catch (err) {
        setError('Failed to delete product.');
        console.error(err);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Box sx={{ p: 3, background: '#f4f6f8', minHeight: '100vh' }}>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedProduct && (
            <>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                {selectedProduct.productName}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}><Typography variant="body1"><strong>Category:</strong></Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{selectedProduct.category?.name}</Typography></Grid>
                
                <Grid item xs={6}><Typography variant="body1"><strong>Sub-Category:</strong></Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{selectedProduct.subCategory?.name}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1"><strong>Price:</strong></Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">₹{selectedProduct.displayPrice}</Typography></Grid>
                
                <Grid item xs={6}><Typography variant="body1"><strong>Striked Price:</strong></Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">₹{selectedProduct.strikedPrice}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1"><strong>Product Code:</strong></Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{selectedProduct.productCode}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1"><strong>Type:</strong></Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{selectedProduct.productType}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1"><strong>Recommended:</strong></Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{selectedProduct.recommended}</Typography></Grid>

                <Grid item xs={12}><Typography variant="body1"><strong>Description:</strong> {selectedProduct.productDescription}</Typography></Grid>
              </Grid>
              <Button onClick={handleClose} sx={{ mt: 2 }} variant="outlined">Close</Button>
            </>
          )}
        </Box>
      </Modal>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 12px 0 rgba(0,0,0,0.08)' }}>
          <Typography variant="h4" gutterBottom fontWeight={700} sx={{ color: '#232b7c' }}>
            List of Products
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: '#555' }}>Show</Typography>
              <Select size="small" defaultValue={10} sx={{ '.MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' } }}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              <Typography sx={{ color: '#555' }}>entries</Typography>
            </Box>
            <Box>
              <TextField size="small" label="Search" variant="outlined" sx={{ '.MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' } }} />
            </Box>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, mt: 2, overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: 'linear-gradient(90deg, #232b7c 0%, #2196f3 100%)', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold', border: 'none', py: 2 } }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Offer</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Recommended?</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                  {products.map((product, index) => (
                    <motion.tr key={product._id} variants={itemVariants} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white', '&:hover': { background: '#f0f0f0' } }}>
                      <TableCell sx={{ border: 'none' }}>{index + 1}</TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <img src={`${API_URL}/${product.image}`} alt={product.productName} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                      </TableCell>
                      <TableCell sx={{ border: 'none', fontWeight: 500 }}>{product.category?.name}<br /><Typography variant="caption">{product.subCategory?.name}</Typography></TableCell>
                      <TableCell sx={{ border: 'none', fontWeight: 500 }}>{product.productName}</TableCell>
                      <TableCell sx={{ border: 'none' }}>{product.offerAvailable || 'NO OFFER'}</TableCell>
                      <TableCell sx={{ border: 'none', fontWeight: 600, color: '#232b7c' }}>₹{product.displayPrice}/-</TableCell>
                      <TableCell sx={{ border: 'none' }}>{product.recommended}</TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <Tooltip title="View">
                          <IconButton size="small" sx={{ color: '#ff6b00' }} onClick={() => handleOpen(product)}>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" color="success" onClick={() => navigate(`/products/edit/${product._id}`)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Photos">
                          <IconButton size="small" color="primary"><AddAPhoto /></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error" onClick={() => handleDelete(product._id)}><Delete /></IconButton>
                        </Tooltip>
                      </TableCell>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}

export default ViewProductsPage; 