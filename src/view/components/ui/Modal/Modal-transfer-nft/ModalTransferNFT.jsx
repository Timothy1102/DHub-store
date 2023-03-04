import React, { useState } from 'react'
import './modal-transfer-nft.css'

const ModalTransferNft = ({ setShowModal, app_id }) => {
    const [accountId, setAccountId] = useState('')

    async function submitTransfer(accountId, app_id) {
        try {
            if (accountId && app_id) {
                console.log(accountId + app_id)
                await window.contractNFT.nft_transfer(
                    {
                        receiver_id: accountId,
                        app_id: app_id,
                        approval_id: 0,
                        memo: 'Transfer to ' + accountId,
                    },
                    30000000000000,
                    1,
                )
            }
        } catch (e) {
            console.log('Transfer error: ', e)
        }
    }

    function handleTransferNft() {
        console.log(accountId + app_id)
        submitTransfer(accountId, app_id)
        setShowModal(false)
    }

    return (
        <div className="modal__wrapper">
            <div className="single__modal">
                <span className="close__modal">
                    <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
                </span>
                <h6 className="text-center text-light">Transfer NFT</h6>
                <p className="text-center text-light">Enter receiver account</p>

                <div className="input__item mb-4">
                    <input onChange={(e) => setAccountId(e.target.value)} type="text" placeholder="" />
                </div>

                <button className="place__bid-btn" onClick={handleTransferNft}>
                    Transfer
                </button>
            </div>
        </div>
    )
}

export default ModalTransferNft
