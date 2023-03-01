import DHubLogo from '../../assets/images/DHub-Store-light-logo.png'
import { Container, Row, Col } from 'reactstrap'
import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="6" md="6" sm="6" className="mb-4">
                        <div className="logo">
                            <img src={DHubLogo} className='h-[45px]' alt='DHub logo'/>
                            <p style={{ color: 'gray' }}>dApp Hub for developers and dApp users.</p>
                        </div>
                    </Col>

                    <Col lg="6" md="6" sm="6" className="mb-4">
                        <div className="social__links d-flex gap-3 align-items-center float-right">
                            <span>
                                <Link to="#">
                                    <i className="ri-facebook-line"></i>
                                </Link>
                            </span>
                            <span>
                                <Link to="#">
                                    <i className="ri-instagram-line"></i>
                                </Link>
                            </span>
                            <span>
                                <Link to="#">
                                    <i className="ri-twitter-line"></i>
                                </Link>
                            </span>
                            <span>
                                <Link to="#">
                                    <i className="ri-telegram-line"></i>
                                </Link>
                            </span>
                            <span>
                                <Link to="#">
                                    <i className="ri-discord-line"></i>
                                </Link>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
