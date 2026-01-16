import React, { useState } from 'react'
import AuthLayout from '../components/Layouts/AuthLayout'
import FormSignUp from '../components/Fragments/FormSignUp'
import AppSnackbar from '../components/Elements/AppSnackbar.jsx'
import axios from 'axios'

function signUp() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (email, password) => {
    try {
      await axios.post("https://jwt-auth-eight-neon.vercel.app/register", {
        email,
        password,
      });

      setSnackbar({
        open: true,
        message: "Register Berhasil",
        severity: "success",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Terjadi kesalahan";
      setSnackbar({ 
        open: true, 
        message: errorMessage, 
        severity: "error" 
      });
    }
  };

  return (
    <AuthLayout type="sign-up">
      <FormSignUp onSubmit={handleRegister} />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  )
}

export default signUp