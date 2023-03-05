import { Link } from 'react-router-dom'
import './app-card.css'
import { Row, Col } from 'reactstrap'
import { EyeTwoTone, CheckCircleTwoTone, HeartTwoTone } from '@ant-design/icons'
import {truncatAddress} from '../../../../utils/format'
import {registerToUseApp, deploy } from '../../../../controller/blockchain'

const AppCard = ({item}) => {
    const creator = truncatAddress(item?.owner)
    const selling_price = item?.usingPrice
    const title = item?.name
    const id = item?.id
    const imgUrl = item?.image
    const desc = item?.description
    const tag = item?.tags
    const smartContractUrl = item?.smartContractUrl
    const isUsing = item?.isUsing

    return (
        <div className="single__nft__card" id="nftcard">
            <div className="nft__content ">
                <Row>
                    <Col lg="3" style={{ marginRight: 7 }}>
                        <a href={`/store/${title}`}>
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
                            <Link style={{ color: 'white', fontSize: 20 , fontWeight: 600}} to={`/store/${title}`}>
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
                                {tag}
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

            <p className="cursor-pointer" style={{ color: 'gray', marginBottom: '0rem', fontSize: 14 }}>Owner: {creator}</p>

            <div className=" d-flex align-items-center gap-2 single__nft-seen">
                <EyeTwoTone twoToneColor="#ffa500" /> <span>53</span>
                <HeartTwoTone twoToneColor="#eb2f96" /> <span>34</span>
                <CheckCircleTwoTone twoToneColor="#52c41a" /> <span>15</span>
            </div>

            <div className="d-flex gap-3" style={{ marginTop: 10 }}>
                <div className="w-100 d-flex align-items-center justify-content-between">
                {isUsing ? 
                    <div>
                        <button className="use__btn font-semibold" onClick={deploy(smartContractUrl)}>
                            Deploy Smart Contract
                        </button>
                    </div>
                    :
                    <div>
                        <div>
                            <p className='font-semibold mb-0' style={{color: 'orange'}}>
                                <span className='text-xl'>{selling_price}</span>
                                <span className='font-bold' style={{color: '#b1b3b1'}}> ETH</span>
                            </p>
                        </div>
                        <div>
                            <button className="use__btn font-semibold" onClick={registerToUseApp(id)}>
                                Use App
                            </button>
                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

export default AppCard;
