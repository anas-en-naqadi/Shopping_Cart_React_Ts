import { useShoppingCart } from "../context/ShoppingCartContext";
import items from "../data/data.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurr } from "../utilities/FormatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};
function CartItem({ id, quantity }: CartItemProps) {
  const { removeItem } = useShoppingCart();
  const item = items.find((i) => i.id === id);

  if (item == null) return null;
  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imageUrl}
          alt={`image-${item.id}`}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.name}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                {quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurr(item.price)}
          </div>
        </div>
        <div> {formatCurr(item.price * quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={()=>removeItem(id)}>&times;</Button>
      </Stack>
    </>
  );
}

export default CartItem;
