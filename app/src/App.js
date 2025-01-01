import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as Views from './views';
import { AuthProvider } from './components/AuthContext';
import { AppNavbar, Footer, Logout, PublicRoute, AuthRequired, RequireData, RoleVerificationRequired, AgeVerificationModal } from './components';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
          </header>
          <div className="App-body">
            <div className="d-flex flex-column" style={{ width: "100vw", height: "100vh" }}>
              <AppNavbar />
              <Routes>
                <Route element={<PublicRoute />} >
                  <Route path="/register" element={<Views.Register />} exact />
                  <Route path="/login" element={<Views.Login />} exact />
                  <Route path="/forgot-password" element={<Views.ForgotPassword />} />
                  <Route path="/verify-email/:token" element={<Views.EmailVerification />} />
                  <Route path="/" element={<Views.AboutUs />} />
                </Route>
                <Route element={<AuthRequired />} >
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/user/home" element={<Views.Home />} />
                  <Route path="/user/profile" element={<Views.Profile />} />
                  <Route path="/user/breweries" element={<Views.Breweries />} />
                  <Route path="/user/breweries/:id" element={<Views.Beers />} />

                  <Route element={<RoleVerificationRequired requiredRole="admin" />} >
                    <Route path="/admin/news" element={<Views.AdminNews />} />
                    <Route path="/admin/breweries" element={<Views.AdminBreweries />} />
                    <Route path="/admin/breweries/:id" element={<Views.AdminBeers />} />
                  </Route>
                </Route>
                <Route path="/error" element={<Views.Error />} />
                <Route element={<RequireData />} >
                  <Route path="/verification-required" element={<Views.EmailSent />} />
                </Route>
                <Route path="/change-email/:token" element={<Views.EmailChangeVerification />} />
                <Route path="/reset-password/:token" element={<Views.ResetPassword />} />
                <Route path="/delete-account/:token" element={<Views.DeleteAccount />} />
                <Route path="*" element={<Navigate to="/error" />} />
                <Route path="/about-us" element={<Views.AboutUs />} />
                <Route path="/news" element={<Views.News />} />
              </Routes>
              <Footer />
            </div>
            <AgeVerificationModal />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
