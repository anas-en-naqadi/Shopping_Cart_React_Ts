import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurr } from "../utilities/FormatCurrency";
import items from "../data/data.json";

type ShoppingCartProps = {
  isOpen: boolean;
};
function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const TotalPrice = cartItems.reduce((total, item) => {
    return (
      total + (items.find((i) => i.id == item.id)?.price ?? 0) * item.quantity
    );
  }, 0);
  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((c) => (
              <CartItem key={c.id} {...c} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total : {formatCurr(TotalPrice)}
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ShoppingCart;
