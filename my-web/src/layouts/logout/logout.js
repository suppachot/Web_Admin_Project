import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Logout = () => {
   const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: 'คุณต้องการที่จะออกจากระบบใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.isConfirmed) {
        // localStorage.removeItem('jwt');
        // localStorage.removeItem('firstName');
        // localStorage.removeItem('lastName');
        // localStorage.removeItem('emp');
        localStorage.clear();
        sessionStorage.clear();
        Swal.fire('You logout', '', 'success')
        navigate('/login/sign-in');
      } else if (result.isDenied) {
        // localStorage.setItem('firstName', localStorage.getItem('firstName'));
        // localStorage.setItem('lastName', localStorage.getItem('lastName'));
        // localStorage.setItem('emp', localStorage.getItem('emp'));
        sessionStorage.setItem('firstName', sessionStorage.getItem('firstName'));
        sessionStorage.setItem('lastName', sessionStorage.getItem('lastName'));
        sessionStorage.setItem('emp', sessionStorage.getItem('emp'));
        navigate(-1);
      }
    });
  };
  
  useEffect(() => {
    handleLogout();
    navigate(-1);
  }, [navigate]);

  return null;
};

export default Logout;