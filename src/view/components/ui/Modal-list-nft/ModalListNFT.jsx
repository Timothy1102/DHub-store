// import { useState } from 'react'
import './modal-list-nft.css'

const ModalListNft = ({ setShowListModal }) => {

    return (
        <div className="modal__wrapper">
            <div className="single__modal" style={{ height: 'auto' }}>
                <span className="close__modal">
                    <i class="ri-close-line" onClick={() => setShowListModal(false)}></i>
                </span>
                <h6 className="text-center text-light">List NFT on Marketplace</h6>
                <p className="text-center text-light">Enter selling price</p>

                <div className="input__item mb-4">
                    <input type="number" placeholder="selling price (SOL)" />
                </div>

                <p className="text-center text-light">Enter using price</p>

                <div className="input__item mb-4">
                    <input type="number" placeholder="using price (SOL)" />
                </div>

                <button className="place__bid-btn">
                    List
                </button>
            </div>
        </div>
    )
}

export default ModalListNft
