import Item from "../types/Item";
import { Card, Button } from "react-bootstrap";
import { formatCurr } from "../utilities/FormatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

function StoreItem({ id, name, price, imageUrl }: Item) {
  const { getQuantityItem, incremCart, decremCart, removeItem } =
    useShoppingCart();
  const quantity: number = getQuantityItem(id);
  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={imageUrl}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurr(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity >= 1 ? (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decremCart(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span>
                    in Cart
                  </div>
                  <Button onClick={() => incremCart(id)}>+</Button>
                </div>
                <Button
                  variant="danger"
                  onClick={() => removeItem(id)}
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button className="w-100" onClick={()=>incremCart(id)}>+ Add To Cart </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default StoreItem;
