import { CheckCircleTwoTone } from '@ant-design/icons'
import './common-section.css'
import { Container } from 'reactstrap'

const CommonSection = ({ title, img, verified }) => {
    return (
        <section className="common__section">
            {img && (
                <Container className="text-center" style={{ marginBottom: 20 }}>
                    <img
                        src={img}
                        alt="nft thumbnail"
                        className="d-inline-flex tw-rounded-full image-shadow tw-w-14 tw-h-14 "
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: '50px',
                        }}
                    />
					{verified && <CheckCircleTwoTone style={{fontSize: '1.5rem', position: 'absolute', marginTop: 10, marginLeft: -10}} twoToneColor="#52c41a" />}
                </Container>
            )}
            <Container className="text-center">
                <h2 className="font-semibold text-3xl text-white">{title}</h2>
            </Container>
        </section>
    )
}

export default CommonSection
