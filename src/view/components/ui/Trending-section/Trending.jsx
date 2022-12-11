import { Container, Row, Col } from 'reactstrap'
import './trending.css'
import NftCard from '../Nft-card/NftCard'
import { TRENDING_DAPPS } from '../../../assets/data/data'

const Trending = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5">
                        <h3 className="trending__title text-2xl font-semibold">Trending</h3>
                    </Col>

                    {TRENDING_DAPPS.map((item) => (
                        <Col lg="3" md="4" sm="6" key={item.app_id} className="mb-4">
                            <NftCard item={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default Trending
