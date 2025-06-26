import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import LoginPage from './components/pages/Auth/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DashboardPage from './components/pages/Dashboard/DashboardPage.jsx';
import CategoriesPage from './components/pages/Categories/CategoriesPage.jsx';
import SubCategoriesPage from './components/pages/SubCategories/SubCategoriesPage.jsx';
import ViewProductsPage from './components/pages/Products/ViewProductsPage.jsx';
import AddProductPage from './components/pages/Products/AddProductPage.jsx';
import OutletsPage from './components/pages/Outlets/OutletsPage.jsx';
import OffersPage from './components/pages/Offers/OffersPage.jsx';
import AddUserPage from './components/pages/Users/AddUserPage.jsx';
import CustomersPage from './components/pages/Users/CustomersPage.jsx';
import DeliveryBoysPage from './components/pages/Users/DeliveryBoysPage.jsx';
import SectionsPage from './components/pages/Sections/SectionsPage.jsx';
import ContentsPage from './components/pages/Contents/ContentsPage.jsx';
import ExpensesPage from './components/pages/Expenses/ExpensesPage.jsx';
import SettingsPage from './components/pages/Settings/SettingsPage.jsx';
import AddExpensePage from './components/pages/Expenses/AddExpensePage.jsx';

// Order Pages
import PendingOrdersPage from './components/pages/Orders/PendingOrdersPage.jsx';
import PreparingFoodPage from './components/pages/Orders/PreparingFoodPage.jsx';
import DeliveryOnWayPage from './components/pages/Orders/DeliveryOnWayPage.jsx';
import DeliveredOrdersPage from './components/pages/Orders/DeliveredOrdersPage.jsx';
import OrderAcceptedPage from './components/pages/Orders/OrderAcceptedPage.jsx';
import OrderRejectedPage from './components/pages/Orders/OrderRejectedPage.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B00',
    },
    secondary: {
      main: '#17B2BA',
    },
  },
});

const PrivateApp = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleToggleSidebar = () => setSidebarCollapsed(prev => !prev);
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar collapsed={sidebarCollapsed} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/subcategories" element={<SubCategoriesPage />} />
          <Route path="/products" element={<ViewProductsPage />} />
          <Route path="/products/add" element={<AddProductPage />} />
          <Route path="/products/edit/:id" element={<AddProductPage />} />
          <Route path="/outlets" element={<OutletsPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/orders/pending" element={<PendingOrdersPage />} />
          <Route path="/orders/accepted" element={<OrderAcceptedPage />} />
          <Route path="/orders/rejected" element={<OrderRejectedPage />} />
          <Route path="/orders/preparing" element={<PreparingFoodPage />} />
          <Route path="/orders/on-the-way" element={<DeliveryOnWayPage />} />
          <Route path="/orders/delivered" element={<DeliveredOrdersPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/customers" element={<CustomersPage />} />
          <Route path="/users/delivery-boys" element={<DeliveryBoysPage />} />
          <Route path="/sections" element={<SectionsPage />} />
          <Route path="/contents" element={<ContentsPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/expenses/add" element={<AddExpensePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<PrivateApp />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App; 