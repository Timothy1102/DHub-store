import { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../components/ui/Common-section/CommonSection'
import '../styles/create-item.css'
import { LoadingOutlined } from '@ant-design/icons'
import ModalConfirmation from '../components/ui/Modal/Modal-confirmation/ModalConfirmation'
// import ModalResult from '../components/ui/Modal/Modal-result/ModalResult'
import {sendTx} from '../../controller/utils'

const SubmitApp = () => {
    const [showModalConfirmation, setShowModalConfirmation] = useState(false)

    return (
        <>
            <CommonSection title="Submit dApp" subTitle="submit your dApp to be reviewed by DHub admin"/>
            <section>
                <Container>
                    <Row>
                        <Col lg="9" md="8" sm="6" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="create__item">
                                <form className="form bg-transparent block">
                                    <div className="form__input">
                                        <label htmlFor="">Name</label>
                                        <input id="title" type="text" placeholder="Enter dApp name" />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Description</label>
                                        <textarea name="" id="desc" rows="5" placeholder="Enter description" className="w-100"></textarea>
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Tags</label>
                                        <textarea name="" id="tags" rows="1" placeholder="Enter tags" className="w-100"></textarea>
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Website</label>
                                        <textarea name="" id="website" rows="1" placeholder="Enter your external website for the dApp" className="w-100"></textarea>
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Github</label>
                                        <textarea name="" id="website" rows="1" placeholder="Enter your github repository link" className="w-100"></textarea>
                                    </div>
                                    <div className="form__input">
                                        <label htmlFor="">Discord</label>
                                        <textarea name="" id="website" rows="1" placeholder="Enter your discord channel (optional)" className="w-100"></textarea>
                                    </div>
                                    <div className="form__input">
                                        <label htmlFor="">Telegram</label>
                                        <textarea name="" id="website" rows="1" placeholder="Enter your telegram group (optional)" className="w-100"></textarea>
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Image</label>
                                        <input type="file" className="upload__input" />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Smart Contract</label>
                                        <input type="file" className="upload__input" />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Price (ETH)</label>
                                        <input id="price" type="number" placeholder="Enter dApp using price" />
                                    </div>
                                </form>

                                <LoadingOutlined id="spin" style={{ color: 'white', fontSize: 35, visibility: 'hidden' }} />

                                <button className="btn d-flex gap-2 align-items-center" onClick={() => setShowModalConfirmation(true)}>
                                    Submit
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>

                {showModalConfirmation &&
                    <ModalConfirmation
                        setShowModal={setShowModalConfirmation}
                        title={'Confirm'}
                        subTitle={'your dApp will be will be requested to admin to review'}
                        buttonOnClick={sendTx}
                    />
                }

                {/* <ModalResult></ModalResult> */}
            </section>
        </>
    )
}

export default SubmitApp;
