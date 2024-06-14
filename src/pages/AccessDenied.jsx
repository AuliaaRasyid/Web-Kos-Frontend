import React from 'react'
import NavigationBarAdmin from '../components/NavigationBarAdmin'
import Footer from '../components/Footer'
import Swal from 'sweetalert2'
import './styles/Home.css';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const navigate = useNavigate();
    Swal.fire({
        title: 'Access Denied',
        text: "You don't have permission to access this page",
        icon: 'error',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            navigate(-1);
        }
    });
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
    )
}

export default AccessDenied
