import { Link } from 'react-router-dom'
import './nft-card.css'
import { Row, Col } from 'reactstrap'
import { CheckCircleOutlined, EyeTwoTone, CheckCircleTwoTone, HeartTwoTone } from '@ant-design/icons'
import { Tag } from 'antd'

const NftCard = ({item}) => {
    const creator = item?.owner_id
    const id = item?.token_id
    const selling_price = item?.selling_price
    const using_price = item?.using_price
    const title = item?.itemData.metadata.title
    const imgUrl = item?.itemData.metadata.media
    const desc = item?.itemData.metadata.description
    const is_selling = item?.is_selling
    const tags = item?.itemData.metadata.extra
    const isUsing = false

    const truncatAddress = (address) => {
        if (address) {
            const shortAddress = `${address.substring(0, 3)}...${address.substring(address.length - 4)}`
            
            return shortAddress
        }
        return address
    }

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

            <p style={{ color: 'gray', marginBottom: '0rem', fontSize: 14 }}>Owner: {truncatAddress(creator)}</p>

            <div className=" d-flex align-items-center gap-2 single__nft-seen">
                <EyeTwoTone twoToneColor="#ffa500" /> <span>53</span>
                <HeartTwoTone twoToneColor="#eb2f96" /> <span>34</span>
                <CheckCircleTwoTone twoToneColor="#52c41a" /> <span>15</span>
            </div>

            <div className="d-flex gap-3" style={{ marginTop: 10 }}>
                <div className="w-100 d-flex align-items-center justify-content-between">
                    <div>
                        <h6 style={{fontSize: '0.8rem'}}>Selling price</h6>
                        <p className='font-semibold' style={{color: 'orange'}}>
                            {selling_price}
                            <span className='font-bold' style={{color: '#b1b3b1'}}> SOL</span>
                        </p>
                    </div>
                    <div>
                        <h6 style={{fontSize: '0.8rem'}}>Using price</h6>
                        <p className='font-semibold' style={{ color: 'orange'}}>
                            {using_price}
                            <span className='font-bold' style={{ color: '#b1b3b1' }}> SOL</span>
                        </p>
                    </div>
                </div>
            </div>

            {!is_selling && (
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
            )}
        </div>
    )
}

export default NftCard
