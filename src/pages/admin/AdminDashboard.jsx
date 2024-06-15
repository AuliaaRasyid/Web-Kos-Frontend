import NavigationBarAdmin from "../../components/NavigationBarAdmin";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer';
import { formatDate } from '../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constant';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [availability, setAvailability] = useState('Available');
    const [sortConfig, setSortConfig] = useState({ key: 'no_kamar', direction: 'ascending' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/users`);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/status`);
                const data = await response.json();
                setAvailability(data.availability);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        fetchUsers();
        fetchStatus();
    }, []);

    const handleAvailabilityChange = async (event) => {
        const newAvailability = event.target.value;
        setAvailability(newAvailability);
        try {
            await fetch(`${API_URL}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ availability: newAvailability }),
            });
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    };

    const deleteUser = async (userId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/users/${userId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setUsers(users.filter(user => user._id !== userId));
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                } else {
                    Swal.fire("Error!", "Error deleting user.", "error");
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire("Error!", "Error deleting user.", "error");
            }
        }
    };

    const sortUsers = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarAdmin />
            </header>
            <main className='mainContent'>
                <div>
                    <h1 className="text-[30px] md:text-[44px] p-6 md:p-10 pb-4 font-bold">Info Penghuni</h1>
                    <div className='px-6 md:px-10 input__section pb-6 flex flex-row items-center justify-between'>
                        <div className="flex flex-col gap-3 md:gap-8 text-[22px] lg:text-[30px]">
                            <p className="xs:text-[20px] sm:text-[30px]">Status Kamar</p>
                            <div className="radio-buttons flex flex-row gap-3">
                                <label>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="Available"
                                        checked={availability === 'Available'}
                                        onChange={handleAvailabilityChange}
                                    />
                                    Available
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="availability"
                                        value="Full"
                                        checked={availability === 'Full'}
                                        onChange={handleAvailabilityChange}
                                    />
                                    Unavailable
                                </label>
                            </div>
                        </div>
                        <a href='adminInput'>
                            <button className="input-button">Tambah</button>
                        </a>
                    </div>
                    <div className='table__penghuni px-3 md:px-5 text-[20px]'>
                        <table className="custom-table">
                            <thead>
                                <tr className='text-center'>
                                    <th className='cursor-pointer' onClick={() => sortUsers('no_kamar')}>No. Kamar</th>
                                    <th>Nama</th>
                                    <th>Tgl Masuk</th>
                                    <th>Tgl Bayar <br />Terakhir</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {sortedUsers.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.no_kamar}</td>
                                        <td>{user.name}</td>
                                        <td>{formatDate(user.tanggal_masuk)}</td>
                                        <td>{formatDate(user.tanggal_terakhir_bayar)}</td>
                                        <td className='aksi'>
                                            <div className="button-group">
                                                <button className="aksi-button" onClick={() => navigate(`/AdminDetail/${user._id}`)}>
                                                    Detail
                                                </button>
                                                <button className="aksi-button" onClick={() => navigate(`/AdminEdit/${user._id}`)}>
                                                    Edit
                                                </button>
                                                <button className="aksi-button" onClick={() => deleteUser(user._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
