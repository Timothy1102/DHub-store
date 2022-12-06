// import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './nft-card.css'
import { Row, Col } from 'reactstrap'
import { CheckCircleOutlined, EyeTwoTone, CheckCircleTwoTone, HeartTwoTone } from '@ant-design/icons'
import { Tag } from 'antd'

const NftCard = () => {
	// sample
    const creator = 'creator'
    const id = 'id'
    const title = 'title'
    const imgUrl = 'https://bafybeihumkfixgyh43jqapvuq6gse4vs2rtclnbr2pwfxmsdg6ykplh2a4.ipfs.nftstorage.link/Screen%20Shot%202022-06-14%20at%2014.32.50.png'
    const desc = 'desc'
    const is_selling = true
    const is_using = true
    const tags = 'tags'

    return (
        <div className="single__nft__card" id="nftcard">
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
                        <h5 className="nft__title d-inline-flex" style={{ marginBottom: 0 }}>
                            <Link style={{ color: 'white', fontSize: 20 }} to={`/market/${id}`}>
                                {title}
                            </Link>
                        </h5>
                        <div className="tags" style={{ marginTop: 4 }}>
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

            <div id="description" className="contract_des">
                <p
                    style={{
                        height: 150,
                        color: '#c7bfbf',
                        fontSize: 13,
                        textOverflow: 'ellipsis',
                        overflow: 'auto',
                        maxHeight: '40ch',
                        maxWidth: '40ch',
                    }}
                >
                    {desc}
                </p>
            </div>

            <p style={{ color: 'gray', marginBottom: '0rem', fontSize: 14 }}>Owner: {creator}</p>

            <div className=" d-flex align-items-center gap-2 single__nft-seen">
                <EyeTwoTone twoToneColor="#ffa500" /> <span>53</span>
                <HeartTwoTone twoToneColor="#eb2f96" /> <span>34</span>
                <CheckCircleTwoTone twoToneColor="#52c41a" /> <span>15</span>
            </div>

            <div className="creator__info-wrapper d-flex gap-3" style={{ marginTop: 10 }}>
                <div className="creator__info w-100 d-flex align-items-center justify-content-between">
                    <div>
                        <h6>Selling price</h6>
                        <p style={{ color: 'orange' }}>
                            0
                            <span style={{ color: '#b1b3b1' }}> SOL</span>
                        </p>
                    </div>
                    <div>
                        <h6>Using price</h6>
                        <p style={{ color: 'orange' }}>
                            0
                            <span style={{ color: '#b1b3b1' }}> SOL</span>
                        </p>
                    </div>
                </div>
            </div>

            {!is_selling && (
                <div className=" d-inline-flex align-items-center justify-content-between">
                    <button className="bid__btn d-flex align-items-center gap-1">
                        Buy
                    </button>

                    {is_using.includes(window.accountId) ? (
                        <Tag icon={<CheckCircleOutlined />} color="success" style={{ marginLeft: 130, borderRadius: 15 }}>
                            Using
                        </Tag>
                    ) : (
                        <button className="bid__btn d-flex align-items-center gap-1" style={{ marginLeft: 120 }}>
                            Use
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default NftCard
