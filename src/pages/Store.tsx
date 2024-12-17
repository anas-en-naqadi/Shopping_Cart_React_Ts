import items from "../data/data.json";
import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

function Store() {
  return (
    <>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((i) => (
          <Col key={i.id}>
            <StoreItem {...i} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
