// import { useState } from 'react'
import MyNftCard from '../components/ui/My-nft-card/MyNftCard'
import NftCard from '../components/ui/Nft-card/NftCard'
import CommonSection from '../components/ui/Common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import '../styles/wallet.css'

const Wallet = () => {
	const nfts = [
		{
			is_selling: true,
			token_id: 'token_id',
			selling_price: 0,
			using_price: 0,
			metadata: {
				title: 'title',
				description: 'description',
				extra: 'extra',
				media: 'https://bafybeihumkfixgyh43jqapvuq6gse4vs2rtclnbr2pwfxmsdg6ykplh2a4.ipfs.nftstorage.link/Screen%20Shot%202022-06-14%20at%2014.32.50.png',
			}
		}
	]

	const sellingNft = [
		{
			itemData: {
				users: ['user']
			},
			is_selling: true,
			token_id: 'token_id',
			selling_price: 0,
			using_price: 0,
			sale_conditions: 0,
			use_conditions: 0,
			metadata: {
				title: 'title',
				description: 'description',
				extra: 'extra',
				media: 'https://bafybeihumkfixgyh43jqapvuq6gse4vs2rtclnbr2pwfxmsdg6ykplh2a4.ipfs.nftstorage.link/Screen%20Shot%202022-06-14%20at%2014.32.50.png',
			}
		}
	]

    return (
        <>
            <CommonSection title="My NFTs" />
            <section style={{ paddingBottom: 0 }}>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <h3 className="trending__title">Selling Items</h3>
                        </Col>
                        {nfts.map((item) => {
                            console.log('sellingNft: ', sellingNft)
                            item.is_selling = false
                            return (
                                <>
                                    {item.is_selling && (
                                        <>
                                            <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                                                <MyNftCard
                                                    item={{
                                                        title: item.metadata.title,
                                                        id: item.token_id,
                                                        creator: item.owner_id,
                                                        tags: item.metadata.extra,
                                                        desc: item.metadata.description,
                                                        is_selling: true,
                                                        selling_price: item.selling_price,
                                                        using_price: item.using_price,
                                                        imgUrl: item.metadata.media,
                                                    }}
                                                />
                                            </Col>{' '}
                                        </>
                                    )}
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
                            <h3 className="trending__title">Using Items</h3>
                        </Col>
                        {sellingNft.map((item) => {
                            if (item.itemData.users.includes(window.accountId)) {
                                item.selling_price = item.sale_conditions
                                item.using_price = item.use_condition
                                return (
                                    <>
                                        <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                                            <NftCard item={item} />
                                        </Col>
                                    </>
                                )
                            }
							return '';
                        })}
                    </Row>
                </Container>
            </section>

            <section style={{ marginTop: 0 }}>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <h3 className="trending__title">Other Items</h3>
                        </Col>
                        {nfts.map((item) => {
                            item.is_selling = false
                            return (
                                <>
                                    {item.is_selling === false && (
                                        <>
                                            <Col lg="3" md="4" sm="6" className="mb-4" key={item.token_id}>
                                                <MyNftCard
                                                    item={{
                                                        title: item.metadata.title,
                                                        id: item.token_id,
                                                        creator: item.owner_id,
                                                        tags: item.metadata.extra,
                                                        desc: item.metadata.description,
                                                        is_selling: false,
                                                        imgUrl: item.metadata.media,
                                                    }}
                                                />
                                            </Col>
                                        </>
                                    )}
                                </>
                            )
                        })}

                        <div></div>
                        <br />
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Wallet
