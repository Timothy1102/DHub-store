import { useState, useEffect } from 'react'
import CommonSection from '../components/ui/Common-section/CommonSection'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { EyeTwoTone, HeartTwoTone, CommentOutlined } from '@ant-design/icons'
import '../styles/nft-details.css'
import DefaultComponent from '../components/ui/Comment-section/CommentSection'
import { truncatAddress } from '../../utils/format'
import {registerToUseApp, getAppDetail} from '../../controller/blockchain'

const AppDetails = () => {
    const [currentApp, setCurrentApp] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const getAppData = async () => {
            const app = await getAppDetail(id);
            setCurrentApp(app);
        }
        getAppData();
    }, [id])

    return (
        <>
            {currentApp !== undefined && (
                <>
                    <CommonSection title={currentApp.name} img={currentApp.image} verified={true} />
                    <section style={{ paddingTop: 30}}>
                        <Container>
                            <Row>
                                <Col
                                    lg="8"
                                    md="12"
                                    sm="12"
                                    style={{
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                    }}
                                >
                                    <div className="single__nft__content">
                                        <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                                            <div className=" d-flex align-items-center gap-3 single__nft-seen">
                                                <EyeTwoTone style={{ fontSize: '1.5rem' }} twoToneColor="#ffa500" />{' '}
                                                <span style={{ fontSize: '1rem' }}>53</span>
                                                <HeartTwoTone style={{ fontSize: '1.5rem' }} twoToneColor="#eb2f96" />{' '}
                                                <span style={{ fontSize: '1rem' }}>34</span>
                                                <CommentOutlined style={{ fontSize: '1.5rem' }} twoToneColor="#52c41a" />{' '}
                                                <span style={{ fontSize: '1rem' }}>4</span>
                                            </div>

                                            <div className=" d-flex align-items-center gap-2 single__nft-more">
                                                <span style={{ fontSize: '1.3rem' }}>
                                                    <a href="https://google.com/" target="_blank" rel="noreferrer">
                                                        <i className="ri-global-line"></i>
                                                    </a>
                                                </span>
                                                <span style={{ fontSize: '1.3rem' }}>
                                                    <i className="ri-send-plane-line"></i>
                                                </span>
                                                <span style={{ fontSize: '1.3rem' }}>
                                                    <i className="ri-discord-fill"></i>
                                                </span>
                                                <span style={{ fontSize: '1.3rem' }}>
                                                    <i className="ri-github-fill"></i>
                                                </span>
                                                <span style={{ fontSize: '1.3rem' }}>
                                                    <i className="ri-more-2-line"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="nft__creator d-inline-flex gap-3 align-items-center" style={{ display: 'inline' }}>
                                            <div className="creator__detail">
                                                <p>Owner</p>
                                                <h6 className="cursor-pointer">{truncatAddress(currentApp.owner_address)}</h6>
                                            </div>
                                        </div>

                                        <div className="inline ml-[150px]">
                                            <h1
                                                style={{
                                                    color: 'white',
                                                    display: 'inline',
                                                    fontWeight: 600,
                                                    fontSize: 25,
                                                }}
                                            >
                                                {currentApp.min_m}
                                            </h1>
                                            <h4
                                                style={{
                                                    color: 'gray',
                                                    display: 'inline',
                                                    marginLeft: 15,
                                                    fontWeight: 600,
                                                    fontSize: 20,
                                                }}
                                            >
                                                0.32 ETH
                                            </h4>
                                        </div>

                                        <div className="flex justify-center" style={{ marginTop: 50 }}>
                                            <button className="singleNft-btn d-inline-flex align-items-center gap-2 w-30" onClick={() => registerToUseApp(id)}>
                                                Use
                                            </button>
                                        </div>

                                        <div
                                            style={{
                                                border: '0.2px solid #ffa500',
                                                borderRadius: 20,
                                                marginTop: 70,
                                                paddingLeft: 40,
                                                paddingRight: 40,
                                                paddingBottom: 20,
                                            }}
                                        >
                                            <h5
                                                style={{
                                                    color: 'orange',
                                                    marginTop: 30,
                                                }}
                                            >
                                                Description
                                            </h5>
                                            <p
                                                className="my-4"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {currentApp.description}
                                            </p>
                                            <p style={{ display: 'inline' }}>Tags: </p>
                                            <p
                                                style={{
                                                    display: 'inline',
                                                    color: 'cyan',
                                                }}
                                            >
                                                {currentApp.tag}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </>
            )}

            <DefaultComponent />
        </>
    )
}

export default AppDetails
