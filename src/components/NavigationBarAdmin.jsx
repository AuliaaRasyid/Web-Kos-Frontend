import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import Logout from '../utils/Logout'; // Ensure the path is correct
import logo from "../assets/logo.png"
import { useLocation } from 'react-router-dom';

const NavigationBarAdmin = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-[#9EB384] py-4 px-1 text-[30px] text-black md:px-20 md:text-[35px]">
                    <Container fluid>
                        <a href="/">
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
                                    <h1 className=' font-bold pt-10'>Pages</h1>
                                    <Nav.Link className = {isActive("/") ? "underline" : ""} href="/">Home</Nav.Link>
                                    <Nav.Link className = {isActive("/AdminDashboard") ? "underline" : ""} href="/AdminDashboard">Tambah Penghuni</Nav.Link>
                                    <Nav.Link className = {isActive("/AdminKeluhan") ? "underline" : ""} href="/AdminKeluhan">Keluhan Penghuni</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}

export default NavigationBarAdmin
