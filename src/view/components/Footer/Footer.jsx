import DHubLogo from '../../assets/images/DHub-Store-light-logo.png'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import './footer.css'
import { Link } from 'react-router-dom'

const RESOURCES = [
    {
        display: 'Help Center',
        url: '#',
    },
    {
        display: 'Partner',
        url: '#',
    },
    {
        display: 'Community',
        url: '#',
    },
    {
        display: 'Activity',
        url: '#',
    },
]

const COMPANY = [
    {
        display: 'About',
        url: '#',
    },
    {
        display: 'Career',
        url: '#',
    },
    {
        display: 'Contact Us',
        url: '/contact',
    },
]

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="3" md="6" sm="6" className="mb-4">
                        <div className="logo">
                            <img src={DHubLogo} className='h-[45px]' alt='DHub logo'/>
                            <p style={{ color: 'gray' }}>Best place for developers, business and dApp users to find partners and develope a better Web3 world.</p>
                        </div>
                    </Col>

                    <Col lg="3" md="3" sm="6" className="mb-4">
                        <h5>Resources</h5>
                        <ListGroup className="list__group">
                            {RESOURCES.map((item, index) => (
                                <ListGroupItem key={index} className="list__item">
                                    <Link to={item.url}> {item.display} </Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col lg="3" md="3" sm="6" className="mb-4">
                        <h5>Company</h5>
                        <ListGroup className="list__group">
                            {COMPANY.map((item, index) => (
                                <ListGroupItem key={index} className="list__item">
                                    <Link to={item.url}> {item.display} </Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col lg="3" md="6" sm="6" className="mb-4">
                        <h5>Newsletter</h5>
                        <input type="text" className="newsletter" placeholder="Email" />
                        <div className="social__links d-flex gap-3 align-items-center ">
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
