import React, {useEffect, useState} from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import MyNftCard from '../My-nft-card/MyNftCard'
import NftCard from '../Nft-card/NftCard'
import './live-auction.css'
import { getMarketplaceListings } from '../../../../script/marketplace/utils.js'

const LiveAuction = () => {
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
                        <div className="live__auction__top d-flex align-items-center justify-content-between ">
                            <h3 className='text-2xl font-semibold'>Most Popular</h3>
                            <span>
                                <Link to="/market">Explore more</Link>
                            </span>
                        </div>
                    </Col>

                    {data.map((item, i) =>
                        item.owner_address !== '' ? (
                            <Col key={i} lg="3" md="4" sm="6" className="mb-4">
                                <NftCard item={item} />
                            </Col>
                        ) : (
                            <Col key={i} lg="3" md="4" sm="6" className="mb-4">
                                <MyNftCard item={item} />
                            </Col>
                        ),
                    )}
                </Row>
            </Container>
        </section>
    )
}

export default LiveAuction
