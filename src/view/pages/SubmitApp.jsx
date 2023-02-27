// import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../components/ui/Common-section/CommonSection'
import '../styles/create-item.css'
import { LoadingOutlined } from '@ant-design/icons'

const SubmitApp = () => {
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
                                        <label htmlFor="">Image</label>
                                        <input type="file" className="upload__input" />
                                    </div>

                                    <div className="form__input">
                                        <label htmlFor="">Smart Contract</label>
                                        <input type="file" className="upload__input" />
                                    </div>
                                </form>

                                <LoadingOutlined id="spin" style={{ color: 'white', fontSize: 35, visibility: 'hidden' }} />

                                <button className="btn d-flex gap-2 align-items-center">
                                    Submit
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SubmitApp;
