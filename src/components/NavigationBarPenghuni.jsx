import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import logo from "../assets/logo.png"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logout from '../utils/Logout';
import { API_URL } from '../utils/constant';
import { useLocation } from 'react-router-dom';

const NavigationBarPenghuni = () => {
    const location = useLocation();
    const { id } = useParams();
    const [usersData, setUsers] = useState([]);
    const isActive = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/users/${id}`); // Use the correct URL
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [id]);

    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-[#9EB384] py-4 px-1 text-[30px] text-black md:px-20 md:text-[35px]">
                    <Container fluid>
                        <a href={`/Home/${usersData._id}`}>
                            <div className="flex flex-row items-center">
                                <img src={logo} className="w-[50px] md:w-[80px]" alt="HoloHero Logo" />
                                <p>HoloHero</p>
                            </div>
                        </a>
                        <Navbar.Toggle className='text-[30px] border-none' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className="bg-[#9EB384] max-w-[60%] md:max-w-[100%]"
                        >
                            <Offcanvas.Header closeButton className=' text-[30px]'>
                            </Offcanvas.Header>
                            <Offcanvas.Body className='font-forum '>
                                <Nav className="justify-content-end flex-grow-1 pe-2 px-8 text-[28px] md:text-[32px]">
                                    <h1 className=' font-bold'>Account</h1>
                                    <Logout />                                    
                                    <h1 className=' font-bold pt-10 pb-2'>Pages</h1>
                                    <Nav.Link className={isActive(`/Home/${usersData._id}`) ? "underline" : ""} href={`/Home/${usersData._id}`}>Home</Nav.Link>
                                    <Nav.Link className={isActive(`/PenghuniDashboard/${usersData._id}`) ? "underline" : ""} href={`/PenghuniDashboard/${usersData._id}`}>Dashboard</Nav.Link>
                                    <Nav.Link className={isActive(`/PenghuniProfile/${usersData._id}`) ? "underline" : ""} href={`/PenghuniProfile/${usersData._id}`}>Profile</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}

export default NavigationBarPenghuni