import { Link } from 'react-router-dom'
import './nft-card.css'
import { Row, Col } from 'reactstrap'
import { EyeTwoTone, CheckCircleTwoTone, HeartTwoTone } from '@ant-design/icons'
import {truncatAddress} from '../../../../utils/format'

const NftCard = ({item}) => {
    const creator = item?.owner_id
    const id = item?.token_id
    const selling_price = item?.selling_price
    const title = item?.itemData.metadata.title
    const imgUrl = item?.itemData.metadata.media
    const desc = item?.itemData.metadata.description
    // const is_selling = item?.is_selling
    const tags = item?.itemData.metadata.extra

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
                        <h5 className="nft__title d-inline-flex mb-0">
                            <Link style={{ color: 'white', fontSize: 20 , fontWeight: 600}} to={`/market/${id}`}>
                                {title}
                            </Link>
                        </h5>
                        <div className="tags pb-2">
                            <p
                                style={{
                                    display: 'inline',
                                    fontSize: 12,
                                    color: '#39a68c',
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

            <p style={{ color: 'gray', marginBottom: '0rem', fontSize: 14 }}>Owner: {truncatAddress(creator)}</p>

            <div className=" d-flex align-items-center gap-2 single__nft-seen">
                <EyeTwoTone twoToneColor="#ffa500" /> <span>53</span>
                <HeartTwoTone twoToneColor="#eb2f96" /> <span>34</span>
                <CheckCircleTwoTone twoToneColor="#52c41a" /> <span>15</span>
            </div>

            <div className="d-flex gap-3" style={{ marginTop: 10 }}>
                <div className="w-100 d-flex align-items-center justify-content-between">
                    <div>
                        <p className='font-semibold mb-0' style={{color: 'orange'}}>
                            <span className='text-xl'>{selling_price}</span>
                            <span className='font-bold' style={{color: '#b1b3b1'}}> SOL</span>
                        </p>
                    </div>
                    <div>
                        <button className="bid__btn font-semibold">
                            Use App
                        </button>
                    </div>
                </div>
            </div>

            {/* {is_selling && (
                <div className=" d-inline-flex align-items-center justify-content-between">
                    <button className="bid__btn d-flex align-items-center gap-1">
                        Buy
                    </button>

                    {(isUsing) ? (
                        <Tag icon={<CheckCircleOutlined />} color="success" style={{ marginLeft: 130, borderRadius: 15 }}>
                            Using
                        </Tag>
                    ) : (
                        <button className="bid__btn d-flex align-items-center gap-1" style={{ marginLeft: 120 }}>
                            Use
                        </button>
                    )}
                </div>
            )} */}
        </div>
    )
}

export default NftCard
