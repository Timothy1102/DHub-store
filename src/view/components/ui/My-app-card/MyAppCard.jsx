import { useState } from 'react'
import { Link } from 'react-router-dom'
import './my-app-card.css'
import ModalTransferNft from '../Modal-transfer-nft/ModalTransferNFT'
import ModalListNft from '../Modal/Modal-list-nft/ModalListNFT'
import ModalConfirmation from '../Modal/Modal-confirmation/ModalConfirmation'
import { Row, Col } from 'reactstrap'
import { EyeTwoTone, CheckCircleTwoTone, HeartTwoTone, ClockCircleTwoTone} from '@ant-design/icons'
import {truncatAddress} from '../../../../utils/format'
import { Button } from 'antd';

const MyAppCard = ({id, name, creator, description, imgUrl, tags, isPublished}) => {
    // const creator = 'creator'
    // const id = 'id'
    // const title = 'title'
    // const imgUrl = 'https://bafybeihumkfixgyh43jqapvuq6gse4vs2rtclnbr2pwfxmsdg6ykplh2a4.ipfs.nftstorage.link/Screen%20Shot%202022-06-14%20at%2014.32.50.png'
    // const desc = 'desc'
    const is_selling = true
    // const tags = 'tags'

    const [showModalConfirmation, setShowModalConfirmation] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showListModal, setShowListModal] = useState(false)

    return (
        <div className="single__nft__card">
            <div className="nft__content ">
                <Row>
                    <Col lg="3" style={{ marginRight: 7 }}>
                        <a href={`/market/${id}`}>
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

            <p style={{ color: 'gray', marginBottom: '0rem', fontSize: 14 }}>Owner: {truncatAddress(creator)}</p>

            <div className=" d-flex align-items-center gap-2 single__nft-seen">
                <EyeTwoTone twoToneColor="#ffa500" /> <span>53</span>
                <HeartTwoTone twoToneColor="#eb2f96" /> <span>34</span>
            </div>

            {is_selling && (
                <div className="creator__info-wrapper d-flex gap-3" style={{ marginTop: 10 }}>
                    <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                        <div>
                            <p className='text-[17px]' style={{ color: 'orange' }}>
                                <span className="font-bold"> 0.3 </span><span className="font-bold" style={{ color: '#b1b3b1' }}> ETH</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {isPublished ? (
                <div className="flex items-center justify-center">
                    {/* <button className="bid__btn d-flex align-items-center gap-1" style={{ background: '#e250e5', border: 'none' }}>
                        Published
                    </button> */}
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                    <Button type="text primary">
                        Published
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    {/* <button className="bid__btn d-flex align-items-center gap-1" onClick={() => setShowListModal(true)}>
                        Submitted
                    </button> */}
                    <ClockCircleTwoTone />
                    <Button type="text" danger>
                        Submitted
                    </Button>
                    {showModal && <ModalTransferNft setShowModal={setShowModal} app_id={id} />}
                    {showListModal && <ModalListNft setShowListModal={setShowListModal} app_id={id} />}
                    {showModalConfirmation &&
                        <ModalConfirmation
                            setShowModal={setShowModalConfirmation}
                            title={'Confirm'}
                            subTitle={'your dApp will be will be requested to admin to review'}
                        />
                    }
                </div>
            )}
        </div>
    )
}

export default MyAppCard;
