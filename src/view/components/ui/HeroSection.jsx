import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import './hero-section.css'
import heroImg from '../../assets/images/bg.jpeg'

const HeroSection = () => {
    return (
        <section className="hero__section">
            <Container>
                <Row>
                    <Col lg="6" md="6">
                        <div className="hero__content">
                            <h2 style={{ display: 'inline' }} className='font-semibold'>
                                Discover dApp collections, buy & sell extraordinary
                                <span style={{ display: 'inline' }}>dApps</span>
                            </h2>
                            <p>Best place for developers, dApp users and business to find best products and develope a better Web3 world.</p>

                            <div className="hero__btns d-flex align-items-center gap-4">
                                <button className=" create__btn d-flex align-items-center gap-2">
                                    <i class="ri-apps-line"></i>
                                    <a target="_blank" href="/" rel="noreferrer">
                                        For Developers
                                    </a>
                                </button>
                                <button className=" explore__btn d-flex align-items-center gap-2">
                                    <i className="ri-rocket-line"></i> <Link to="/market">Explore</Link>
                                </button>
                            </div>
                        </div>
                    </Col>

                    <Col lg="6" md="6">
                        <div className="hero__img">
                            <img src={heroImg} alt="" className="w-100" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HeroSection
