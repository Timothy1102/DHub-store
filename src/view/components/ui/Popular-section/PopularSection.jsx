import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import MyAppCard from '../My-app-card/MyAppCard'
import AppCard from '../App-card/AppCard'
import './popular-section.css'
import { getDemoApps } from '../../../../controller/blockchain'

const PopularSection = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const apps = await getDemoApps()
            setData(apps)
        }
        getData()
    }, [])

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" className="mb-5">
                        <div className="live__auction__top d-flex align-items-center justify-content-between ">
                            <h3 className="text-2xl font-semibold">Most Popular</h3>
                            <span>
                                <Link to="/market">Explore more</Link>
                            </span>
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
    )
}

export default PopularSection;
