import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import NavigationBarPenghuni from '../../components/NavigationBarPenghuni';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { } from "../styles/adminPenghuni.css"
import Footer from '../../components/Footer';
import { API_URL } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const PenghuniKeluhan = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userKeluhan, setUserKeluhan] = useState({
        no_kamar: '',
        keluhan: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) {
                Swal.fire("Invalid ID", "", "error");
                return;
            }
            try {
                const response = await fetch(`${API_URL}/users/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setUserKeluhan(prevState => ({
                    ...prevState,
                    no_kamar: data.no_kamar
                }));
            } catch (error) {
                Swal.fire(error.message, "", "error");
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserKeluhan(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userKeluhan.keluhan) {
                throw new Error('Please fill out all required fields');
            }
            
            const response = await fetch(`${API_URL}/users/${id}/keluhan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ keluhan: userKeluhan.keluhan })
            });
            const data = await response.json(); // Parse response body

            if (!response.ok) {
                throw new Error(data.message);
            }
            setUserKeluhan({
                no_kamar: `${userKeluhan.no_kamar}`,
                keluhan: '',
            })
            Swal.fire({
                text: 'Complaint created successfully',
                icon: "success"
            });
            navigate(`/PenghuniDashboard/${id}`);
            
        } catch (error) {
            Swal.fire({text:`Error: ${error.message}`, icon:"error"});
        }
    };

    return (
        <div className="admin-container font-forum">
            <header>
                <NavigationBarPenghuni />
            </header>
            <main className='mainContent'>
                <h1 className="text-[30px] md:text-[38px] p-6 md:p-10 pb-4 font-bold">Keluhan</h1>
                <Container className="form-container p-4 md:p-5 bg-[#CEDEBD] rounded text-[24px]">
                    <Form className='form-profile' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formNoKamar">
                            <Form.Label>No Kamar</Form.Label>
                            <Form.Control
                                type="text"
                                name='no_kamar'
                                disabled
                                value={userKeluhan.no_kamar}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formKeluhan">
                            <Form.Label>Keluhan</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="keluhan"
                                required
                                placeholder="Enter your Keluhan"
                                value={userKeluhan.keluhan}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <button className="form-button">Send</button>
                    </Form>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default PenghuniKeluhan;
