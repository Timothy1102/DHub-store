// import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import MyNftCard from '../My-nft-card/MyNftCard'
import NftCard from '../Nft-card/NftCard'
import './live-auction.css'

const LiveAuction = () => {
    const data = [
        {
            owner_id: 'owner_id',
            is_selling: true,
            token_id: 'token_id',
            selling_price: 0,
            using_price: 0,
            itemData: {
                metadata: {
                    title: 'title',
                    description: 'description',
                    extra: 'extra',
                    media: 'https://bafybeihumkfixgyh43jqapvuq6gse4vs2rtclnbr2pwfxmsdg6ykplh2a4.ipfs.nftstorage.link/Screen%20Shot%202022-06-14%20at%2014.32.50.png',
                },
            },
        },
    ]

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5">
                        <div className="live__auction__top d-flex align-items-center justify-content-between ">
                            <h3>Most Popular</h3>
                            <span>
                                <Link to="/market">Explore more</Link>
                            </span>
                        </div>
                    </Col>

                    {data.map((item) =>
                        item.owner_id !== '' ? (
                            <>
                                <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                                    <NftCard item={item} />
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                                    <MyNftCard
                                        item={{
                                            title: item.itemData.metadata.title,
                                            id: item.token_id,
                                            creator: item.owner_id,
                                            tags: item.itemData.metadata.extra,
                                            desc: item.itemData.metadata.description,
                                            is_selling: true,
                                            selling_price: item.sale_conditions,
                                            using_price: item.use_condition,
                                            imgUrl: item.itemData.metadata.media,
                                        }}
                                    />
                                </Col>
                            </>
                        ),
                    )}
                </Row>
            </Container>
        </section>
    )
}

export default LiveAuction
