import { Button, Result } from 'antd';

const ModalResult = ({showModal, txHash, closeModal}) => {
    if (!showModal) {
        return;
    }

    return (
        <div className="modal__wrapper">
            <div className="single__modal">
                <Result
                status="success"
                title="Successfully Submitted dApp!"
                subTitle="Check transaction info at https://goerli.etherscan.io/tx/0x64f...f95"
                extra={[
                    <Button type="primary" key="console" onClick={closeModal()}>
                    Back
                    </Button>,
                    <Button key="buy">Go to Etherscan: {txHash}</Button>,
                ]}
                />
            </div>
        </div>
    )
};

export default ModalResult;