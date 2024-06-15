import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Swal from 'sweetalert2';
import logo from "../assets/logo.png";
import kosan1 from "../assets/kosan3.jpg";
import kosan2 from "../assets/kosan4.jpg";
import kosan3 from "../assets/kosan5.jpg";
import kosan6 from "../assets/kosan6.png";
import FacilitySection from "../components/FacilitySection";
import Footer from "../components/Footer";
import { API_URL } from "../utils/constant";
import { heroAnimation, sectionAnimation } from '../utils/animations';
import useSectionAnimation from '../utils/useSectionAnimation';
import NavigationBarAdmin from '../components/NavigationBarAdmin';
import NavigationBarPenghuni from '../components/NavigationBarPenghuni';
import "./styles/Home.css";

const Home = () => {
    const [availability, setAvailability] = useState('Available');
    const [userRole, setUserRole] = useState(null);

    const [refKosanMain, controlsKosanMain] = useSectionAnimation();
    const [refBenefit, controlsBenefit] = useSectionAnimation();
    const [refContact, controlsContact] = useSectionAnimation();

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/status`);
                const data = await response.json();
                setAvailability(data.availability);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        const role = localStorage.getItem('role');
        setUserRole(role);

        fetchStatus();
    }, []);

    const copyNumber = () => {
        navigator.clipboard.writeText("087731366528");
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Phone number copied to clipboard!',
        });
    };

    return (
        <div className="font-forum">
            <header>
                {userRole === 'admin' && <NavigationBarAdmin />}
                {userRole === 'user' && <NavigationBarPenghuni />}
                {!userRole && (
                    <nav className="flex bg-[#9EB384] flex-row items-center 
                    justify-between text-black py-4 xs:px-4 md:px-6 text-[30px] md:text-[35px]">
                        <a href="/">
                            <div className="flex flex-row items-center">
                                <img src={logo} className="w-[50px] md:w-[80px]" alt="HoloHero Logo" />
                                <p>HoloHero</p>
                            </div>
                        </a>
                        <a href="/LoginPage"><p>LOG IN</p></a>
                    </nav>
                )}
            </header>
            <main>
                <motion.div className="hero">
                    <div className="hero__inner">
                        <motion.h1 className="hero__title"
                            initial="hidden"
                            animate="show"
                            variants={heroAnimation}
                            transition={{ duration: 0.5 }}
                        >Kos HoloHero
                        </motion.h1>
                        <motion.p className="hero__tagline"
                            initial="hidden"
                            animate="show"
                            variants={heroAnimation}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            Tempat Tinggal dengan Kenyamanan Maksimal
                        </motion.p>
                    </div>
                </motion.div>
                <div className="mainContent bg-[#FAF1E4]">
                    <motion.div className="px-10 pt-20 w-full flex flex-col items-center" ref={refKosanMain}
                        initial="hidden"
                        animate={controlsKosanMain}
                        variants={sectionAnimation}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="font-bold border-b-8 border-[#435334] w-fit text-[38px]">Welcome</h1>
                        <p className="text-[30px] text-center pb-16">Selamat Datang di Kos Modern dengan Kenyamanan dan Keamanan Maksimal</p>
                    </motion.div>

                    <motion.section className="kosan__main" ref={refKosanMain}
                        initial="hidden"
                        animate={controlsKosanMain}
                        variants={sectionAnimation}
                        transition={{ duration: 0.5 }}
                    >
                        <Container className="carousel-container">
                            <Carousel fade controls={true} indicators={false} interval={2500}>
                                <Carousel.Item>
                                    <Image src={kosan1} className="d-block w-100 img-fluid" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image src={kosan2} className="d-block w-100 img-fluid" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image src={kosan3} className="d-block w-100 img-fluid" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image src={kosan6} className="d-block w-100 img-fluid" />
                                </Carousel.Item>
                            </Carousel>
                        </Container>
                        <div className="flex flex-col items-center text-center text-[30px] md:text-[35px] mt-4">
                            <p className="font-bold">Kos HoloHero</p>
                            <p>Jl. Siaga II No 32 E, Jakarta Selatan</p>
                            <p>Harga: Rp. 1.000.000</p>
                            <p className={`italic ${availability === 'Available' ? 'available' : 'full'}`}>
                                Kamar: {availability}
                            </p>
                            
                        </div>
                    </motion.section>
                    <FacilitySection />
                    <motion.section className="benefit" ref={refBenefit}
                        initial="hidden"
                        animate={controlsBenefit}
                        variants={sectionAnimation}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="kosan__benefit text-[38px] flex flex-col items-center pt-3 p-20">
                            <h1 className="px-4 py-1 border-b-8 border-[#435334] w-fit font-bold">Benefit</h1>
                            <p className="text-[28px] text-center pb-16">Keuntungan Ngekos di HoloHero adalah sebagai berikut</p>
                            <Accordion className="benefit__accordion">
                                <Accordion.Item eventKey="0" className="accordion__item">
                                    <Accordion.Header className="font-bold">Pembayaran Bulanan</Accordion.Header>
                                    <Accordion.Body>
                                        Pembayaran dapat dilakukan setiap bulannya.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1" className="accordion__item">
                                    <Accordion.Header className="font-bold">Dekat dengan Fasilitas Umum</Accordion.Header>
                                    <Accordion.Body>
                                        Kos di HoloHero dekat dengan fasilitas umum seperti minimarket, fasilitas kesehetan, transposrtasi umum,
                                        dan lainnya.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2" className="accordion__item">
                                    <Accordion.Header className=" font-bold">Pembayaran via sistem</Accordion.Header>
                                    <Accordion.Body>
                                        Penghuni dapat membayar sewa melalui sistem pembayaran yang tersedia.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </motion.section>
                    <motion.section className="contact" ref={refContact}
                        initial="hidden"
                        animate={controlsContact}
                        variants={sectionAnimation}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="kosan__contact text-[38px] flex flex-col items-center pt-3 p-20">
                            <h1 className="px-4 py-1 border-b-8 border-[#435334] w-fit font-bold">Contact</h1>
                            <p className="pb-10 text-[28px] text-center">Kontak untuk pertanyaan lebih lanjut silakan hubungi</p>
                            <div className="contact__container">
                                <p className="contact__title font-bold">Rusdi Awamalum</p>
                                <p className="contact__subtitle">087731366528</p>
                                <div className="contact__button">
                                    <button className="phone-button" onClick={copyNumber}>Copy Number</button>
                                    <Link to={"https://wa.me/6287731366528"} >
                                        <button className="whatsapp-button"><i className="fa fa-whatsapp"></i> WhatsApp</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;