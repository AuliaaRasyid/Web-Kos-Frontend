import React, { useEffect } from 'react';
import NavigationBarAdmin from '../components/NavigationBarAdmin';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: 'Access Denied',
            text: "You don't have permission to access this page",
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false, 
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                navigate(-1); // Navigate back to the previous page
            }
        });
    }, [navigate]);

    return (
        <div>
            <div className="admin-container font-forum">
                <header>
                    <NavigationBarAdmin />
                </header>
                <main className='mainContent'>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default AccessDenied;
