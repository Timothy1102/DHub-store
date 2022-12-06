// import React, { useState, useEffect } from "react";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import MyNftCard from "../components/ui/My-nft-card/MyNftCard";
import { Container, Row, Col } from "reactstrap";
import "../styles/market.css";

const Market = () => {
	const data = [
		{
			owner_id: 'owner_id',
			token_id: 'token_id',
			sale_conditions: 0,
			use_conditions: 0,
			itemData: {
				metadata: {
					title: 'title',
					description: 'description',
					extra: 'extra',
					media: 'https://bafybeihumkfixgyh43jqapvuq6gse4vs2rtclnbr2pwfxmsdg6ykplh2a4.ipfs.nftstorage.link/Screen%20Shot%202022-06-14%20at%2014.32.50.png',
				}
			}
		}
	]

	return (
		<>
			<CommonSection title={"MarketPlace"} />

			<section>
				<Container>
					<Row>
						<Col lg="12" className="mb-5">
							<div className="market__product__filter d-flex align-items-center justify-content-between">
								<div className="filter__left d-flex align-items-center gap-5">
									<div className="all__category__filter">
										<select>
											<option>All Categories</option>
											<option value="art">NFT</option>
											<option value="music">
												Staking
											</option>
											<option value="domain-name">
												RUST
											</option>
											<option value="virtual-world">
												AssemblyScript
											</option>
											<option value="trending-card">
												Voting
											</option>
											<option value="trending-card">
												Whitelist
											</option>
											<option value="trending-card">
												Token
											</option>
										</select>
									</div>

									<div className="all__items__filter">
										<select>
											<option>All Items</option>
											<option value="single-item">
												Only Backend
											</option>
											<option value="bundle">
												Frontend + Backend
											</option>
										</select>
									</div>
								</div>

								<div className="filter__right">
									<select>
										<option>Sort By</option>
										<option value="latest">Latest</option>
										<option value="high">High Price</option>
										<option value="mid">Mid Price</option>
										<option value="low">Low Price</option>
									</select>
								</div>
							</div>
						</Col>

						{data?.map((item) =>
							item.owner_id !== window.accountId ? (
								<>
									<Col
										lg="3"
										md="4"
										sm="6"
										className="mb-4"
										key={item.token_id}
									>
										<NftCard item={item} />
									</Col>
								</>
							) : (
								<>
									<Col
										lg="3"
										md="4"
										sm="6"
										className="mb-4"
										key={item.token_id}
									>
										<MyNftCard
											item={{
												title: item.itemData.metadata
													.title,
												id: item.token_id,
												creator: item.owner_id,
												tags: item.itemData.metadata
													.extra,
												desc: item.itemData.metadata
													.description,
												is_selling: true,
												selling_price:
													item.sale_conditions,
												using_price: item.use_condition,
												imgUrl: item.itemData.metadata
													.media,
											}}
										/>
									</Col>
								</>
							)
						)}
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Market;
