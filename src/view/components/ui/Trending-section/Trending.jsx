import React, {useEffect, useState} from 'react'
import { Container, Row, Col } from 'reactstrap'
import './trending.css'
import NftCard from '../Nft-card/NftCard'
// import { TRENDING_DAPPS } from '../../../assets/data/data'
import { getMarketplaceListings } from '../../../../script/marketplace/utils.js'

const Trending = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getMarketData = async () => {
            const listings = await getMarketplaceListings()
            setData(listings)
        }
        getMarketData()
    }, [])

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5">
                        <h3 className="trending__title text-2xl font-semibold">Trending</h3>
                    </Col>

                    {data.map((item) => (
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
