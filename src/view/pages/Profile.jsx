import { useState, useEffect } from 'react'
import MyAppCard from '../components/ui/My-app-card/MyAppCard'
import AppCard from '../components/ui/App-card/AppCard'
import CommonSection from '../components/ui/Common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import '../styles/wallet.css'
import {requestedApps} from '../assets/data/data'

const Profile = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (window.ethereum.selectedAddress === '0x8342e935907f86127f24ae3742a2c147bf60fc75') {
            setIsAdmin(true);
        }
    }, []);

    const usingApps = [
        {
            id : 1,
            name: "ArthSwap",
            isUsing: true,
            description : "ArthSwap is the No.1 decentralized exchange platform.",
            image : "https://arweave.net/u7nz8PlAm5e3wLbrPMi2NaS0J-jEQKmrFPSZRVYwLWc",
            owner_address: "8eFDPDa1sUboGPUrPz3KCLndgZpKf1KSVcJ6KHiDdoWb",
            tag: "[\"DeFi\"]",
        }
    ]

    const myApps = [
        {
            id: 0,
            name: 'ArthSwap',
            creator: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
            description:
                "ArthSwap’s primary goal is to expand our service within the Astar Network ecosystem, and our team is hence eager to optimize all features for the network, referring to us as an “Astar-native” DApp (Decentralized Application). Essentially, every ecosystem has the spearhead DEX, that's why ArthSwap to Astar is what Trader Joe is to Avalanche, Quickswap to Polygon, and Uniswap to Ethereum.",
            imgUrl: 'https://nftstorage.link/ipfs/bafybeid5ftqbr2c3nnvwmgnt4gjnzrbetrnqsgn6tv24nojgscdplg5hzq/Screen%20Shot%202022-06-14%20at%2007.14.04.png',
            tags: 'Defi',
            isPublished: true,
        },
        {
            id: 1,
            name: 'Astar Degens',
            creator: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
            description:
                'Astar Degens is a community without hierarchy. Where impactful action is incentivized and rewarded. We welcome all ideas equally, and value productive effort. As a community, we help realize the value of supportive cooperation within the blockchain space, by encouraging fearless participation within the Astar Network.',
            imgUrl: 'https://bafybeifqn5sfmyv6edoj4tp2saxmx2wv7whdgcgijx76xefo5iplfbwn6y.ipfs.nftstorage.link/Screen%20Shot%202022-06-14%20at%2022.16.36.png',
            tags: 'DAO',
            isPublished: false,
        },
    ]

    const goToSubmitAppPage = () => {
        window.location.href = '/submit-app'
    }

    return (
        <>
            {isAdmin ? 
            <CommonSection title="Requests" />
            :
            <CommonSection title="My Profile" />
            }

            {isAdmin ?
                <Container className='my-[60px]'>
                    <Row>
                        {requestedApps.map((item) => {
                            return (
                                <Col lg="3" md="4" sm="6" className="mb-4" key={item.app_id}>
                                    <MyAppCard
                                        id={item.id}
                                        name={item.name}
                                        creator={item.owner_address}
                                        description={item.description}
                                        imgUrl={item.imgUrl}
                                        code={item.code}
                                        tags={item.tag}
                                        isPublished={item.isPublished}
                                        price={item.price}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
                :
                <>
                    <section style={{ paddingBottom: 0 }}>
                        <Container>
                            <Row>
                                <Col lg="6" className="mb-5">
                                    <h3 className="trending__title">My Apps</h3>
                                </Col>
                                <Col lg="6" className="mb-5">
                                    <button className="use__btn d-flex align-items-center gap-1 float-right" style={{ border: 'none' }} onClick={goToSubmitAppPage}>
                                        Submit app
                                    </button>
                                </Col>
                                {myApps.map((item) => {
                                    return (
                                        <>
                                            <Col lg="3" md="4" sm="6" className="mb-4" key={item.app_id}>
                                                <MyAppCard
                                                    id={item.id}
                                                    name={item.name}
                                                    creator={item.creator}
                                                    description={item.description}
                                                    imgUrl={item.imgUrl}
                                                    tags={item.tags}
                                                    isPublished={item.isPublished}
                                                />
                                            </Col>
                                        </>
                                    )
                                })}
                            </Row>
                        </Container>
                    </section>

                    <section style={{ paddingBottom: 0 }}>
                        <Container>
                            <Row>
                                <Col lg="12" className="mb-5">
                                    <h3 className="trending__title">Using Apps</h3>
                                </Col>
                                {usingApps.map((item) => {
                                    item.is_selling = false
                                    return (
                                        <>
                                            {item.is_selling === false && (
                                                <>
                                                    <Col lg="3" md="4" sm="6" className="mb-4" key={item.app_id}>
                                                        <AppCard item={item} />
                                                    </Col>
                                                </>
                                            )}
                                        </>
                                    )
                                })}
                            </Row>
                        </Container>
                    </section>
                </>
            }
        </>
    )
}

export default Profile
