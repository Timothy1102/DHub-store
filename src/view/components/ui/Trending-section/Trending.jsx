// import {useState, useEffect} from "react";
import { Container, Row, Col } from 'reactstrap'
import './trending.css'
import NftCard from '../Nft-card/NftCard'

const Trending = () => {
    const data = [
        {
            token_id: 'token_id',
        },
    ]

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5">
                        <h3 className="trending__title text-2xl font-semibold">Trending</h3>
                    </Col>

                    {data.map((item) => (
                        <Col lg="3" md="4" sm="6" key={item.token_id} className="mb-4">
                            <NftCard />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default Trending
