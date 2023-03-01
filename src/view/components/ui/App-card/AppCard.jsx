import { Link } from 'react-router-dom'
import './app-card.css'
import { Row, Col } from 'reactstrap'
import { Tag } from 'antd';
import { EyeTwoTone, CheckCircleTwoTone, HeartTwoTone, CheckCircleOutlined } from '@ant-design/icons'
import {truncatAddress} from '../../../../utils/format'
const Web3 = require('web3');

const AppCard = ({item}) => {
    const creator = truncatAddress(item?.owner_address)
    const selling_price = item?.price
    const title = item?.name
    const imgUrl = item?.image
    const desc = item?.description
    const tag = item?.tag
    const isUsing = item?.isUsing

    const sendTx = async () => {
        let web3 = new Web3(window.ethereum);

        // fetch contract artifact from IPFS
        const bytecode = await fetch('https://nftstorage.link/ipfs/bafybeig5wqmxma2tmk6robiyikfi5ejnmfujm3ebgke3lhpzy3xuy7v7u4');
        const artifact = await bytecode.json();
        console.log('done fetching artifact')

        const contractABI = artifact.abi;
        const contractAddress = "0x6B279487D318E3A569fA042F049E28B6D3552F33";
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const functionToCall = contract.methods.creatApp('test', 'des', 'img', 'code');
        console.log('done calling function')
        const gasLimit = 5000000;
        const gasPrice = await web3.eth.getGasPrice();
        const transactionObject = {
            from: await web3.eth.getCoinbase(),
            to: contractAddress,
            gasLimit: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
            data: functionToCall.encodeABI()
        };

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionObject]
        });

        console.log('txHash: ', txHash);
    }

    return (
        <div className="single__nft__card" id="nftcard">
            <div className="nft__content ">
                <Row>
                    <Col lg="3" style={{ marginRight: 7 }}>
                        <a href={`/market/${title}`}>
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
                            <Link style={{ color: 'white', fontSize: 20 , fontWeight: 600}} to={`/market/${title}`}>
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
                                {/* {tags.map((tag, i) => {
                                    // Re-formatting
                                    if (i !== tags.length - 1) {
                                        return tag + ', '
                                    }
                                    return tag
                                })} */}
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
                    <div>
                        <p className='font-semibold mb-0' style={{color: 'orange'}}>
                            <span className='text-xl'>{selling_price}</span>
                            <span className='font-bold' style={{color: '#b1b3b1'}}> ETH</span>
                        </p>
                    </div>
                    <div>
                        {isUsing ? (
                            <Tag icon={<CheckCircleOutlined />} color="success" style={{borderRadius: 15 }}>
                                Using
                            </Tag>
                        ) : (
                            <button className="bid__btn font-semibold" onClick={sendTx}>
                                Use App
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppCard;