import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './my-app-card.css'
// import ModalConfirmation from '../Modal/Modal-confirmation/ModalConfirmation'
import { Row, Col } from 'reactstrap'
import {CheckCircleTwoTone, ClockCircleTwoTone, RiseOutlined} from '@ant-design/icons'
import {truncatAddress} from '../../../../utils/format'
import { Button } from 'antd';

const MyAppCard = ({id, name, creator, description, imgUrl, code, price, tags, isPublished}) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (window.ethereum.selectedAddress === '0x8342e935907f86127f24ae3742a2c147bf60fc75') {
            setIsAdmin(true);
        }
    }, []);

    return (
        <div className="single__nft__card">
            <div className="nft__content ">
                <Row>
                    <Col lg="3" style={{ marginRight: 7 }}>
                        <a href={`/store/${id}`}>
                            <img
                                src={imgUrl}
                                alt="nft thumbnail"
                                className="d-inline-flex tw-rounded-full image-shadow tw-w-14 tw-h-14 "
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50px',
                                    marginRight: 20,
                                }}
                            />
                        </a>
                    </Col>
                    <Col>
                        <h5 className="nft__title" style={{ marginBottom: 7 }}>
                            <Link style={{ color: 'white', fontSize: 20 }} to={`/market/${id}`}>
                                {name}
                            </Link>
                        </h5>
                        <div className="tags">
                            <p
                                style={{
                                    display: 'inline',
                                    fontSize: 15,
                                    color: '#40a9ff',
                                }}
                            >
                                {tags}
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>

            <div
                className="contract_des"
                style={{
                    height: 160,
                    border: '0.3px solid #ffa500',
                    padding: '5px 10px',
                    marginTop: 10,
                    borderRadius: 15,
                }}
            >
                <p
                    style={{
                        height: 150,
                        color: '#c7bfbf',
                        fontSize: 13,
                        textOverflow: 'ellipsis',
                        overflow: 'auto',
                        maxHeight: '40ch',
                        maxWidth: '40ch',
                        lineHeight: '25px',
                    }}
                >
                    {description}
                </p>
            </div>

            {isAdmin &&
                <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span style={{ fontSize: '1.3rem' }}>
                        <i className="ri-github-fill"></i>
                    </span>
                    <span style={{ fontSize: '1.3rem' }}>
                        {/* <a href="https://google.com/" target="_blank" rel="noreferrer"> */}
                            <i className="ri-global-line"></i>
                        {/* </a> */}
                    </span>
                    <span style={{ fontSize: '1.3rem' }}>
                        <i className="ri-send-plane-line"></i>
                    </span>
                    <span style={{ fontSize: '1.3rem' }}>
                        <i className="ri-discord-fill"></i>
                    </span>
                </div>
            }

            <p style={{ color: 'gray', marginBottom: '0rem', fontSize: 14 }}>Owner: {truncatAddress(creator)}</p>

            <div className="creator__info-wrapper d-flex gap-3" style={{ marginTop: '-10px' }}>
                <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='text-[17px]' style={{ color: 'orange' }}>
                            <span className="font-bold"> {price} </span><span className="font-bold" style={{ color: '#b1b3b1' }}> ETH</span>
                        </p>
                    </div>
                </div>
            </div>

            {code ?
                <>
                    <div className="flex items-center justify-center mt-2">
                        <button className="use__btn font-[700]">
                            Review Smart Contract
                            <RiseOutlined />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <Button type="text primary" danger className='bg-[#454242]'>
                            Reject
                        </Button>
                        <Button type="text primary order-last" className='bg-[#454242]'>
                            Publish
                        </Button>
                    </div>
                </>
                :
                isPublished ? (
                    <div className="flex items-center justify-center">
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                        <Button type="text primary">
                            Published
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <ClockCircleTwoTone />
                        <Button type="text" danger>
                            Submitted
                        </Button>
                    </div>
                )
            }

            {/* {showModalConfirmation &&
                <ModalConfirmation
                    setShowModal={setShowModalConfirmation}
                    title={'Confirm'}
                    subTitle={'your dApp will be will be requested to admin to review'}
                />
            } */}
        </div>
    )
}

export default MyAppCard;
