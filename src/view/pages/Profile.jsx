import { useState, useEffect } from 'react'
import MyAppCard from '../components/ui/My-app-card/MyAppCard'
import AppCard from '../components/ui/App-card/AppCard'
import CommonSection from '../components/ui/Common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import '../styles/wallet.css'
import {fetchRequestedApps, getMyPublishedApps, getMyRequestedApps, getMyUsingApps} from '../../controller/blockchain'

const Profile = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [requestedApps, setRequestedApps] = useState(null);
    const [myRequestedApps, setMyRequestedApps] = useState(null);
    const [myPublishedApps, setMyPublishedApps] = useState(null);
    const [myUsingApps, setMyUsingApps] = useState(null);

    useEffect(() => {
        if (window.ethereum.selectedAddress === process.env.ADMIN_ADDRESS) {
            setIsAdmin(true);
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setRequestedApps(await fetchRequestedApps());
        setMyRequestedApps(await getMyRequestedApps());
        setMyPublishedApps(await getMyPublishedApps());
        setMyUsingApps(await getMyUsingApps());
    }

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
                                        imgUrl={item.imageUrl}
                                        smartContractUrl={item.smartContractUrl}
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
                                {myRequestedApps?.map((item) => {
                                    return (
                                        <>
                                            <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                                                <MyAppCard
                                                    id={item.id}
                                                    name={item.name}
                                                    creator={item.creator}
                                                    description={item.description}
                                                    imgUrl={item.imgUrl}
                                                    tags={item.tags}
                                                    website={item.website}
                                                    github={item.github}
                                                    discord={item.discord}
                                                    telegram={item.telegram}
                                                    isPublished={false}
                                                />
                                            </Col>
                                        </>
                                    )
                                })}
                                {myPublishedApps?.map((item) => {
                                    return (
                                        <>
                                            <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                                                <MyAppCard
                                                    id={item.id}
                                                    name={item.name}
                                                    creator={item.owner}
                                                    description={item.description}
                                                    imgUrl={item.image}
                                                    tags={item.tags}
                                                    isPublished={true}
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
                                {myUsingApps?.map((item) => {
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
