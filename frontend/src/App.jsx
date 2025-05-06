import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ServicePage from "./pages/Service";
import BookingService from "./pages/BookingService";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import yourBookigContext from "./context/yourBookingContext";
import "./index.css";

const App = () => {
  const [userBookingList, setUserBookingList] = useState([]);

  const addBookingItem = (newBooking) => {
    setUserBookingList([...userBookingList, { newBooking }]);
  };

  return (
    <yourBookigContext.Provider value={{ userBookingList, addBookingItem }}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Protected Routes */}
          <Route path="/booking-service" element={
            <ProtectedRoute>
              <BookingService />
            </ProtectedRoute>
          } />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </yourBookigContext.Provider>
  );
};

export default App;