import { Container, Row, Col } from 'reactstrap'
import './feature-section.css'

const FEATURES = [
    {
        title: 'Pubplish dApps',
        desc: 'Make money by listing your dApps on our Marketplace so that everyone can use them.',
        icon: 'ri-money-dollar-circle-line',
    },
    {
        title: 'Use dApps',
        desc: 'Browse dApps developed by our community that fit your needs.',
        icon: 'ri-shopping-cart-line',
    },
]

const FeatureSection = () => {
    return (
        <section style={{ padding: '10px 0px' }}>
            <Container>
                <Row>
                    <Col lg="12" className="mb-4">
                        <h3 className="step__title text-2xl font-semibold">Features</h3>
                    </Col>

                    {FEATURES.map((item, index) => (
                        <Col lg="3" md="4" sm="6" key={index} className=" mb-4">
                            <div className="single__step__item">
                                <span>
                                    <i className={item.icon}></i>
                                </span>
                                <h5 className='text-xl font-semibold'>{item.title}</h5>
                                <div className="step__item__content">
                                    <p className="mb-0">{item.desc}</p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default FeatureSection;
