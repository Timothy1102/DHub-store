import { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../components/ui/Common-section/CommonSection'
import '../styles/create-item.css'
import { LoadingOutlined } from '@ant-design/icons'
import ModalConfirmation from '../components/ui/Modal/Modal-confirmation/ModalConfirmation'
import ModalResult from '../components/ui/Modal/Modal-result/ModalResult'
import {submitApp} from '../../controller/utils'

const SubmitApp = () => {
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);
    const [showModalResult, setShowModalResult] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        smartContract: null,
        tags: '',
        website: '',
        github: '',
        discord: '',
        telegram: '',
        usingPrice: null,
    });

    const getFormData = () => {
        const desc = document.getElementById("desc");
        setFormData({...formData, description: desc.value})
        console.log('formData :', formData);
    };

    const submit = async () => {
        getFormData();
        const res = await submitApp(
            formData.name,
            formData.description,
            formData.image,
            formData.tags,
            formData.website,
            formData.github,
            formData.discord,
            formData.telegram,
            formData.smartContract,
            formData.usingPrice,
        );
        console.log('submit done');
        setTxHash(res);
        setShowModalResult(true);
    }

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
                                        <input id="title" type="text" placeholder="Enter dApp name" onChange={e => setFormData({...formData, name: e.target.value})} />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Description</label>
                                        <textarea name="" id="desc" rows="5" placeholder="Enter description" className="w-100"></textarea>
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Tags</label>
                                        <input id="tags" type="text" placeholder="Enter tags" onChange={e => setFormData({...formData, tags: e.target.value})} />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Website</label>
                                        <input id="website" type="text" placeholder="Enter your external website for the dApp" onChange={e => setFormData({...formData, website: e.target.value})} />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Github</label>
                                        <input id="github" type="text" placeholder="Enter your github repository link" onChange={e => setFormData({...formData, github: e.target.value})} />
                                    </div>
                                    <div className="form__input">
                                        <label htmlFor="">Discord</label>
                                        <input id="discord" type="text" placeholder="Enter your discord channel (optional)" onChange={e => setFormData({...formData, discord: e.target.value})} />
                                    </div>
                                    <div className="form__input">
                                        <label htmlFor="">Telegram</label>
                                        <input id="telegram" type="text" placeholder="Enter your telegram group (optional)" onChange={e => setFormData({...formData, telegram: e.target.value})} />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Image</label>
                                        <input type="file" className="upload__input" onChange={e => setFormData({...formData, image: e.target.value})} />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Smart Contract</label>
                                        <input type="file" className="upload__input" onChange={e => setFormData({...formData, smartContract: e.target.value})}/>
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Price (ETH)</label>
                                        <input id="price" type="number" placeholder="Enter dApp using price" onChange={e => setFormData({...formData, usingPrice: e.target.value})}/>
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
                        buttonOnClick={submit}
                    />
                }

                <ModalResult showModal={showModalResult} txHash={txHash} closeModal={() => setShowModalResult(false)}></ModalResult>
            </section>
        </>
    )
}

export default SubmitApp;
