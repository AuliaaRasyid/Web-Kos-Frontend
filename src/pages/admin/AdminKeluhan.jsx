import { useEffect, useState } from 'react';
import NavigationBarAdmin from "../../components/NavigationBarAdmin";
import Swal from 'sweetalert2';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constant';

const AdminKeluhan = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'no_kamar', direction: 'ascending' });

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch(`${API_URL}/complaints`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setComplaints(data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };
        fetchComplaints();
    }, []);

    const deleteComplaint = async (userId, complaintId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/users/${userId}/complaints/${complaintId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    Swal.fire(`HTTP error! status: ${response.status}`, "error");
                }

                // Fetch the updated list of complaints after deletion
                const updatedResponse = await fetch(`${API_URL}/complaints`);
                if (!updatedResponse.ok) {
                    Swal.fire(`HTTP error! status: ${updatedResponse.status}`, "error");
                }
                Swal.fire("Deleted!", "Complaint has been deleted.", "success");
                const updatedData = await updatedResponse.json();

                // Set the state with the updated complaints data
                setComplaints(updatedData);
            } catch (error) {
                Swal.fire('Error deleting complaint:', error);
            }
        }
    };
    const limitText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const sortComplaints = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedComplaints = [...complaints].sort((a, b) => {
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
                    <h1 className="text-[30px] md:text-[44px] p-6 md:p-10 pb-4 font-bold">Keluhan Penghuni</h1>
                    <div className='table__penghuni px-3 md:px-5 text-[20px]'>
                        <table className="custom-table">
                            <thead>
                                <tr className='text-center'>
                                    <th className='cursor-pointer max-w-10' onClick={() => sortComplaints('no_kamar')} 
                                    >No. Kamar</th>
                                    <th>Nama</th>
                                    <th>Keluhan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {sortedComplaints.map(user => user.keluhan.map(complaint => (
                                    <tr key={complaint._id}>
                                        <td>{user.no_kamar}</td>
                                        <td>{user.name}</td>
                                        <td className='max-w-14 md:max-w-38'>{limitText(complaint.keluhan, 100)}</td>
                                        <td className='aksi max-w-[48px] md:max-w-32'>
                                            <div className="button-group">
                                                <button className="aksi-button" onClick={() => navigate(`/AdminKeluhanDetail/${user._id}/${complaint._id}`)}>Detail</button>
                                                <button className="aksi-button" onClick={() => deleteComplaint(user._id, complaint._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminKeluhan;
