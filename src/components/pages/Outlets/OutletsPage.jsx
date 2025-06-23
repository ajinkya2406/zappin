import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function OutletsPage() {
  const [pincodeList, setPincodeList] = useState([
    { location: 'Hadapsar', pincode: '411028' },
    { location: 'Koregaon Park', pincode: '412110' },
    { location: 'Koregaon Park', pincode: '411027' },
    { location: 'Ravet', pincode: '411029' },
    { location: 'Ravet', pincode: '442917' },
    { location: 'Ravet', pincode: '121212' },
    { location: 'Ravet', pincode: '440255' }
  ]);

  const [selectedLocation, setSelectedLocation] = useState('');
  const [newPincode, setNewPincode] = useState('');

  const addPincode = () => {
    if (selectedLocation && newPincode) {
      setPincodeList([
        ...pincodeList,
        { location: selectedLocation, pincode: newPincode }
      ]);
      setNewPincode('');
    }
  };

  const deletePincode = (index) => {
    const updatedList = [...pincodeList];
    updatedList.splice(index, 1);
    setPincodeList(updatedList);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Left Form */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Assign Pincode to Outlet
            </Typography>

            <TextField
              select
              label="Select Outlet Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="">-- Select --</MenuItem>
              <MenuItem value="Hadapsar">Hadapsar</MenuItem>
              <MenuItem value="Koregaon Park">Koregaon Park</MenuItem>
              <MenuItem value="Ravet">Ravet</MenuItem>
            </TextField>

            <TextField
              label="Assign Delivery Pincode"
              value={newPincode}
              onChange={(e) => setNewPincode(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={addPincode}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Paper>
        </Grid>

        {/* Right Table */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              List of Pincodes
            </Typography>

            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f57c00' }}>
                  <TableCell sx={{ color: '#fff' }}>Outlet Location</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Assigned Pincode</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pincodeList.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.location}</TableCell>
                    <TableCell>{entry.pincode}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => deletePincode(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OutletsPage;
