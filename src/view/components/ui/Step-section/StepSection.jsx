import { Container, Row, Col } from 'reactstrap'
import './step-section.css'

const STEP__DATA = [
    {
        title: 'Create dApps',
        desc: 'Creating your own dApps has never been easier with our platform for developers.',
        icon: 'ri-drag-drop-line',
    },
    {
        title: 'Audit dApps',
        desc: 'We help you audit your app to make sure it\'s ready to go live.',
        icon: 'ri-hammer-line',
    },
    {
        title: 'Pubplish dApps',
        desc: 'Make money by listing your dApps on our Marketplace so that everyone can use or buy them.',
        icon: 'ri-money-dollar-circle-line',
    },
    {
        title: 'Use/Buy dApps',
        desc: 'Browse dApps developed by our community that fit your needs.',
        icon: 'ri-shopping-cart-line',
    },
]

const StepSection = () => {
    return (
        <section style={{ padding: '10px 0px' }}>
            <Container>
                <Row>
                    <Col lg="12" className="mb-4">
                        <h3 className="step__title text-2xl font-semibold">Features</h3>
                    </Col>

                    {STEP__DATA.map((item, index) => (
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

export default StepSection
