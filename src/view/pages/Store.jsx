import { useEffect, useState } from 'react'
import CommonSection from '../components/ui/Common-section/CommonSection'
import AppCard from '../components/ui/App-card/AppCard'
import MyAppCard from '../components/ui/My-app-card/MyAppCard'
import { Container, Row, Col } from 'reactstrap'
import '../styles/market.css'
import { fetchPublishedApps } from '../../controller/blockchain.js'

const Store = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const apps = await fetchPublishedApps();
            setData(apps)
        }
        getData();
    }, [])

    return (
        <>
            <CommonSection title={'dApp Store'} />
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <div className="market__product__filter d-flex align-items-center justify-content-between">
                                <div className="filter__left d-flex align-items-center gap-5">
                                    <div className="all__category__filter">
                                        <select>
                                            <option>All Categories</option>
                                            <option value="art">NFT</option>
                                            <option value="music">Staking</option>
                                            <option value="domain-name">Etherum</option>
                                            <option value="virtual-world">BSC</option>
                                            <option value="trending-card">Voting</option>
                                            <option value="trending-card">Whitelist</option>
                                            <option value="trending-card">Token</option>
                                        </select>
                                    </div>

                                    <div className="all__items__filter">
                                        <select>
                                            <option>All Items</option>
                                            <option value="single-item">Only Backend</option>
                                            <option value="bundle">Frontend + Backend</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="filter__right">
                                    <select>
                                        <option>Sort By</option>
                                        <option value="latest">Latest</option>
                                        <option value="high">High Price</option>
                                        <option value="mid">Mid Price</option>
                                        <option value="low">Low Price</option>
                                    </select>
                                </div>
                            </div>
                        </Col>

                        {data?.map((item, i) =>
                            item.owner_address !== '' ? (
                                <Col key={i} lg="3" md="4" sm="6" className="mb-4">
                                    <AppCard item={item} />
                                </Col>
                            ) : (
                                <Col key={i} lg="3" md="4" sm="6" className="mb-4">
                                    <MyAppCard item={item} />
                                </Col>
                            ),
                        )}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Store
