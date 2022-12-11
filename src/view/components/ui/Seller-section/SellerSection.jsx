import "./seller.css";
import { Container, Row, Col } from "reactstrap";
import { SELLER__DATA } from "../../../assets/data/data";
import {truncatAddress} from '../../../../utils/format'

const SellerSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="seller__section-title">
              <h3 className='text-2xl font-semibold'>Top Developers</h3>
            </div>
          </Col>

          {SELLER__DATA.map((item) => (
            <Col lg="2" md="3" sm="4" xs="6" key={item.id} className="mb-4">
              <div className="single__seller-card d-flex align-items-center gap-3">
                <div className="seller__img">
                  <img src={item.sellerImg} alt="" className="w-100" />
                </div>

                <div className="seller__content">
                  <h6 className="font-bold">{item.sellerName}</h6>
                  <h6 style={{ color: 'gray'}}>{truncatAddress(item.address)}</h6>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default SellerSection;
